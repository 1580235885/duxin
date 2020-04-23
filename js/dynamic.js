// dynamic的js部分
// 上啦加载下拉刷新
function getWidth() {
	var html = document.getElementsByTagName("html")[0]
	html.style.fontSize = (html.clientWidth / 375) * 100 + "px"
};
getWidth();
window.onresize = function() {
	getWidth()
};
mui.init({
    pullRefresh : {
      container:"#refreshContainer",//下拉刷新容器标识，querySelector能定位的css选择器均可，比如：id、.class等
      down : {
        height:50,//可选,默认50.触发下拉刷新拖动距离,
        auto: false,//可选,默认false.首次加载自动下拉刷新一次
        contentdown : "下拉可以刷新",//可选，在下拉可刷新状态时，下拉刷新控件上显示的标题内容
        contentover : "释放立即刷新",//可选，在释放可刷新状态时，下拉刷新控件上显示的标题内容
        contentrefresh : "正在刷新...",//可选，正在刷新状态时，下拉刷新控件上显示的标题内容
        callback :adds  //必选，刷新函数，根据具体业务来编写，比如通过ajax从服务器获取新数据；
      },
      up : {
        height:50,//可选.默认50.触发上拉加载拖动距离
        auto:false,//可选,默认false.自动上拉加载一次
        contentrefresh : "数据正在加载中...",//可选，正在加载状态时，上拉加载控件上显示的标题内容
        contentnomore:'没有更多数据了',//可选，请求完毕若没有更多数据时显示的提醒内容；
        callback :dataup//必选，刷新函数，根据具体业务来编写，比如通过ajax从服务器获取新数据；
      }
    }
  })
