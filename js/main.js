'use strict';

function throlle(fn, delay) {
	delay || (delay = 100);
	var timeout = null,
		starTime = new Date();
	clearTimeout(timeout);
	return function() {
		var endTime = new Date();
		if(endTime - starTime < delay) {
			timeout = setTimeout(function() {
				fn();
				starTime = endTime;
			}, delay);
		} else {
			fn();
		}
	}
}

var _rootWindow = $(window),
	_body = $('body');

var _app = _app || {};

_app.share = function() {
	var SimpleShare = function(options) {

		// get share content
		options = options || {};
		var url = options.url || window.location.href;
		var title = options.title || document.title;
		var content = options.content || '';
		var pic = options.pic || '';

		// fix content format
		url = encodeURIComponent(url);
		title = encodeURIComponent(title);
		content = encodeURIComponent(content);
		pic = encodeURIComponent(pic);

		// share target url
		var qzone = 'http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url={url}&title={title}&pics={pic}&summary={content}';
		var weibo = 'http://service.weibo.com/share/share.php?url={url}&title={title}&pic={pic}&searchPic=false';
		var tqq = 'http://share.v.t.qq.com/index.php?c=share&a=index&url={url}&title={title}&appkey=801cf76d3cfc44ada52ec13114e84a96';
		var renren = 'http://widget.renren.com/dialog/share?resourceUrl={url}&srcUrl={url}&title={title}&description={content}';
		var douban = 'http://www.douban.com/share/service?href={url}&name={title}&text={content}&image={pic}';
		var facebook = 'https://www.facebook.com/sharer/sharer.php?u={url}&t={title}&pic={pic}';
		var twitter = 'https://twitter.com/intent/tweet?text={title}&url={url}';
		var linkedin = 'https://www.linkedin.com/shareArticle?title={title}&summary={content}&mini=true&url={url}&ro=true';
		var weixin = 'https://api.qrserver.com/v1/create-qr-code/?size=120x120&data={url}';
		var qq = 'http://connect.qq.com/widget/shareqq/index.html?url={url}&desc={title}&pics={pic}';
		var tumblr = 'https://www.tumblr.com/widgets/share/tool?posttype=link&canonicalUrl={url}&title={title}&content={content}';
		var pinterest = 'https://www.pinterest.com/pin/create/button/?url={url}&media=" + encodeURIComponent(a))';

		// replace content functions
		function replaceAPI(api) {
			api = api.replace('{url}', url);
			api = api.replace('{title}', title);
			api = api.replace('{content}', content);
			api = api.replace('{pic}', pic);

			return api;
		}

		// share target
		this.qzone = function() {
			window.open(replaceAPI(qzone));
		};
		this.weibo = function() {
			window.open(replaceAPI(weibo));
		};
		this.tqq = function() {
			window.open(replaceAPI(tqq));
		};
		this.renren = function() {
			window.open(replaceAPI(renren));
		};
		this.douban = function() {
			window.open(replaceAPI(douban));
		};
		this.facebook = function() {
			window.open(replaceAPI(facebook));
		};
		this.twitter = function() {
			window.open(replaceAPI(twitter));
		};
		this.linkedin = function() {
			window.open(replaceAPI(linkedin));
		};
		this.qq = function() {
			window.open(replaceAPI(qq));
		};
		this.tumblr = function() {
			window.open(replaceAPI(tumblr));
		};
		this.pinterest = function() {
			window.open(replaceAPI(pinterest));
		};
		this.weixin = function(callback) {
			if(!callback) {
				// window.open(replaceAPI(weixin));
				var wxHtml = '<div class="wx-share"><i class="wx-share-close js-wxClose icon-close"></i><img src="' + replaceAPI(weixin) + '" alt=""><p>分享到朋友圈</p></div>';
				$('body').append(wxHtml);
			} else {
				callback(replaceAPI(weixin));
			}
		};
	};

	var share = new SimpleShare({
		url: '',
		title: '',
		content: '',
		pic: ''
	});

	$('.social a').on('click', function() {
		var type = $(this).attr('data-share');
		switch(type) {
			case 'twitter':
				share.twitter();
				break;
			case 'facebook':
				share.facebook();
				break;
			case 'linkedin':
				share.linkedin();
				break;
			case "weixin":
				share.weixin();
				break;
			case "weibo":
				share.weibo();
				break;
			case 'tumblr':
				share.tumblr();
				break;
			case 'pinterest':
				share.pinterest();
				break;
			case 'qzone':
				share.qzone();
				break;
			case 'douban':
				share.douban();
				break;
			default:
				break;
		}
	});
	$(document).on('click', '.js-wxClose', function() {
		$('.wx-share').remove();
	});
};

