//兼容手机屏幕尺寸
function getWidth() {
	var html = document.getElementsByTagName("html")[0]
	html.style.fontSize = (html.clientWidth / 375) * 100 + "px"
};
getWidth();
window.onresize = function() {
	getWidth()
};

window.onload = function() {
	
	mui('html').on('touchstart', '.retreat', function() {
		this.style = 'background:#eee'
		setTimeout(()=>{
			this.style = 'background:#fff'
		},500)
	})
	mui('html').on('touchend', '.retreat', function() {
		this.style = 'background:#fff'
	})
	//返回
	mui('body').on('tap','.retreat',function(){
		if(!this.getAttribute('data-num')) {
			window.history.go(-1);
		}
	})
	mui('body').on('tap', 'a', function() {
		window.location.href = this.href
	});
}