function getWidth(){
    var html =document.getElementsByTagName("html")[0]
    html.style.fontSize=(html.clientWidth / 375 )*100 +"px"
}
getWidth();
window.onresize= function (){
    getWidth()
}
// mui('body').on('tap','a',function(){ 
// 	window.top.localtion.href=this.href
// });
window.onload=function() {
	var retreat = document.getElementsByClassName('retreat')[0];
	retreat.onclick = function() {
		window.history.go(-1);
	}
}
mui(".y-attention").on('tap','.minefans',function(){
    // mui(".fans-item").
    foo()
})
mui(".y-attention").on('tap',".mineattention",function(){
    foo1()
})
// 点击我的粉丝和我的关注时的TAB切换
mui(".y-attention").on ("tap","span",function(){
    $(this).addClass("iconactive").siblings().removeClass("iconactive")
})
var attention =document.getElementsByClassName("attention-item")[0]
var fans = document.getElementsByClassName("fans-item")[0]
function foo(){
    attention.style.display="none"
    fans.style.display="block"
}
function foo1() {
    fans.style.display="none"
    attention.style.display="block"
}
// 点击关注时变为已关注
// mui(".attentionIcon").on('tap',".attention-txt",function(){
//     // $(this).innerHTML
//     // console.log($(this)[0].innerText.trim())
//     if($(this)[0].innerText.trim()=="关注"){
//         $(this)[0].innerText="已关注"
//         $(this)[0].parentNode.style.background="#ccc"
//     }else {
//         $(this)[0].innerText="关注"
//         $(this)[0].parentNode.style.background="#3d7eff"
//     }
// })
// // 个人主页关注
mui(".righticon").on('tap',".attention-text",function(){
    if($(this)[0].innerText=="关注"){
        $(this)[0].innerText="已关注"
        // $(this)[0].parentNode.removeChild($(this)[0].parentNode.firstElementChild)
        $(this)[0].parentNode.style.background="#ccc"
    }else {
        let icon =`<i class="attentionicon"></i>`
        // console.log($(this)[0].parentNode)
        // $(this)[0].parentNode.prepend(icon)
        $(this)[0].innerText="关注"
        $(this)[0].parentNode.style.background="#3d7eff"
    }
})
