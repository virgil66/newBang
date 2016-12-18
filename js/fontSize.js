;(function(doc,win){
	var docEl = document.documentElement;
		resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
		recalc = function(){
			var clientWidth = docEl.clientWidth;
			if(!clientWidth) 
				return;
			//设置根字体的大小
			docEl.style.fontSize = 20 * (clientWidth / 320) + 'px'; 
			
			//自适应容器高度
			var container = document.querySelector('.container');
			
			//原始比例
			var proportion = 900 / 1440;
			document.body.style.height = clientWidth * proportion + 'px';
		}
		
	//绑定浏览器的缩放与加载时间
	window.addEventListener(resizeEvt,recalc,false);
	document.addEventListener('DOMContentLoaded',recalc,false);
})(document,window);