var header = {
	openMenu: function() {
		$('.m-menu').click(function() {
			console.log(_body)
			_body.toggleClass('open');
			$('.header-nav').fadeToggle();
			// if (_body.hasClass('open')) {
			// 	$('.subnav-wrap').fadeOut();
			// }

		})
	},
	setSubMenuPosition: function() {
		if($('.header-menu .item-nav').length <= 0) return;
		var nl = $('.header-menu .item-nav').eq(0).offset().left;
		_rootWindow.on('resize', function() {
			if($(this).width() > 1024) {
				//				nl = $('.header-menu .item-nav').eq(0).offset().left;
				//				$('.subnav-wrap').css({
				//					'left': nl + 'px'
				//				})
			} else {
				$('.subnav-wrap').removeAttr('style');
			}
		}).trigger('resize');

	},
	openSubMenu: function() {
		$('.header-menu .item-nav>a').click(function() {
			var _items = $(this).parent();
			if(_items.find('.subnav-wrap').length > 0) {
				_items.find('.subnav-wrap').fadeIn();
			}
		})
	},
	closeSubMenu: function() {
		$('.sub-title').click(function() {
			$(this).parent().fadeOut();
		})
	},
	move: function() {
		var _header = $('.header'),
			_moveObj = $('#bump path'),
			_moveWidth = $('#bump').width();
		var starBool = true;
		var tl = new TimelineMax();

		new TimelineMax().set(_moveObj, {
			scaleY: 0,
			scaleX: 2,
			svgOrigin: '200 0',
			transformOrigin: "50% top"
		})
		_header.on('mouseenter', function() {
			if(_rootWindow.width() <= 1024) return;
			$(this).addClass('active');
		}).on('mousemove', function(e) {
			if(_rootWindow.width() <= 1024) return;
			if(!starBool) return;
			var n = e.pageX;
			new TimelineMax().to(_moveObj, 1.8, {
				scaleY: .8,
				svgOrigin: '200 0',
				transformOrigin: "50% top",
				ease: Elastic.easeOut.config(.9, .2)
			}).to(_moveObj, .8, {
				scaleX: 1,
				svgOrigin: '200 0',
				transformOrigin: "50% top"
			}, 0).to('#bump', .8, {
				left: n,
				ease: Back.easeOut
			}, 0);
		}).on('mouseleave', function() {
			$(this).removeClass('active');
			new TimelineMax().to(_moveObj, 2.8, {
				scaleY: 0,
				scaleX: 2,
				svgOrigin: "200 0",
				transformOrigin: "50% top",
				ease: Back.easeOut
			});
		})
		$('.header-menu .item-nav').on('mouseenter', function(e) {
			if(_rootWindow.width() <= 1024) return;
			$(this).addClass('on');
			var n = $(this).offset().left + 40;
			new TimelineMax().to(_moveObj, 1.8, {
				scaleY: .8,
				svgOrigin: '200 0',
				transformOrigin: "50% top",
				ease: Elastic.easeOut.config(.9, .2)
			}).to(_moveObj, .8, {
				scaleX: 1,
				svgOrigin: '200 0',
				transformOrigin: "50% top"
			}, 0).to('#bump', .8, {
				left: n,
				ease: Back.easeOut
			}, 0);
			starBool = false;
		}).on('mouseleave', function() {
			if(_rootWindow.width() <= 1024) return;
			$(this).removeClass('on');
			new TimelineMax().to(_moveObj, 2.8, {
				scaleY: 0,
				scaleX: 2,
				svgOrigin: "200 0",
				transformOrigin: "50% top",
				ease: Back.easeOut
			});
			starBool = true;
		})

	},
	__init: function() {
		header.openMenu();
		header.openSubMenu();
		header.closeSubMenu();
		header.move();
		header.setSubMenuPosition();
	}
}

var footer = {
	onClickBt: function() {
		$('.bt-btn').click(function() {
			$('html,body').animate({
				'scrollTop': 0
			}, 750)
		})
	},
	starAnimate: function() {
		var scrollVal = $('.footer').offset().top - $('.footer').height() - $('.header').height();
		_rootWindow.on('scroll', function() {
			if($(this).scrollTop() + _rootWindow.height() >= $(document).height() - 200) {
				$('.fs-svg').addClass('active');
			}
		})
	},
	__init: function() {
		footer.onClickBt();
		// footer.starAnimate();
	}
}

