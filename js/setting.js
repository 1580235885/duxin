mui.init({
	swipeBack: true, //启用右滑关闭功能
	pullRefresh: {
		container: '#pullrefresh', //待刷新区域标识，querySelector能定位的css选择器均可，比如：id、.class等
		down: {
			style: 'circle',
			height: 100000,
			callback: null //必选，刷新函数，根据具体业务来编写，比如通过ajax从服务器获取新数据；
		}
	}
});

//列表点击效果
mui(".setting ul").on('touchstart', 'li', function() {
	$(this).css('background', '#eee')
	setTimeout(() => {
		this.style = 'background:#fff'
	}, 500)
})
mui(".setting ul").on('touchend', 'li', function() {
	$(this).css('background', '#fff')
})
mui(".exit").on('touchstart', 'p', function() {
	$(this).css('background', '#eee')
	setTimeout(() => {
		this.style = 'background:#fff'
	}, 500)
})
mui(".exit").on('touchend', 'p', function() {
	$(this).css('background', '#fff')
})

//检查新版本
$('.checkver')[0].addEventListener('tap', function() {
	mui.toast('当前已是最新版本');
}, false)

//是否退出登录
document.getElementById("confirmBtn").addEventListener('tap', function() {
	var btnArray = ['取消', '确定'];
	mui.confirm('\n', '确定退出账号吗？', btnArray, function(e) {
		if(e.index == 1) {
			console.log('是')
		} else {
			console.log('否')
		}
	})
});

//调用手机拍照功能
// 扩展API加载完毕后调用onPlusReady回调函数
document.addEventListener("plusready", onPlusReady, false);
// 扩展API加载完毕，现在可以正常调用扩展API
function onPlusReady() {
	//获取缓存
	plus.cache.calculate(function(size) {
		sizeCache = size;
		var size_m = parseFloat(sizeCache / (1024 * 1024)).toFixed(2);
		$('.cache').text(size_m + 'M')
	});
}

// 拍照
function captureImage() {
	var cmr = plus.camera.getCamera();
	var res = cmr.supportedImageResolutions[0];
	var fmt = cmr.supportedImageFormats[0];
	console.log("Resolution: " + res + ", Format: " + fmt);
	cmr.captureImage(function(path) {
			alert('图片路径为：' + path)
			//					console.log(path)
			//						$('.head')[0].src=path
		},
		function(error) {
			alert("取消拍照");
		}, {
			resolution: res,
			format: fmt
		}
	);
}
//相册
function galleryImg() {
	// 从相册中选择图片  
	plus.gallery.pick(function(e) {
		for(var i in e.files) {
			var fileSrc = e.files[i];

			$('.head')[0].src = fileSrc
		}
	}, function(e) {
		console.log("取消选择图片");
	}, {
		filter: "image",
		multiple: true,
		maximum: 1,
		system: false,
		onmaxed: function() {
			plus.nativeUI.alert('最多只能选择1张图片');
		}
	});
}

//清除缓存
$('.clearCache')[0].addEventListener('tap', function() {
	plus.cache.calculate(function(size) {
		sizeCache = size;
		var size_m = parseFloat(sizeCache / (1024 * 1024)).toFixed(2);
		plus.cache.clear(function() {
			$('.cache').text(size_m + 'M')
		});
	});
}, false)

mui('body').on('shown', '.mui-popover', function(e) {
	//			console.log('shown', e.detail.id);//detail为当前popover元素

});
mui('body').on('hidden', '.mui-popover', function(e) {
	//			console.log('hidden', e.detail.id);//detail为当前popover元素

});

