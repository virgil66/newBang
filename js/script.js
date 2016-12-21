;(function($){
	//壹棒棒导航栏
	var $navBody = $('.nav-body');   //nav-body对象
	var $nav = $navBody.find('.nav-groups .nav-list');  //nav-content对象
	var $navBg = $navBody.find('.nav-bg-op');  //nav-bg对象
	var $navLink = $navBody.find('.nav-boy-list-link');  //nav-boy-list-link对象
	var $blockBtn = $navBody.find('.block-groups');   //block block-groups对象
	

	//blockBtn点击效果实现
	$blockBtn.on('click',function(e){
		e.preventDefault();
		$(this)
			.parent()
			.siblings('.nav-bg').show()
			.find('.nav-boy-list').show();
	})

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
		if(nIndex_ == 2 || nIndex_ == 4){
			$(this)
				.parents('.nav')
				.parent()
				.css({
					zIndex:"2"
				})
				.find('.nav-bg').show()
				.find('.nav-boy-list').eq(nIndex_).show()
				.siblings().hide();
		}
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


	// bang部分
	// home模块
	var $bang = $('.bang');  //bnag对象
	var $home = $bang.find('.home');  //home对象
	var $circleBtn = $home.find('.home-circle .home-circle-list');  //home-circle-list对象
	var $preBtn = $home.find('.home-pre >img');  //home-pre img对象
	var $nextBtn = $home.find('.home-next >img');  //home-next img对象
	var copy = $home.find('.home-item .home-item-list').first().clone();  //复制home-item-list
	$home.find('.home-item').append(copy);
	$home.find('.home-circle >li').eq(0).addClass('active');   //给第一个li增加active类
	var size = $home.find('.home-item .home-item-list').length;  //获取home-item home-item-list的个数
	var i = 0;

	//页面小于668px时，实现左右相互切换效果
	$preBtn.on('click',function(e){
		moveLeft(this);
	})

	$nextBtn.on('click',function(e){
		moveRight(this);
	})

	//页面大于668时，实现点击伦比哦标识来切换轮播
	$circleBtn.on('click',function(e){
		var index = $(this).index();  //获取li的序列号
		var itemsWidth = $home.find('.home-items').width();  //按钮点击时，获取home-items的宽度
		i = index;
		$(this).addClass('active').siblings().removeClass('active');
		$(this)
			.parent()
			.siblings('.home-item')
			.stop().animate({
				left: -i * itemsWidth
			},1000);
	})

	function moveLeft(e){
		i++;
		var itemsWidth = $home.find('.home-items').width();  //按钮点击时，获取home-items的宽度
		
		if(i == size){
			$(e)
				.parent()
				.siblings('.home-item')
				.css({
					left: "0"
				});
			i = 1;
		}
		$(e)
			.parent()
			.siblings('.home-item')
			.stop().animate({
				left: -i * itemsWidth
			},1000);
		
	}

	function moveRight(e){
		i--;
		var itemsWidth = $home.find('.home-items').width();
		if(i == -1){
			$(e)
				.parent()
				.siblings('.home-item')
				.css({
					left: -(size - 1 ) * itemsWidth
				},1000);
			i = size - 2;
		}
		$(e)
			.parent()
			.siblings('.home-item')
			.stop().animate({
				left: -i * itemsWidth
			},1000);
	}

	 //定义定时器，使其轮播自动播放
	var timing = setInterval(autoPlay,4000);  

	function autoPlay(){
		i++;
		var itemsWidth = $home.find('.home-items').width();  //按钮点击时，获取home-items的宽度
		if(i == size){
			$home
				.find('.home-item')
				.css({
					left: "0"
				});
			i = 1;
		}
		if(i == size - 1){
			$('.home-circle >li').eq(0).addClass('active').siblings().removeClass('active');
		}else{
			$('.home-circle >li').eq(i).addClass('active').siblings().removeClass('active');
		}
		$home
			.find('.home-item')
			.stop().animate({
				left: -i * itemsWidth
			},1000);
	}

	//鼠标放在home-pre 和 home-next上面时，自动播放停止；鼠标移除时，自动开始
	$('.home-items .home-pre').hover(function(e){
		clearInterval(timing);
	},function(e){
		timing = setInterval(autoPlay,4000);
	});

	$('.home-items .home-next').hover(function(e){
		clearInterval(timing);
	},function(e){
		timing = setInterval(autoPlay,4000);
	})

	//页面大于668时，鼠标放在图片上面，停止轮播；移除鼠标后，继续轮播
	$('.home-item .home-item-list').hover(function(e){
		var innerWidth = window.innerWidth;
		if(innerWidth > 668){
			clearInterval(timing);
		}else{
			timing = setInterval(autoPlay,4000);
		}
	},function(e){
		timing = setInterval(autoPlay,4000);
	});

	$circleBtn.hover(function(e){
		clearInterval(timing);
	},function(e){
		timing = setInterval(autoPlay,4000);
	})

})(jQuery);