mui('body').on('tap', 'a', function() {
	window.top.location.href = this.href
});
function adds(){
    setTimeout(function(){
        mui('#refreshContainer').pullRefresh().endPulldownToRefresh();
    },2000)
}
function dataup(){
    setTimeout(function(){
        mui('#refreshContainer').pullRefresh().endPullupToRefresh();
    },2000)
}
var  pop1=document.getElementById("popover1")
var  pop2=document.getElementById("popover2")
mui('.w_pop-show1').on('tap','img',function(){
    pop1.style.display="block";
    pop2.style.display="none"
})
mui('.w_pop-show2').on('tap','img',function(){
    pop2.style.display="block";
    pop1.style.display="none"
})
var ul1=document.getElementById("w_dynic-ul1");
var ul2=document.getElementById("w_dynic-ul2");
mui('.w_dynic-list1').on('tap','#openPopover',function() {
    document.body.style.overflow='hidden';
})
mui('.w_dynmic-content').on('tap','#w_tab1',function() {
    this.children[0].classList.add("w_dynmic-title")
    this.nextElementSibling.children[0].classList.remove("w_dynmic-title");
    this.children[1].classList.add("w_title-div")
    this.nextElementSibling.children[1].classList.remove("w_title-div");
    ul1.style.display="block";
    ul2.style.display="none";
})
mui('.w_dynmic-content').on('tap','#w_tab2',function() {
    this.children[0].classList.add("w_dynmic-title")
    this.previousElementSibling.children[0].classList.remove("w_dynmic-title");
    this.children[1].classList.add("w_title-div")
    this.previousElementSibling.children[1].classList.remove("w_title-div");
    ul1.style.display="none";
    ul2.style.display="block"
})
function art(){
    var  ba=document.getElementsByClassName("mui-backdrop");
    var bs=document.getElementById("popove")
    if(bs){
        bs.style.display="none"
    }
    ba[1].style.display="none";
    if(ba[2]){
         ba[2].style.display="none";
    }
    document.getElementById("popover").style.display="none"
    document.body.style.overflow='auto';
}
mui(".mui-table-view").on('tap','#w_table-li1',function(){
    mui.confirm('确定取消关注该作者吗？','title',['取消','确定'],null,'div');
    var  ba=document.getElementsByClassName("mui-backdrop");
    ba[1].style.display="none";
    if(ba[2]){
        ba[2].style.display="none";
    }
    var bs=document.getElementById("popove")
    if(bs){
        bs.style.display="none"
    }
    document.getElementById("popover").style.display="none";
    mui(".mui-popup-buttons").on("tap",".mui-popup-button-bold",function(){
        var bnt=document.getElementsByClassName("mui-toast-container")[0];
         bnt.style.display="block";
         bnt.style.bottom="50%"
        setTimeout(function(){
            bnt.style.display="none"
        },2000)  
         document.body.style.overflow='auto';
    })
    mui(".mui-popup-buttons").on("tap",".mui-popup-button",function(){
        document.body.style.overflow='auto';
    })
})
function reports(){
    var fot=document.getElementById("w_report-bat")
    var  ba=document.getElementsByClassName("mui-backdrop");
    ba[1].style.display="none";
    var bs=document.getElementById("popove")
    if(bs){
        bs.style.display="none"
    }
    if(ba[2]){
        ba[2].style.display="none";
   }
    document.getElementById("popover").style.display="none"
    fot.style.display="block";
    var imgs=document.getElementsByClassName("w_repor-img")
     mui(".w_repor-list").on('tap','.w_repor-list1',function(){
        this.children[0].setAttribute("src","images/w_list8-1.png")
     })
     mui(".w_report-foot").on('tap','.w_report-clear',function(){
       fot.style.display="none"
       document.body.style.overflow='auto';
       imgs[0].setAttribute("src","images/w_list8.png");
       imgs[1].setAttribute("src","images/w_list8.png");
       imgs[2].setAttribute("src","images/w_list8.png");
     })
     mui(".w_report-foot").on('tap','.w_report-ya',function(){
         mui.toast('举报成功！我们会尽快处理~',{ duration:'long', type:'div' }) 
         fot.style.display="none";
         document.body.style.overflow='auto';
         imgs[0].setAttribute("src","images/w_list8.png");
         imgs[1].setAttribute("src","images/w_list8.png");
         imgs[2].setAttribute("src","images/w_list8.png");
     })
}
mui(".mui-table-view").on('tap','#w_table-li2',function(){
    reports()
})
 mui(".mui-table-view").on('tap','#w_table-li3',function(){
   art()
})
mui(".w_dynic-list1").on('tap','.w_attention',function(){
    if(this.children[0].style.display==="none"){
        this.children[0].style.display="inline-block";
        this.children[1].innerHTML="关注";
        this.style.background="rgba(61, 126, 255, 1)";
    }else{
        this.children[0].style.display="none"
        this.children[1].innerHTML="已关注";
        this.style.background="rgba(204, 204, 204, 1)";
    }
})
var a=1;
mui('.w_dynic-list4').on('tap','#w_dynic-lt1',function(){
    if(a%2==0){
        this.children[0].setAttribute("src","images/w_list1.png")
        var nu=Number( this.children[1].innerHTML)-1
        this.children[1].innerHTML=nu
    }else {
        this.children[0].setAttribute("src","images/w_list1-1.png")
        var nu=Number( this.children[1].innerHTML)+1
        this.children[1].innerHTML=nu
    }
    a++
})
// transpond的js部分
mui('.w_transpond-top').on('tap','.w_tran-right',function(){
        var bnt=document.getElementsByClassName("mui-toast-container")[0];
         bnt.style.display="block";
         bnt.style.bottom="50%"
        setTimeout(function(){
            bnt.style.display="none" 
            window.history.go(-1)
        },2000)  
})
mui('.w_transpond-top').on('tap','.w_tran-left',function(){
    window.history.go(-1)
})
//页面跳转控制js
mui('.w_dynica').on('tap','a',function() {
    location.href=this.className+'.html'
})
// particulars的js部分
var b=1;
var over=document.getElementsByClassName("w_part-over")[0];
if(over){
    over.style.display="block";
}
mui('.w_part-cont1').on('tap','.w_author-img3',function() {
    if(b%2==0){
        over.style.left="1.55rem"
    }else {
        over.style.left="0rem"
    }   
    b++
})
mui('.w_part-out').on('tap','.w_part-out2',function() {
    var fot=document.getElementById("w_report-bat");
    var imgs=document.getElementsByClassName("w_repor-img")
    fot.style.display="block";
     mui(".w_repor-list").on('tap','.w_repor-list1',function(){
        this.children[0].setAttribute("src","images/w_list8-1.png")
     })
     mui(".w_report-foot").on('tap','.w_report-clear',function(){
       fot.style.display="none"
       document.body.style.overflow='auto';
       imgs.setAttribute("src","images/w_list8.png")
       imgs[0].setAttribute("src","images/w_list8.png");
       imgs[1].setAttribute("src","images/w_list8.png");
       imgs[2].setAttribute("src","images/w_list8.png");
     })
     mui(".w_report-foot").on('tap','.w_report-ya',function(){
         mui.toast('举报成功！我们会尽快处理~',{ duration:'long', type:'div' }) 
         fot.style.display="none";
         document.body.style.overflow='auto';
         over.style.left="1.55rem"
         imgs[0].setAttribute("src","images/w_list8.png");
         imgs[1].setAttribute("src","images/w_list8.png");
         imgs[2].setAttribute("src","images/w_list8.png");
     })
})
mui('.w_part-out').on('tap','.w_part-out1',function() {
    if(a%2==0){
       this.children[0].setAttribute("src","images/w_list16.png")
       this.children[1].innerHTML="踩评论"
    }else{
       this.children[0].setAttribute("src","images/w_list16-1.png")
       this.children[1].innerHTML="取消踩"
    }
    a++
})
// 点赞部分js
mui('.w_part-adds').on('tap','.w_cont3-img1',function() {
    if(a%2==0){
        this.setAttribute("src","images/w_list13.png")
        var s=Number(this.nextElementSibling.innerHTML)-1
        this.nextElementSibling.innerHTML=s
    }else {
        this.setAttribute("src","images/w_list13-1.png")
        var s=Number(this.nextElementSibling.innerHTML)+1
        this.nextElementSibling.innerHTML=s
    }
    a++
})
mui('.w_cont4-rig').on('tap','.w_cont4-img1',function() {
    if(a%2==0){
        this.setAttribute("src","images/w_list13.png")
        var s=Number(this.nextElementSibling.innerHTML)-1
        this.nextElementSibling.innerHTML=s
    }else {
        this.setAttribute("src","images/w_list13-1.png")
        var s=Number(this.nextElementSibling.innerHTML)+1
        this.nextElementSibling.innerHTML=s
    }
    a++
})
// 不感兴趣部分页面
mui(".mui-table-view").on('tap','#w_table-li',function(){
   art()
    mui.toast('不感兴趣成功，将减少此类推荐~',{ duration:'long', type:'div' }) 
})
mui(".mui-table-view").on('tap','#w_table-li11',function(){
    art()
    mui.toast('屏蔽成功，将不再推荐该作者~',{ duration:'long', type:'div' }) 
})
//评论部分页面js
mui("body").on('tap','.w_comment-img',function(){
    document.body.style.overflow='hidden';
    var com=document.getElementById("w_comment-list");
    com.style.display="block";
    mui(".w_comment-lt1").on('tap','.w_comimg',function(){
        var bnt=document.getElementsByClassName("mui-toast-container")[0];
        bnt.style.display="block";
        bnt.style.bottom="50%";
        document.body.style.overflow='auto';
       setTimeout(function(){
           bnt.style.display="none";
       },2000) 
      com.style.display="none";
    })
    mui("body").on("tap",".mui-backdrop",function(){
        com.style.display="none"
    })
})