mui('body').on('tap', '.mui-popover-action li>a', function() {
	var a = this,
		parent;
	//根据点击按钮，反推当前是哪个actionsheet
	for(parent = a.parentNode; parent != document.body; parent = parent.parentNode) {
		if(parent.classList.contains('mui-popover-action')) {
			break;
		}
	}
	//关闭actionsheet
	mui('#' + parent.id).popover('toggle');
	if(parent.id == 'focus') {
		$('.mui-backdrop')[0].className = ''
	} else {
		$('.mui-backdrop')[0].className = 'mui-backdrop mui-active mui-backdrop-action'
	}
	//调用拍照
	if(parent.id == 'picture' && a.innerHTML == '拍照') {
		captureImage()
	}
	//调用相册
	if(parent.id == 'picture' && a.innerHTML == '相册') {
		galleryImg()
	}
	//修改性别
	console.log(parent.id, a.innerHTML)
	if(parent.id == 'sex' && a.innerHTML.length == 1) {
		$('.sexTxt').text(a.innerHTML)
	}
})

//二级联动
mui.ready(function() {
	var userPicker = new mui.PopPicker();
	var cityPicker = new mui.PopPicker({
		layer: 2
	});
	cityPicker.setData(cityData);
	var showCityPickerButton = document.getElementById('showCityPicker');
	var cityResult = document.getElementById('cityResult');
	showCityPickerButton.addEventListener('tap', function(event) {
		cityPicker.show(function(items) {
			//修改地区
			$('.area').text(items[0].text + ' ' + items[1].text)
		});
	}, false);

});

//关注领域弹出框
$('.add-labs')[0].addEventListener('tap', function() {
	console.log(11)
}, false)
//选择关注领域
mui('#focus .typeList ul').on('tap', 'li', function() {
	$(this).toggleClass('active')
})
mui('.focus ul').on('tap', '.add-labs', function(e) {
	$('#focus').css('bottom', '0')
})
mui('#focus .btn').on('tap', 'button', function() {
	$('#focus').css('bottom', '-110%')
	if(this.className == 'btn1') {
		$('.focus ul').empty()
		for(let i = 0; i < $('.typeList .active').length; i++) {
			$('.focus ul').append(`
							<li>${$('.typeList .active').eq(i).text()}</li>
						`)
		}
		$('.focus ul').append(`
						<li class="add-labs">+ 添加</li>
					`)
	}
})
//列表点击效果
mui(".edit .user").on('touchstart', 'li', function() {
	$(this).css('background', '#eee')
	setTimeout(() => {
		this.style = 'background:#fff'
	}, 500)
})
mui(".edit .user").on('touchend', 'li', function() {
	$(this).css('background', '#fff')
})
mui(".edit .contact").on('touchstart', 'li', function() {
	$(this).css('background', '#eee')
	setTimeout(() => {
		this.style = 'background:#fff'
	}, 500)
})
mui(".edit .contact").on('touchend', 'li', function() {
	$(this).css('background', '#fff')
})
mui(".edit .sex").on('touchstart', 'li', function() {
	$(this).css('background', '#eee')
	setTimeout(() => {
		this.style = 'background:#fff'
	}, 500)
})
mui(".edit .sex").on('touchend', 'li', function() {
	$(this).css('background', '#fff')
})

//  开关权限
//			mui('.mui-content .mui-switch').each(function() { //循环所有toggle
//				//toggle.classList.contains('mui-active') 可识别该toggle的开关状态
//				this.parentNode.querySelector('span').innerText = '状态：' + (this.classList.contains('mui-active') ? 'true' : 'false');
//				/**
//				 * toggle 事件监听
//				 */
//				this.addEventListener('toggle', function(event) {
//					//event.detail.isActive 可直接获取当前状态
//					this.parentNode.querySelector('span').innerText = '状态：' + (event.detail.isActive ? 'true' : 'false');
//				});
//			});