var _common = {
	setColumneDesWH: function() {
		$('.pg-img').imagesLoaded(function() {
			$('.page-column .pg-img').each(function() {
				var self = $(this),
					pic = self.children('img');
				self.css({
					'width': pic.width(),
					'height': pic.height()
				})
			})
		});
	},
	getScrollVal: function(_id) {
		if(_id.length <= 0) return;
		var scrollTopVal = _id.offset().top - $('.header').outerHeight();
		$('html,body').animate({
			'scrollTop': scrollTopVal
		}, 1000);
	},
	getQueryVariable: function(variable) {
		var query = window.location.search.substring(1);
		var vars = query.split("&");
		for(var i = 0; i < vars.length; i++) {
			var pair = vars[i].split("=");
			if(pair[0] == variable) {
				return pair[1];
			}
		}
		return false;
	},
	scrollPosition: function() {
		var id = $('#' + _common.getQueryVariable('nav'));
		id.find('.pg-img').imagesLoaded(function() {
			_common.getScrollVal(id);
		});
	},
	setSharePosition: function() {
		if($('.nd-share').length > 0 && _rootWindow.width() > 1024) {
			var getOffsetTop = $('.nd-caption').offset().top + 5;
			$('.nd-share').css({
				'top': getOffsetTop
			});
		}
	},
	hideShare: function() {
		var shareObj = $('.nd-share') || {};
		if(shareObj.length <= 0 || _rootWindow.width() <= 1024) return;
		var _scrollVal = 0;
		if($('#scroll-prop').length > 0) {
			_scrollVal = $('#scroll-prop').offset().top - shareObj.height();
		} else {
			_scrollVal = $('.footer').offset().top - (shareObj.height() + $('.header').height() + 150);
		}
		_rootWindow.on('scroll', function() {
			if($(this).scrollTop() >= _scrollVal) {
				shareObj.fadeOut();
			} else {
				shareObj.fadeIn();
			}
		})
	},
	//右下角雪王加盟动画
	showServerModal: function() {
		$('.floating-infor').on('mouseenter', function() {
			if(_rootWindow.width() <= 1024) return;
			$('.modal-service__wrap').addClass('active');
			$('.floating-infor .icons-text').fadeOut();
		})
	},
	hideServerModal: function() {
		$('.modal-service__wrap').on('mouseleave', function() {
			if(_rootWindow.width() <= 1024) return;
			$(this).removeClass('active');
			$('.floating-infor .icons-text').fadeIn();
		})
	},

	__init: function() {
		// _common.setColumneDesWH();
		_common.setSharePosition();
		_common.hideShare();
		_common.showServerModal();
		_common.hideServerModal();
	}
}

function removePageStatus() {
	if(_rootWindow.width() > 1024) {
		$('.header-nav').removeAttr('style');
	}
}

$(function() {
	$('img.lazyload,.bg-cover.lazyload,img.picLazy').lazyload({
		skip_invisible: true, // true:不加载隐藏的不可见图像，false:为加载; 注意：Webkit浏览器将自动把没有宽度和高度的图像视为不可见
		threshold: 200, // 临界值，这个值是针对container容器的，即距离container容器视口的临界值，就是用来提前加载的。
		effect: 'fadeIn' //设定的效果

	});

	//WOW.js 自定义配置
	var wow = new WOW({
		boxClass: 'wow', //需要执行动画的元素的class
		animateClass: 'animated', //animation.css动画的class
		offset: 0, //距离可视区域多少开始执行动画
		mobile: true, //是否在移动设备上执行动画
		live: true //异步加载的内容是否有效
	});
	wow.init();
	_app.share();
	header.__init();
	footer.__init();
	_common.__init();

	_rootWindow.on('resize', throlle(removePageStatus, 100)).trigger('resize');
})

