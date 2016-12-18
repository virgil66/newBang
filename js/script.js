;(function($){
	//壹棒棒导航栏
	var $navBody = $('.nav-body');   //nav-body对象
	var $nav = $navBody.find('.nav-groups .nav-list');  //nav-content对象
	var $navBg = $navBody.find('.nav-bg-op');  //nav-bg对象
	var $navLink = $navBody.find('.nav-boy-list-link');  //nav-boy-list-link对象
	//导航栏图标对象
	var navObj = {
					"0":"home",
					"1":"introduce",
					"2":"service",
					"3":"app",
					"4":"help",
					"5":"shop"
	}

	var nIndex_ = 0;
	var bright = new Array("dark","light");    //图标颜色的暗亮定义
	var color1 = new Array("gray","white","blue");  //图标颜色的定义
	var color2 = new Array("#b5b6b7","#707172","#ffffff","#1EB9EE");   //导航栏文字颜色定义
	//nav-content悬浮效果实现
	$nav.hover(function(e){
		e.preventDefault();
		nIndex_ = $(this).index();
		colorChange1(this,bright[0],color1[0],color2[1]);
	},function(e){
		e.preventDefault();
		colorChange1(this,bright[1],color1[0],color2[0]);
	});

	$nav.on('click',function(e){
		e.preventDefault();
		nIndex_ = $(this).index();
		$(this)
			.parents('.nav')
			.parent()
			.css({
				zIndex:"2"
			})
			.find('.nav-bg').show()
			.find('.nav-boy-list').eq(nIndex_).show()
			.siblings().hide();
	});

	$navLink.hover(function(e){
		e.preventDefault();
		nIndex_ = $(this).parent().index();
		colorChange2(this,bright[1],color1[2],color2[3]);
	},function(e){
		e.preventDefault();
		colorChange2(this,bright[1],color1[1],color2[2]);
	})

	function colorChange1(e,bright,color1,color2){
		$(e)
			.find('.nav-icon')
			.attr({
				src:"images/nav/nav_"+ bright +"_"+ color1 +"_"+ navObj[nIndex_]+".png"
			})
			.siblings('.nav-word')
			.css({
				color:color2
			});
	}

	function colorChange2(e,bright,color1,color2){
		$(e)
			.find('>img')
			.attr({
				src:"images/nav/nav_"+ bright +"_"+ color1 +"_"+navObj[nIndex_]+".png"
			})
			.siblings('span')
			.css({
				color:color2
			});
	}

	//nav-bg单击背景隐藏
	$navBg.on('click',function(e){
		e.preventDefault();
		$(this)
			.parent()
			.hide()
			.parent()
			.css({
				zIndex:"0"
			});
	})
})(jQuery);