//修改用户名
mui('body').on('tap', '.del', function() {
	$('.niName input').eq($('.del').index($(this))).val('')
	$(this).hide()
})
mui('body').on('keyup', '.niName input', function() {
	if($(this).val()) {
		$('.del').eq($('.niName input').index($(this))).show()
	} else {
		$('.del').eq($('.niName input').index($(this))).hide()
	}
})
mui('.userName').on('touchend', 'input', function() {
	console.log($('.niName input').index($(this)))
	$('.userName>img')[$('.niName input').index($(this))].src = 'https://www.pmdaniu.com/storages/99649/b739b955e810f1cadeb4c1c946abdc83-57026/images/修改用户名/u4669_selected.png'
})
//			mui('body').on('touchmove', '.niName input', function() {
//				$('.userName>img')[$('.niName').index($(this))].src = 'https://www.pmdaniu.com/storages/99649/b739b955e810f1cadeb4c1c946abdc83-57026/images/修改用户名/u4669.png'
//			})
mui('body').on('tap', '.save', function() {
	if(true) {
		mui.toast('修改成功')
		$('input').blur()
		setTimeout(function() {
			$('.box2').css({
				'left': '0',
				'opacity': '1'
			}).siblings().css({
				'left': '100%',
				'opacity': '0.5',
				'z-index': '1'
			})
			$('.header2').css({
				'left': '0',
				'opacity': '1'
			}).siblings().css({
				'left': '100%',
				'opacity': '0.5'
			})
			$('.box1').css({
				'left': '-100%',
				'opacity': '.5'
			})
			$('.header1').css({
				'left': '-100%',
				'opacity': '.5'
			})
		}, 2000)
	} else {
		mui.toast('该用户名已被占用，换一个吧！')
	}
})
//头部切换效果
mui('.header').on('tap', '.retreat', function() {
	$('input').blur() //处理手机获取焦点后输入法不消失
	setTimeout(() => {
		//			console.log(this.getAttribute('data-num'))
		if(!this.getAttribute('data-num')) {
			window.history.go(-1)
		} else {
			$('.box' + this.getAttribute('data-num')).css({
				'left': '0',
				'opacity': '1'
			}).siblings().css({
				'left': '100%',
				'opacity': '0.5',
				'z-index': '1'
			})
			$('.header' + this.getAttribute('data-num')).css({
				'left': '0',
				'opacity': '1'
			}).siblings().css({
				'left': '100%',
				'opacity': '0.5'
			})
			//不为一级切换时防止一级tab动画
			if(this.getAttribute('data-num') > 1) {
				$('.box' + (this.getAttribute('data-num') == '1' ? '2' : '1')).css({
					'left': '-100%',
					'opacity': '.5'
				})
				$('.header' + (this.getAttribute('data-num') == '1' ? '2' : '1')).css({
					'left': '-100%',
					'opacity': '.5'
				})
			}
		}
	}, 50)
})
//设置切换效果
mui('.box1').on('tap', '.jump', function() {
	if(this.getAttribute('data-url') > 0) {
		setTimeout(() => {
			console.log(this.getAttribute('data-url'))
			$('.box' + this.getAttribute('data-url')).css({
				'left': '0',
				'opacity': '1'
			})
			$('.box1').css({
				'left': '-100%',
				'opacity': '0.5'
			})
			$('.header' + this.getAttribute('data-url')).css({
				'left': '0',
				'opacity': '1'
			})
			$('.header1').css({
				'left': '-100%',
				'opacity': '0.5'
			})
		}, 50)
	} else {
		location.href = 'AccountSafe.html'
	}
})
//账号资料切换效果
mui('.box2').on('tap', '.jump', function() {
	setTimeout(() => {
		//			console.log(this.getAttribute('data-url'))
		$('.box' + this.getAttribute('data-url')).css({
			'left': '0',
			'opacity': '1'
		})
		$('.box2').css({
			'left': '-100%',
			'opacity': '0.5'
		})
		$('.header' + this.getAttribute('data-url')).css({
			'left': '0',
			'opacity': '1'
		})
		$('.header2').css({
			'left': '-100%',
			'opacity': '0.5'
		})
	}, 50)
})