//index页面的
var indexPage = {
	_inProSlider: null,
	setModalWidth: function() {
		var getPV = parseFloat($('.statement-box').css('padding-left')),
			getInnerW = $('.statement-box .txt').width() + 5;
		$('.statement-box').css('width', getPV * 2 + getInnerW);
	},
	inBannerSlider: function() {
		var sliderBan = null;
		sliderBan = $('.in-banner').slick({
			dots: true,
			arrows: false,
			speed: 800,
			autoplay: true,
			autoplaySpeed: 5000,
			pauseOnHover: false //悬停时暂停自动播放
		})
		$('.in-banner').addClass('in-ready');
	},
	inMaterialsSlider: function() {
		var $slider = null;
		$slider = $('.inm-intro__slick').slick({
			dots: false,
			arrows: false,
			speed: 600,
			fade: true, //启用淡入淡出
			prevArrow: '.in-materials__full .sa-prev', //允许您选择节点或为“上一个”箭头自定义HTML
			nextArrow: '.in-materials__full .sa-next',
			responsive: [{
				breakpoint: 980,
				settings: {
					arrows: true
				}
			}]
		})

		$slider.on('afterChange', function(event, slick, currentSlide, nextSlide) {
			$('.inm-intro__slick').find('.slick-current').addClass('active').siblings().removeClass('active');
			$('.inm-dots__slick .item-box').removeClass('on').eq(currentSlide).addClass('on');
		});

		$('.inm-dots__slick a').click(function() {
			var thatEle = $(this).parent(),
				_i = thatEle.index();
			thatEle.addClass('on').siblings().removeClass('on');
			$slider.slick('slickGoTo', _i);
		});

		$('.inm-intro__slick').find('.slick-current').addClass('active');

	},

	//三款产品 幻灯片slick部分
	inProductSlider: function() {
		indexPage._inProSlider = $('.in-product__slick').slick({
			dots: false, //指示点
			arrows: false, //左右箭头
			infinite: true, //循环播放
			speed: 1200, //滑动时间
			centerMode: true, //中心模式
			variableWidth: true, //变量宽度 可变宽度幻灯片
			draggable: false, //启用桌面拖动
			initialSlide: 1, //初始滑块		--> 从哪开始
			asNavFor: '.in-product__intro', //将滑块设置为其他滑块的导航（类或ID名称）
			// 响应式断点  断点触发设置         官方解释：包含断点和设置对象的对象。在给定的屏幕宽度下启用设置设置。将设置设置为“ unslick”而不是对象，以禁用给定断点处的滑动。
			responsive: [{
				breakpoint: 1024,
				settings: {
					dots: true,
					autoplay: true,
					infinite: false,
					initialSlide: 0
				}
			}]
		})

		var _intro = $('.in-product__intro').slick({
			dots: false,
			arrows: false,
			infinite: true,
			speed: 800,
			fade: true,
			asNavFor: '.in-product__slick',
			initialSlide: 1,
			responsive: [{
				breakpoint: 1024,
				settings: {
					infinite: false,
					initialSlide: 0
				}
			}]
		})

		// $('.in-product__slick img').lazyload({
		//     threshold: 200,
		//     effect: 'fadeIn'
		// })
		$('.in-product__slick .slick-current ').addClass('slick-ani');
		indexPage._inProSlider.on('beforeChange', function(event, slick, currentSlide, nextSlide) {
			$('.in-product__slick .slick-slide ').removeClass('slick-ani');
		});
		indexPage._inProSlider.on('afterChange', function(event, slick, currentSlide, nextSlide) {
			$('.in-product__slick .slick-current ').addClass('slick-ani');
			$('.in-product__slick .lazyload ').lazyload({
				threshold: 200, //提前加载
				effect: 'fadeIn' //设定效果
			})
		});

		$('.inp-item__img').click(function() {
			var _i = $(this).parents('.slick-slide').attr('data-slick-index');
			indexPage._inProSlider.slick('slickGoTo', _i);
		})

	},
	closeStatement: function() {
		$('.statement-wrap .st-btn').click(function() {
			$('.statement-wrap').fadeOut();
			$('body,html').removeClass('no-scroll');
		})
		//点击右上角的关闭
		$('.circle-add').click(function() {
			$('.statement-wrap').fadeOut();
			$('body,html').removeClass('no-scroll');
		})
		//点击空白区域关闭
		var statementBox = $('.statement-box')
		$(document).mouseup(function(e) {
			if(!statementBox.is(e.target)) {
				$('.statement-wrap').fadeOut();
				$('body,html').removeClass('no-scroll');
			}
		})
		//严正声明部分 五秒后隐藏
//		setTimeout(function() {
//			$('.statement-wrap').fadeOut();
//			$('body,html').removeClass('no-scroll');
//		}, 5000)
	},


	addScrollAnimate: function() {
		var hArr = [],
			i = 0;
		var headHeight = $('.header').height();

		var timeout = null;
		$('.in-scroll__sec').each(function() {
			hArr.push($(this).offset().top - headHeight - 380);
		});

		_rootWindow.on('scroll', function() {
			var scrollTop = $(this).scrollTop();
			for(i = 0; i < hArr.length; i++) {
				if(scrollTop >= hArr[i]) {
					$('.in-scroll__sec').eq(i).addClass('active');
				}
			}
		})
	},
	isSec3Area: function() {
		var timeout = null;
		if(_rootWindow.width() <= 1024) return;
		$('.in-product__full').on('mouseenter', function() {
			timeout = setTimeout(function() {
				indexPage._inProSlider.slick('slickPlay');
			}, 5000);
		}).on('mouseleave', function() {
			clearTimeout(timeout);
		});
	},
	__init: function() {
		indexPage.inBannerSlider();
		indexPage.inProductSlider();
		indexPage.inMaterialsSlider();
		indexPage.closeStatement();
		indexPage.addScrollAnimate();
		indexPage.isSec3Area();
		// _rootWindow.on('resize',throlle(indexPage.setModalWidth,100)).trigger('resize');
	}
}

var productPage = {
	proMemberSlick: function() {
		$('.pro-present__slick').slick({
			dots: true,
			arrows: false,
			fade: true,
			speed: 800,
			prevArrow: '.pro-present__box .sa-prev',
			nextArrow: '.pro-present__box .sa-next',
			responsive: [{
					breakpoint: 768,
					settings: {
						arrows: true
					}
				}

			]
		})
	},
	proThemeSlick: function() {
		var ptSlick = null;
		ptSlick = $('.pro-theme__slick').slick({
			dots: false,
			arrows: false,
			prevArrow: '.pro-theme__full .sa-prev',
			nextArrow: '.pro-theme__full .sa-next',
			slidesToShow: 3,
			responsive: [{
					breakpoint: 1024,
					settings: {
						slidesToShow: 2,
						arrows: true
					}
				},
				{
					breakpoint: 700,
					settings: {
						slidesToShow: 1,
						arrows: true
					}
				}
			]
		})

		ptSlick.on('afterChange', function(event, slick, currentSlide, nextSlide) {
			$('.pro-theme__full .slick-current img').lazyload({
				threshold: 200,
				effect: 'fadeIn'
			})
		});
	},
	proListAni: function() {
		if($(window).width() <= 1024) return;
		//时间轴
		new TimelineMax().set($('.list-product path'), {
			scaleY: 0,
			scaleX: 2,
			svgOrigin: '200 0',
			transformOrigin: "50% bottom",
		});
		$('.list-product svg').show();
		var pathBool = false;
		$('.list-product .row-3 a').on('mouseenter', function() {
			if($(window).width() <= 1024) return;
			var _path = $(this).find('path');
			var _lis = $(this).parent();
			// 在0.8秒添加动画
			new TimelineMax().to(_path, .8, {
				scaleY: 0.4,
				scaleX: 1,
				svgOrigin: '200 0',
				transformOrigin: "50% bottom",
				ease: Elastic.easeOut.config(.9, .2)
			}).to(_path, .6, {
				scaleY: 1,
				scaleX: 1,
				svgOrigin: '200 0',
				transformOrigin: "50% bottom"
			}, 0);

		}).on('mouseleave', function() {
			if($(window).width() <= 1024) return;
			var _path = $(this).find('path');
			new TimelineMax().to(_path, 1, {
				scaleY: 0,
				scaleX: 2,
				svgOrigin: "200 0",
				transformOrigin: "50% bottom"
			});
			pathBool = false;
		})
	},
	toggleFiltrate: function() {
		$('.list-filtrate a').click(function() {
			$(this).parent().addClass('on').siblings().removeClass('on');
		})
	},
	showProductInner: function() {
		$(document).on('click', '.list-product .row-3 a', function() {
			if($(window).width() > 1024) return;
			var _li = $(this).parent('li'),
				_path = _li.find('path');
			_li.toggleClass('active').siblings().removeClass('active')
			// if(_li.hasClass('active')){
			//     new TimelineMax().to(_path, 1, {
			//         scaleY: 0,
			//         scaleX: 2,
			//         svgOrigin: "200 0",
			//         transformOrigin: "50% bottom"
			//     });
			//     _li.removeClass('active');
			// }else{
			//     _li.addClass('active');
			//     new TimelineMax().to(_path, .8, {
			//         scaleY: 0.4,
			//         scaleX: 1,
			//         svgOrigin: '200 0',
			//         transformOrigin: "50% bottom",
			//         ease: Elastic.easeOut.config(.9, .2)
			//     }).to(_path, .6, {
			//         scaleY: 1,
			//         scaleX: 1,
			//         svgOrigin: '200 0',
			//         transformOrigin: "50% bottom"
			//     }, 0);
			// }
		})
	},
	getProductListInner: function() {
		$.address.state('/').init(function() {
			$('.js-product a').address();
		}).change(function(event) {
			refreshProductList(event.value);
		});

		function refreshProductList(href) {
			// var content1 = $('#js-product-content-1');
			// // alert(123)
			// $.ajax({
			// 	type: "get",
			// 	url: href,
			// 	success: function(data) {
			// 		var new_content1 = $(data).find("#js-product-content-1");
			// 		content1.hide().html(new_content1.html()).stop().fadeIn();
			// 		$('.list-product img').lazyload({
			// 			threshold: 200,
			// 			effect: 'fadeIn'
			// 		})
			// 		productPage.proListAni();
			// 	}
			// });
		}
	},
	__init: function() {
		productPage.proMemberSlick();
		productPage.proThemeSlick();
		productPage.proListAni();
		productPage.toggleFiltrate();
		productPage.getProductListInner();
		productPage.showProductInner();
	}
}

var storePage = {
	setFiltrateAni: function() {
		$('.store-design__filtrate li').each(function() {
			if($(window).width() <= 1024) return;
			var that = $(this);
			if(that.hasClass('on')) return;
			var _path = that.find('path');
			new TimelineMax().set(_path, {
				scaleY: 0,
				scaleX: 2,
				svgOrigin: '200 0',
				transformOrigin: "50% top"
			})
		});

		if($(window).width() > 1024) {
			$('.store-design__filtrate .dec svg').show();
		}

		$('.store-design__filtrate li').on('mouseenter', function() {
			if($(window).width() <= 1024) return;
			if($(this).hasClass('on')) return;
			var _path = $(this).find('path');
			setTimeout(function() {
				new TimelineMax().to(_path, .6, {
					scaleY: .4,
					scaleX: .5,
					svgOrigin: '200 0',
					transformOrigin: "50% top",
					ease: Elastic.easeOut.config(.9, .2),
					delay: .4
				}).to(_path, .4, {
					scaleY: 1,
					scaleX: 1,
					svgOrigin: '200 0',
					transformOrigin: "50% top",
					delay: .4
				}, 0);
			}, 200);

		}).on('mouseleave', function() {
			if($(window).width() <= 1024) return;
			if($(this).hasClass('on')) return;
			var _path = $(this).find('path');
			new TimelineMax().to(_path, .6, {
				scaleY: 0,
				svgOrigin: "200 0",
				transformOrigin: "50% top"
			});
		})
	},
	filtrateToggle: function() {
		$('.store-design__filtrate a').click(function() {
			var _lis = $(this).parents('li'),
				_path = _lis.siblings().find('path');
			_lis.addClass('on').siblings().removeClass('on');
			new TimelineMax().to(_path, .6, {
				scaleY: 0,
				svgOrigin: "200 0",
				transformOrigin: "50% top"
			});
		})
	},
	//新门店形象部分
	designSlick: function() {
		var sliderPic = $('.sd-pic__slick').not('.slick-initialized').slick({
			dots: false,
			arrows: false,
			asNavFor: '.sd-lb__slick',
			infinite: false,
			fade: true
		})
		var sliderDots = $('.sd-lb__slick').not('.slick-initialized').slick({
			dots: false,
			arrows: true,
			infinite: false,
			prevArrow: '.sd-left__box .sa-prev',
			nextArrow: '.sd-left__box .sa-next',
			slidesToShow: 4,
			slidesToScroll: 1,
			asNavFor: '.sd-pic__slick',
			responsive: [{
					breakpoint: 1366,
					settings: {
						slidesToShow: 3
					}
				},
				{
					breakpoint: 1100,
					settings: {
						slidesToShow: 5
					}
				},
				{
					breakpoint: 1024,
					settings: {
						slidesToShow: 4
					}
				},
				{
					breakpoint: 650,
					settings: {
						slidesToShow: 3
					}
				}
			]
		})

		sliderDots.on('afterChange', function(event, slick, currentSlide, nextSlide) {
			$('.sd-lb__slick .slick-active img').lazyload({
				threshold: 200,
				effect: 'fadeIn'
			});
		});

		sliderPic.on('afterChange', function(event, slick, currentSlide, nextSlide) {
			$('.sd-pic__slick  .slick-current img').lazyload({
				threshold: 200,
				effect: 'fadeIn'
			});
		});
		$('.sd-lb__slick a').click(function() {
			var items = $(this).parents('.slick-slide'),
				_i = items.index();
			sliderDots.slick('slickGoTo', _i);
		})
	},
	//原页面 门店形象变迁部分
	historySlick: function() {
		var _sliderPic = $('.sh-slick').slick({
			dots: true,
			arrows: true,
			infinite: true,
			prevArrow: '.sr-arrow .sr-prev',
			nextArrow: '.sr-arrow .sr-next',
			asNavFor: '.shl-text__slick',
			draggable: false,
			fade: true
		})

		$('.shl-text__slick').slick({
			dots: false,
			arrows: false,
			infinite: true,
			asNavFor: '.sh-slick',
			draggable: false,
			fade: true
		})

		// 历代门店的角标数字  现页面会用到
		var len = $('.sh-slick .slick-dots li').length;
		var pn = '1/' + len;
		$('.shk-page').text(pn);

		$('.sh-slick .slick-current').addClass('afActive');
		// _sliderPic.on('beforeChange', function (event, slick, currentSlide, nextSlide) {
		//                   $('.sh-slick .slick-current').addClass('bfActive').siblings().removeClass('afActive');
		//               });
		_sliderPic.on('init reInit afterChange', function(event, slick, currentSlide, nextSlide) {
			// $('.sh-slick .slick-current').addClass('afActive').siblings().removeClass('bfActive');
			var i = (currentSlide ? currentSlide : 0) + 1;
			$('.shk-page').text(i + '/' + slick.slideCount);
		});
	},
	//门店查询部分
	storeSearch: function() {
		var box = $('.sq-form__box');
		$('.sq-form__box input').on('focus', function() {
			box.addClass('active');
		}).on('blur', function() {
			box.removeClass('active');
		})
	},
	getStoreInner: function() {
		$.address.state('/').init(function() {
			$('.js-store-new a').address();
		}).change(function(event) {
			refreshProductList(event.value);
		});

		function refreshProductList(href) {
			var content = $('#js-store-new-content');
			$.ajax({
				type: "get",
				url: href,
				success: function(data) {
					var new_content1 = $(data).find("#js-store-new-content");
					content.hide().html(new_content1.html()).stop().fadeIn();
					storePage.designSlick();
					$('.sd-left__box .slick-active img,.sd-right__box img').lazyload({
						threshold: 200,
						effect: 'fadeIn'
					})
				}
			});
		}
	},
	__init: function() {
		storePage.setFiltrateAni();
		storePage.filtrateToggle();
		storePage.designSlick();
		storePage.historySlick();
		storePage.getStoreInner();
		storePage.storeSearch();
	}
}

//加盟咨询视频部分
var cooperationPage = {
	vidObj: document.getElementById('vid') || {},
	teamSlider: function() {
		var sliderObj = $('.cpt-team__list').slick({
			dots: false,
			arrows: false,
			slidesToShow: 3,
			responsive: [{
					breakpoint: 1024,
					settings: {
						dots: true,
						autoplay: true,
						autoplaySpeed: 5000,
						slidesToShow: 2
					}
				},
				{
					breakpoint: 650,
					settings: {
						dots: true,
						autoplay: true,
						autoplaySpeed: 5000,
						slidesToShow: 1
					}
				}
			]
		})

		sliderObj.on('afterChange', function(event, slick, currentSlide, nextSlide) {
			$('.cpt-team__list .slick-current img').lazyload({
				threshold: 200,
				effect: 'fadeIn'
			})
		});
	},
	principleSlider: function() {
		$('.cpt-principle__slick').slick({
			dots: false,
			arrows: false,
			slidesToShow: 3,
			prevArrow: '.cpt-principle__list .sa-prev',
			nextArrow: '.cpt-principle__list .sa-next',
			responsive: [{
					breakpoint: 1024,
					settings: {
						arrows: true,
						autoplay: true,
						autoplaySpeed: 5000,
						slidesToShow: 2
					}
				},
				{
					breakpoint: 800,
					settings: {
						dots:true,
						arrows: true,
						autoplay: true,
						autoplaySpeed: 5000,
						slidesToShow: 1
					}
				}
			]
		})
	},
	showVideo: function() {
		var sourceDom = null,
			vidSrc = null;
		$('.cpt-team__list .cpt-vid,.cpt-team__list .m-vid').click(function() {
			vidSrc = $(this).attr('data-video');
			$('#vid').attr('src', vidSrc);
			$('.modal-video__wrap').fadeIn(200);
			cooperationPage.vidObj.play();
		})
	},
	closeVideo: function() {
		$('.mv-close,.mv-vg').click(function() {
			cooperationPage.vidObj.pause();
			$('.modal-video__wrap').fadeOut(200);
			$('#vid').attr('src', '');
		})
	},
	setVidBtnAni: function() {
		if($(window).width() <= 1024) return;
		new TimelineMax().set($('.cpt-team__list path'), {
			scaleY: 0,
			scaleX: 1,
			svgOrigin: '200 0',
			transformOrigin: "50% bottom"
		});

		$(document).on('mouseenter', '.cpt-team__list a', function() {
			if($(window).width() <= 1024) return;
			var _path = $(this).find('path');
			new TimelineMax().to(_path, .6, {
				scaleY: 0.4,
				svgOrigin: '200 0',
				transformOrigin: "50% bottom",
				ease: Elastic.easeOut.config(.9, .2)
			}).to(_path, .4, {
				scaleY: 1,
				scaleX: 1,
				svgOrigin: '200 0',
				transformOrigin: "50% bottom"
			}, 0);
		}).on('mouseleave', '.cpt-team__list a', function() {
			if($(window).width() <= 1024) return;
			var _path = $(this).find('path');
			new TimelineMax().to(_path, .6, {
				scaleY: 0,
				svgOrigin: "200 0",
				transformOrigin: "50% bottom"
			});
		})
	},
	queryFull: function() {
		$('.cpt-query__list li').on('click', function() {
			var that = $(this);
			that.toggleClass('on').siblings().removeClass('on');
			that.find('.txt').slideToggle(200);
			that.siblings().find('.txt').slideUp(200);
		})
	},
	emptyResizeAttr: function() {
		if(_rootWindow.width() > 1024) {
			new TimelineMax().set($('.cpt-team__list path'), {
				scaleY: 0,
				scaleX: 1,
				svgOrigin: '200 0',
				transformOrigin: "50% bottom"
			});
		} else {
			new TimelineMax().set($('.cpt-team__list path'), {
				scaleY: 1,
				scaleX: 1,
				svgOrigin: '200 0',
				transformOrigin: "50% bottom"
			});
		}
	},
	__init: function() {
		cooperationPage.teamSlider();
		cooperationPage.principleSlider();
		cooperationPage.setVidBtnAni();
		cooperationPage.queryFull();
		cooperationPage.showVideo();
		cooperationPage.closeVideo();
		_rootWindow.on('resize', throlle(cooperationPage.emptyResizeAttr, 100)).trigger('resize');
	}
}

//原页面
var joinPage = {
	svgAniBool: false,
	jobSlider: function() {
		var _slider = [];
		$('.ji-job__slick').each(function(i) {
			var self = $(this);
			_slider[i] = self.slick({
				dots: true,
				arrows: true,
				prevArrow: self.parent().find('.sa-prev'),
				nextArrow: self.parent().find('.sa-next'),
				speed: 800,
				slidesToShow: 4,
				slidesToScroll: 4,
				infinite: false,
				responsive: [{
						breakpoint: 1100,
						settings: {

							slidesToShow: 3,
							slidesToScroll: 3
						}
					},
					{
						breakpoint: 1024,
						settings: {

							slidesToShow: 2,
							slidesToScroll: 2
						}
					},
					{
						breakpoint: 650,
						settings: {
							dots: false,
							slidesToShow: 1,
							slidesToScroll: 1
						}
					}
				]
			})
			var allItemLen = _slider[i].find('.slick-slide').length;
			var len = _slider[i].find('.slick-dots li').length,
				curLen = _slider[i].find('.slick-active').length;

			var line = _slider[i].parents('.ji-job__list').find('.slick-line i');
			var fillVal = (100 / len) + '%';
			if(len == 0) {
				fillVal = '100%';
			} else {
				fillVal = (100 / len) + '%';
			}
			line.width(fillVal);

			if(allItemLen <= curLen && _rootWindow.width() > 1024) {
				_slider[i].parent().find('.slider-arrow').addClass('forbid');
			}
			_slider[i].on('afterChange', function(event, slick, currentSlide, nextSlide) {
				$('.ji-job__slick .slick-active img').lazyload({
					threshold: 200,
					effect: 'fadeIn'
				});
				if(currentSlide == 0) {
					fillVal = 100 / len + '%';
				} else {
					fillVal = (100 / len) * (currentSlide + 1) + '%';
				}
				line.width(fillVal);
			});

		})

	},
	linkBtnAni: function() {
		if(_rootWindow.width() > 1024) {
			new TimelineMax().set($('.ji-job__slick path'), {
				scaleY: 0,
				scaleX: 1,
				svgOrigin: '200 0',
				transformOrigin: "50% bottom",
			});
		}

		$('.ji-job__slick a').on('mouseenter', function() {
			if(_rootWindow.width() <= 1024) return;
			var _path = $(this).find('path');
			new TimelineMax().to(_path, .6, {
				scaleY: 0.4,
				svgOrigin: '200 0',
				transformOrigin: "50% bottom",
				ease: Elastic.easeOut.config(.9, .2)
			}).to(_path, .4, {
				scaleY: 1,
				scaleX: 1,
				svgOrigin: '200 0',
				transformOrigin: "50% bottom",
				left: 0

			}, 0);
		}).on('mouseleave', function() {
			if(_rootWindow.width() <= 1024) return;
			var _path = $(this).find('path');
			new TimelineMax().to(_path, .6, {
				scaleY: 0,
				svgOrigin: "200 0",
				transformOrigin: "50% bottom"
			});
		})
	},
	listWealAnimate: function() {
		$('.jiw-list a').on('mouseenter', function() {
			if(_rootWindow.width() <= 1024) return;
			var _path = $(this).find('path');
			new TimelineMax().to(_path, .8, {
				scaleY: 0.4,
				scaleX: 1,
				svgOrigin: '200 0',
				transformOrigin: "50% bottom",
				// ease: Elastic.easeOut.config(.9, .2)
			}).to(_path, .6, {
				scaleY: 1,
				scaleX: 1,
				svgOrigin: '200 0',
				transformOrigin: "50% bottom"
			}, 0);

		}).on('mouseleave', function() {
			if(_rootWindow.width() <= 1024) return;
			var _path = $(this).find('path');
			new TimelineMax().to(_path, 1, {
				scaleY: 0,
				scaleX: 2,
				svgOrigin: "200 0",
				transformOrigin: "50% bottom"
			});
		})
	},
	onClickShowWeal: function() {
		$('.ji-welfare__list a').click(function() {
			if(_rootWindow.width() > 1024) return;
			var eleParent = $(this).parent();
			eleParent.parents('.item-box').siblings().find('li').removeClass('active');
			eleParent.toggleClass('active').siblings().removeClass('active');
		})
	},
	emptySvgAnimate: function() {
		if(_rootWindow.width() <= 1024) {
			$('.jiw-list svg').hide();
			if(!joinPage.svgAniBool) {
				new TimelineMax().set($('.ji-job__slick path'), {
					scaleY: 1,
					scaleX: 1,
					svgOrigin: '200 0',
					transformOrigin: "50% bottom"
				});
				joinPage.svgAniBool = true;
			}

		} else {
			new TimelineMax().set($('.jiw-list path'), {
				scaleY: 0,
				scaleX: 1,
				svgOrigin: '200 0',
				transformOrigin: "50% bottom",
			});
			$('.jiw-list svg').show();
			if(!joinPage.svgAniBool) return;
			new TimelineMax().set($('.ji-job__slick path'), {
				scaleY: 0,
				scaleX: 1,
				svgOrigin: '200 0',
				transformOrigin: "50% bottom",
			});

			joinPage.svgAniBool = false;
		}
	},
	__init: function() {
		joinPage.jobSlider();
		joinPage.linkBtnAni();
		joinPage.onClickShowWeal();
		joinPage.listWealAnimate();
		_rootWindow.on('resize', throlle(joinPage.emptySvgAnimate, 300)).trigger('resize');
	}
}

$(window).on('load', function() {
	_common.scrollPosition();
})
