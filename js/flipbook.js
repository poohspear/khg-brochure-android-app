/*-----------------------------------------------------------------------------------*/
/*	Flip Book JS
/*-----------------------------------------------------------------------------------*/

(function () {

	/* Basic Settings */
	
	// define pages (default are numbers 1-N)
	var pages = ['cover', 'cover', 'table-of-content', 'table-of-content', 'presentation', 'presentation', 'platforms', 'platforms', 
					'features', 'features', 'responsive-design', 'responsive-design', 'configuration', 'configuration', 'media', 'media',
					'back-cover', 'back-cover'],
		tocIndex = 3, /* table of content index */
		zoomStrength = 2, /* zoom strength */
		slideShowInterval = 2000; /* slide show delay in miliseconds */
	
	/* do NOT EDIT bellow this line */
	
	// check hash
	function checkHash(hash) {
		var hash = getHash(), 
			k, 
			intRegex = /^\d+$/;
		
		if (( k = jQuery.inArray(hash, pages)) != -1) {
			k = k+1;
		} else if (intRegex.test(hash)) {
			k = hash;
		} else {
			k = 1;
		}
		
		return k;
	}
	
	// get url 
	function getURL() {
			return window.location.href.split('#').shift();
	}
	
	// get hash tag from url
	function getHash() {
			return window.location.hash.slice(1);
	}
	
	// set hash tag
	function setHashTag(flipbook) {
		var currentID = flipbook.turn('page'),
			pageURL;
			
		if(pages[currentID] != "" && pages[currentID] != undefined) {
			pageURL = getURL() + '#' + pages[currentID];
		} else {
			if(currentID % 2 != 0)
				pageURL = getURL() + '#' + currentID;
			else if(currentID == flipbook.data().totalPages)
				pageURL = getURL() + '#' + currentID;
			else
				pageURL = getURL() + '#' + (currentID + 1);	
		}
			
		window.location.href = pageURL;
	}
	
	// fired when hash changes inside URL
	function hashChange(flipbook, fbCont) {
		var page = checkHash(),
			position = flipbook.position();
			
		page = parseInt(page);
		
		if(page-1 == flipbook.turn('page')) // check if the current page is ok
			return;
			
		if(page == flipbook.data().totalPages) {
			disableShadows(flipbook);
			flipbook.turn('page', page);
		} else if(page % 2 != 0) {
			disableShadows(flipbook);
			flipbook.turn('page', page);
		} else {
			disableShadows(flipbook);
			flipbook.turn('page', (page+1));	
		}
		
		if(page == 1){
			flipbook.children('div.fb-shadow-top-left').animate( { opacity: 0 }, 200);
			flipbook.children('div.fb-shadow-bottom-left').animate( { opacity: 0 }, 200);
			fbCont.find('div.preview').animate( {
				opacity: 0,
				left: position.left
			}, 500, 'easeOutExpo');
		} else if (page == flipbook.data().totalPages) {
			flipbook.children('div.fb-shadow-top-right').animate( { opacity: 0 }, 200);
			flipbook.children('div.fb-shadow-bottom-right').animate( { opacity: 0 }, 200);
			fbCont.find('div.next').animate( {
				opacity: 0,
				left: position.left + flipbook.width() - 50
			}, 500, 'easeOutExpo');
		}
	}
	
	// add inside book shadow
	function addInsideBookShadow(flipbook) {
		
		// inside book shadow
		flipbook.find('div.even div.fb-page').prepend('<div class="fb-inside-shadow-left"></div>');
		flipbook.find('div.odd div.fb-page').prepend('<div class="fb-inside-shadow-right"></div>');
		flipbook.find('div.last div.fb-page').prepend('<div class="fb-inside-shadow-left"></div>');
		flipbook.find('div.first div.fb-page').prepend('<div class="fb-inside-shadow-right"></div>');
	
		// edge page shadow
		flipbook.find('div.even div.fb-page').prepend('<div class="fb-page-edge-shadow-left"></div>');
		flipbook.find('div.odd div.fb-page').prepend('<div class="fb-page-edge-shadow-right"></div>');
		
		//bottom book page (under pages)
		flipbook.append('<div class="fb-shadow-bottom-left"></div>');
		flipbook.append('<div class="fb-shadow-bottom-right"></div>');
		flipbook.append('<div class="fb-shadow-top-left"></div>');
		flipbook.append('<div class="fb-shadow-top-right"></div>');
	}
	
	// hide shadows
	function hideShadows(caller, arrow, flipbook, fbCont, posLeft) {
		var view = flipbook.turn('view'),
			page = flipbook.turn('page'),
			active,
			nextY, nextYend,
			prevY, prevYend,
			posLeft,
			animate = false;
	
		if(animate)
			return;	
	
		if(!jQuery.isNumeric(posLeft)){
			posLeft = parseInt(flipbook.position().left);
		} else {
			animate = true;
		}
		
		if(caller == 'start' || animate)
			active = flipbook.activePageCorner();
		
		if(caller == 'start' && active != 'tl' && active != 'bl' && active != 'tr' && active != 'br' ||
			animate && active != 'tl' && active != 'bl' && active != 'tr' && active != 'br') {
			active = arrow;
		}
	
		flipbook.children('div.fb-shadow-top-left').stop().clearQueue();
		flipbook.children('div.fb-shadow-bottom-left').stop().clearQueue();
		flipbook.children('div.fb-shadow-top-right').stop().clearQueue();
		flipbook.children('div.fb-shadow-bottom-right').stop().clearQueue();
		if(animate){
			fbCont.find('div.preview').stop().clearQueue();
			fbCont.find('div.next').stop().clearQueue();
		} 
	
		if(fbCont.find('div.preview').hasClass('small')) {
			nextY = posLeft + flipbook.width() - 40;
			prevY = posLeft - 45;
			nextYend = posLeft + flipbook.width() - 50;
			prevYend = posLeft;
		} else {
			nextY = posLeft + flipbook.width() + 24;
			prevY = posLeft - 110;
			nextYend = posLeft + flipbook.width() - 50;
			prevYend = posLeft;
		}
	
		
		if( (page == 2 && animate) && active == 'tl' ||
			(page == 2 && animate) && active == 'bl' || 
			(page == 2 && animate) && active == 'left' ){
		
			flipbook.children('div.fb-shadow-top-left').animate( { opacity: 0 }, 200);
			flipbook.children('div.fb-shadow-bottom-left').animate( { opacity: 0 }, 200);
			/*
			fbCont.find('div.preview').animate( {
				opacity: 0,
				left: prevYend
			}, 500, 'easeOutExpo', function(){
				animate = false;
			});
			*/
			fbCont.find('div.next').animate( {
				opacity: 1,
				left: nextY
			}, 500, 'easeOutExpo', function(){
				animate = false;
			});
		} else if ( (page == (flipbook.data().totalPages - 2) && animate) && active == 'tr' || 
					(page == (flipbook.data().totalPages - 2) && animate) && active == 'br' || 
					(page == (flipbook.data().totalPages - 2) && animate) && active == 'right' ){
			flipbook.children('div.fb-shadow-top-right').animate( { opacity: 0 }, 200);
			flipbook.children('div.fb-shadow-bottom-right').animate( { opacity: 0 }, 200);
			/*
			fbCont.find('div.next').animate( {
				opacity: 0,
				left: nextYend
			}, 500, 'easeOutExpo', function(){
				animate = false;
			});
			*/
			fbCont.find('div.preview').animate( {
				opacity: 1,
				left: prevY
			}, 500, 'easeOutExpo', function(){
				animate = false;
			});
	
		} else if(animate) {
			fbCont.find('div.preview').animate( {
				opacity: 1,
				left: prevY
			}, 500, 'easeOutExpo', function(){
				animate = false;
			});
			fbCont.find('div.next').animate( {
				opacity: 1,
				left: nextY
			}, 500, 'easeOutExpo', function(){
				animate = false;
			});
		}
		
		if(animate)
			return;
		
		if (page == 2 && active == 'tl' || page == 2 && active == 'bl' || page == 2 && active == 'left') {
			
			flipbook.children('div.fb-shadow-top-left').animate( { opacity: 0 }, 200);
			flipbook.children('div.fb-shadow-bottom-left').animate( { opacity: 0 }, 200);
			if(parseInt(fbCont.find('div.preview').css('opacity')) != 0 ) {
				fbCont.find('div.preview').animate( {
					opacity: 0,
					left: prevYend
				}, 500, 'easeOutExpo', function(){
					animate = false;
				});
			}
		} else if(caller == 'turned' && page != 1 ) {
			flipbook.children('div.fb-shadow-top-left').animate( { opacity: 1 }, 500);
			flipbook.children('div.fb-shadow-bottom-left').animate( { opacity: 1 }, 500);
			fbCont.find('div.preview').animate( {
				opacity: 1,
				left: prevY
			}, 500, 'easeOutExpo', function(){
				animate = false;
			});
	
		} 
		
		if (page == (flipbook.data().totalPages - 2) && active == 'tr' || page == (flipbook.data().totalPages - 2) && active == 'br' || page == (flipbook.data().totalPages - 2) && active == 'right') {
			flipbook.children('div.fb-shadow-top-right').animate( { opacity: 0 }, 200);
			flipbook.children('div.fb-shadow-bottom-right').animate( { opacity: 0 }, 200);
			fbCont.find('div.next').animate( {
				opacity: 0,
				left: nextYend
			}, 500, 'easeOutExpo', function(){
				animate = false;
			});
		} else if(caller == 'turned' && page != flipbook.data().totalPages) {
			flipbook.children('div.fb-shadow-top-right').animate( { opacity: 1 }, 500);
			flipbook.children('div.fb-shadow-bottom-right').animate( { opacity: 1 }, 500);
			fbCont.find('div.next').animate( {
				opacity: 1,
				left: nextY
			}, 500, 'easeOutExpo', function(){
				animate = false;
			});
	 	} 
	}
	
	function rotated() {	
		return Math.abs(window.orientation)==90;
	}
	
	function resizeFB(fbWidth, fbHeight, flipbook, fbCont) {
		var singleWidth,
			singleHeight;
		
		flipbook.turn('size', fbWidth, fbHeight);
		
		singleWidth = flipbook.find('div.turn-page-wrapper.first').width();
		singleHeight = flipbook.find('div.turn-page-wrapper.first').height();
		
		flipbook.find('div.page-content').each(function () {
			var $this = jQuery(this);
			$this.width(singleWidth - parseInt($this.css('margin-top')));
			$this.height(singleHeight - (parseInt($this.css('margin-top')) * 2));
			$this.find('img.bg-img').height($this.height());
			if($this.parent().hasClass('double')) {
				$this.find('img.bg-img').width($this.width() * 2);
	
				if($this.parent().parent().parent().hasClass('odd')) {
					rightMargin = parseInt($this.css('margin-right')); 
					$this.find('img.bg-img').css('margin-left', - $this.width() + "px");
					$this.find('div.container img.bg-img').css('margin-left', "0px");
				}
			} else {
				$this.find('img.bg-img').width($this.width());
			}
			$this.parent().find('div.fb-inside-shadow-left').height($this.height());
			$this.parent().find('div.fb-inside-shadow-right').height($this.height());
			$this.parent().find('div.fb-page-edge-shadow-left').height($this.height());
			$this.parent().find('div.fb-page-edge-shadow-right').height($this.height());	
		});
		
		flipbook.find('div.fb-shadow-bottom-left').width(fbWidth/2);
		flipbook.find('div.fb-shadow-bottom-right').width(fbWidth/2);
		flipbook.find('div.fb-shadow-top-left').width(fbWidth/2);
		flipbook.find('div.fb-shadow-top-right').width(fbWidth/2);
		fbCont.find('div.preview, div.next').css('top', (flipbook.find('div.turn-page-wrapper.first').height() - 86) / 2);
	}
	
	
	function centerBook(page, flipbook, fbCont, activeArrow) {
		
		var rendered = flipbook.data().done,
			width = flipbook.width(),
			pageWidth = width/2,
			options = {	duration: (!rendered) ? 0 : 600, 
						easing: 'easeOutExpo', 
						complete: function() { 
							flipbook.turn('resize'); 
						}
					 };
						   
		flipbook.stop();
		
		if ((page==1 || page == flipbook.data().totalPages) && !rotated()) {
	
			var left;
	
			if(page==1) 
				left = Math.floor((fbCont.width() - pageWidth) * 0.5) - pageWidth;
			else
				left = Math.floor((fbCont.width() - pageWidth) * 0.5);
	
		
			if(parseInt(flipbook.css('left')) != left){
				flipbook.animate({left: left }, options);
				
				if(page == 1)
					hideShadows('center', activeArrow, flipbook, fbCont , Math.floor((fbCont.width() - pageWidth) * 0.5) - pageWidth );
				else 
					hideShadows('center', activeArrow, flipbook, fbCont , Math.floor((fbCont.width() - pageWidth) * 0.5));
			}
			
		} else {
				flipbook.animate({left: Math.floor((fbCont.width() - width) * 0.5) }, options);
				hideShadows('center', activeArrow, flipbook, fbCont , Math.floor((fbCont.width() - width) * 0.5));
		}	
	}
	
	
	function fbFirstRun(flipbook, fbCont) {
		// resize the book
		jQuery(window).trigger('resize');
		jQuery(window).trigger('resize');
		fbCont.find('div.next').stop().clearQueue();
		fbCont.find('div.preview').stop().clearQueue();
		fbCont.find('div.preview').css('left', jQuery(window).width() * 0.5);
		fbCont.find('div.next').css('left', jQuery(window).width() * 0.5);
		// adjust shadows
		hideShadows('turned', 'false', flipbook, fbCont, 'first run');		
		
		// show bottom ui
		if(jQuery('div.fb-nav').hasClass('small')){
			jQuery('div.fb-nav').animate( {
				opacity: 1,
				top: '-55'
			}, 1000, 'easeOutExpo');
		} else {
			jQuery('div.fb-nav').animate( {
				opacity: 1,
				top: '0'
			}, 1000, 'easeOutExpo');
		}
	}
	
	function fbOut(flipbook, activeCorner) {
		flipbook.find('div.turn-page-wrapper').each(function (){
			$(this).children('div:first-child').width(flipbook.width() * 0.5 + 'px');
			$(this).children('div:first-child').height(flipbook.height() + 'px');
		});
	
	}
	
	function disableShadows(flipbook) {
		flipbook.find('div.fb-shadow-bottom-left').css('opacity', 0);
		flipbook.find('div.fb-shadow-top-left').css('opacity', 0);
		flipbook.find('div.fb-shadow-bottom-right').css('opacity', 0);
		flipbook.find('div.fb-shadow-top-right').css('opacity', 0);
	}
	
	jQuery(document).ready(function($) {
		var flipbook = $('.flipbook'),
			fbCont = $('div.flipbook-container'),
			fbNav = fbCont.find('div.fb-nav'),
			slideshow = false,
			zoomed = false,
			activeArrow = 'false',
			pageID = 0,
			lastID,
			firstWidth,
			firstHeight,
			activeCorner = false,
			fbOver = false,
			pageTurning = false,
			ie = false,
			touch = 'ontouchstart' in document.documentElement,
			hash,
			fbInterval;
		
		if(navigator.appName == "Microsoft Internet Explorer")
			ie = true;
		
		flipbook.bind('turning', function(e, page) {
			pageTurning = true;
			centerBook(page, flipbook, fbCont, activeArrow);
		});
	
		
		flipbook.bind('turned', function(e, page) {	
			var $this = $(this);
			
			var rendered = $this.data().done;
			
			 if (!rendered)  
			 	centerBook(page, flipbook, fbCont, activeArrow);	
			
			fbCont.find('div.preview, div.next').css('top', (flipbook.find('div.turn-page-wrapper.first').height() - 86) / 2);
			
			
			if(slideshow) {
				//flipbook.clearQueue();
				fbInterval = setInterval(function() {
					$this.turn('next');
					
					if(flipbook.turn('page') == flipbook.data().totalPages) { // turn off slide show on last slide
						slideshow = false;
						fbNav.find('ul li.slideshow span.button-icon-over').animate( { opacity : 0 }, 300);
						fbNav.find('ul li.slideshow span.button-icon').animate( { opacity : 1 }, 300);
						fbNav.find('div.fb-shadow-bottom-left').animate( { opacity : 0 }, 200);
						fbNav.find('div.fb-shadow-bottom-right').animate( { opacity : 0 }, 200);
						fbNav.find('ul li.slideshow').trigger('mouseout');
					}
					
					clearInterval(fbInterval);
				}, slideshowDelay);
			}
			
			hideShadows('turned', 'false', flipbook, fbCont, 'end');	
			pageTurning = false;
		});	
				
		/* Duplicate Double Pages */
		flipbook.find('div.fb-page').each(function() {
			var $this = $(this);
			
			if($this.hasClass('double')){
				clone = $this.clone(true);
				clone.insertAfter($this);
			} 
		});
		
		/* Initialize Flip Book */
		hash = checkHash();
		if(hash != 1 && pages.length < 2) {
			flipbook.turn({
				page: hash+1, // define start page,
				acceleration: true, // enable hardware acceleration,
				shadows: !$.isTouch, // enable/disable shadows,
				duration: 500, // page flip duration.
			});
		} else {
			flipbook.turn({
				page: hash, // define start page,
				acceleration: true, // enable hardware acceleration,
				shadows: !$.isTouch, // enable/disable shadows,
				duration: 500, // page flip duration.
			});
		}
		
		/* Add Class for Even and Odd Pages */
		flipbook.find('div.turn-page-wrapper').each(function() {
			var $this = $(this),
				pageID = $(this).attr('page'),
				lastID = flipbook.data().totalPages,
				clone;
			
			if(pageID == 1) {
				$this.addClass('first');
				$this.find('div.page-content').addClass('first');
			} else if(pageID == lastID){
				$this.addClass('last');
				$this.find('div.page-content').addClass('last');
			} else if(pageID % 2 == 0) {
				$this.addClass('even');
				$this.find('div.page-content').addClass('even');
			} else {
				$this.addClass('odd');
				$this.find('div.page-content').addClass('odd');
			}
		
			
			if(pageID % 2 != 0 && pageID != 1 && pageID != lastID) {
				rightMargin = parseInt($this.find('div.double div.page-content').css('margin-right'));
				$this.find('div.double div.page-content img.bg-img').css('margin-left', - $this.width() + rightMargin +"px");
				$this.find('div.container img.bg-img').css('margin-left', "0px");
			}
		});
		
		/* If double page set properly the odd page container */
		flipbook.find(' > div:last-child > div').each(function() {
			var $this = $(this);
			
			pageID ++;
			lastID = flipbook.data().totalPages;
			
			$this.addClass('page-transition')
			$this.attr('page', pageID);
			
			if(pageID == 1)
				$this.addClass('first');
			else if(pageID == lastID)
				$this.addClass('last');
			else if(pageID % 2 == 0)
				$this.addClass('even');
			else
				$this.addClass('odd');
		});
	
		var tpwWidth = flipbook.find('div.turn-page-wrapper > div').width(),
			tpwHeight = flipbook.find('div.turn-page-wrapper > div').height();
		
		/*-----------------------------------------------------------------------------------*/
		/* Zoom	
		/*-----------------------------------------------------------------------------------*/
		
		flipbook.find('div.turn-page-wrapper').addSwipeEvents().bind('doubletap', function(e, touch) {
			$(this).trigger('dblclick');
		});
		
		flipbook.find('div.turn-page-wrapper').dblclick(function(e) { 
			var zoomFactor = zoomStrength,
				zoomCont,
				fbTopMargin,
				fbZoomedBorder,
				position,
				largeImage = false;
	
			flipbook.parent().prepend($(this).find('div.page-content').clone(true).addClass('zoomed'))
				.css('opacity', 0)
				.animate( { opacity: 1 }, 500);
				
			flipbook.parent().prepend('<div class="zoomed-shadow"></div>')
				.css('opacity', 0)
				.animate( { opacity: 1 }, 500);
			
			flipbook.animate( { opacity: 0 }, 500, function(){
				flipbook.css({
					'visibility': 'none', 
					'pointer-events': 'none'
				});
			}); 
			
			fbCont.find('div.next, div.preview').animate( { opacity: 0 }, 500 ); 
			
			zoomCont = fbCont.find('div.zoomed');
			
			flipbook.parent().prepend('<div class="zoomed-shadow-top"></div><div class="zoomed-shadow-bottom"></div>');
			
			fbZoomedBorder = parseInt(zoomCont.css('border-left-width'));
			var fbOffset = fbCont.offset();
			fbTopMargin = fbOffset.top;
			
			// set the scroll at the begening of zoom so there is no jump when you move your mouse
			
			
			
			
			if(e.pageY == undefined)
				e.pageY = fbTopMargin;
			
			zoomCont.children().css('margin-top', fbTopMargin - e.pageY);
			
			if(zoomCont.find('img.bg-img').hasClass('zoom-large'))
				largeImage = true;
				
			if(!largeImage) {
				zoomCont.find('img.bg-img').css({
					'margin-top': fbTopMargin - e.pageY,
					'opacity': 1
				});
				zoomCont.find('img.bg-img.zoom-large').css('opacity', 0);
			} else {
				zoomCont.find('img.bg-img').css('display', 'none');
				
				zoomCont.find('img.bg-img.zoom-large').css({
					'margin-top': '0px',
					'opacity': 1,
					'display': 'block'
				});	
			} 
			
			// add classes from the page parent
			if($(this).find('div.fb-page').hasClass('double')){
				zoomCont.addClass('double');
			}
			
			if($(this).hasClass('odd')){
				zoomCont.addClass('odd');
			}
					
			// zoom container size
			zoomCont.width(flipbook.width() * 0.5 * zoomFactor);
			zoomCont.height(flipbook.height() - (fbZoomedBorder * 2)); 
			
			zoomCont.find(' > div, img.bg-img, div.video').each(function() {
				var $this = $(this);
				if($this.hasClass('video')){
					//$this.css('height', $this.height() * zoomFactor + "px");
				} else {
					if(zoomCont.hasClass('double')){
						$this.width(100 * zoomFactor + '%');
						$this.height(flipbook.find('div.first').height() * zoomFactor);
					} else {
						$this.width(flipbook.find('div.first').width() * zoomFactor);
						$this.height(flipbook.find('div.first').height() * zoomFactor);
					}	
				}
			});
			
			zoomCont.find('.enlarge').each(function() {
				var $this = $(this),
					enlargeHeight = $this.height() *  zoomFactor;
				
				$this.css({
					'font-size': Math.round(parseInt($this.css('font-size')) * zoomFactor) + "px" ,
					'line-height': Math.round(parseInt($this.css('line-height')) * zoomFactor) + "px"
				});
			});
			
			// set img.bg-img
			zoomCont.find('img.bg-img').width(flipbook.find('div.first').width() * zoomFactor);
			zoomCont.find('img.bg-img').height(flipbook.find('div.first').height() * zoomFactor);
	
			fbCont.find('div.zoomed.double img.bg-img').width(flipbook.find('div.first').width() * 2 * zoomFactor);
			fbCont.find('div.zoomed.double.odd img.bg-img').css('margin-left', '0px');
			fbCont.find('div.zoomed.double img.bg-img').css({
				'left' : '0px',
				'right' : '0px' 
			});
			
			zoomed = true;
			
			zoomCont.css('left', (fbCont.width() - zoomCont.width()) / 2);
			fbCont.find('div.zoomed-shadow').css('left', (parseInt(zoomCont.css('left')) + fbZoomedBorder));
			fbCont.find('div.zoomed-shadow').css('top', (parseInt(zoomCont.css('top')) + fbZoomedBorder));
			fbCont.find('div.zoomed-shadow').css('width', zoomCont.css('width'));
			fbCont.find('div.zoomed-shadow').css('height', zoomCont.css('height'));
			
			fbNav.find('ul li.zoom span.button').animate( { opacity : 0 }, 300);
			fbNav.find('ul li.zoom span.button-over').animate( { opacity : 1 }, 300);
			
			if(ie) {
				fbCont.find('div.zoomed-shadow').css('display', 'none');
			}
			
			// close zoom touch 
			if(touch) {
				zoomCont.addSwipeEvents().bind('doubletap', function(evt, touch) {
					closeZoom();
				});
			}
			
			// close zoom
			zoomCont.dblclick(function() {
				closeZoom();
			});	
			
			function closeZoom() {
				flipbook.css({
					'visibility': 'visible', 
					'pointer-events': 'all'
				});
				flipbook.animate( { opacity: 1 }, 300, function(){
					hideShadows('turned', 'false', flipbook, fbCont, 'zoom');
				});  
				
				zoomCont.animate( { opacity: 0 }, 300, function(){
					$(this).remove();
					zoomed = false;
					fbNav.find('ul li.zoom').trigger('mouseout');
				});
				
				fbCont.find('div.zoomed-shadow-top').clearQueue();
				fbCont.find('div.zoomed-shadow-bottom').clearQueue();
				fbCont.find('div.zoomed-shadow').animate( { opacity: 0 }, 300, function(){ $(this).remove(); });
				fbCont.find('div.zoomed-shadow-bottom').animate( { opacity: 0 }, 100, function(){ $(this).remove(); });
				fbCont.find('div.zoomed-shadow-top').animate( { opacity: 0 }, 100, function(){ $(this).remove(); });
			}
			
			// mouse move, scroll zoomed image
			if(touch) {
				zoomCont.on('touchmove', function(evt){
					var t = evt.originalEvent.touches;
					//t[0].pageY -= fbOffset.top;
					if(fbTopMargin - t[0].pageY >  - zoomCont.children().height() + zoomCont.height()) {
						zoomCont.find(' > div').css('margin-top', fbTopMargin - t[0].pageY);
						zoomCont.find('img.bg-img').css('margin-top', fbTopMargin - t[0].pageY);
					} else {
						zoomCont.find('img.bg-img').css('margin-top', - zoomCont.children().height() + zoomCont.height());
						zoomCont.find(' > div').css('margin-top', - zoomCont.children().height() + zoomCont.height());
					} 
				});
			}
			
			zoomCont.mousemove(function(evt){
				if(fbTopMargin - evt.pageY >  - zoomCont.children().height() + zoomCont.height()) {
					zoomCont.find(' > div').css('margin-top', fbTopMargin-evt.pageY);
				} else {
					zoomCont.find(' > div').css('margin-top', - zoomCont.children().height() + zoomCont.height());
				} 
	 		});
	 			
	 		position = zoomCont.position();
	 		fbCont.find('div.zoomed-shadow-top, div.zoomed-shadow-bottom').width(zoomCont.width()).animate( { opacity: 1 }, 500);
	 		fbCont.find('div.zoomed-shadow-top').css({
	 			top: position.top - 13,
	 			left: position.left + fbZoomedBorder
	 		});
	 		
	 		fbCont.find('div.zoomed-shadow-bottom').css({
	 			top: position.top + zoomCont.height() - 40 + (2 * fbZoomedBorder),
	 			left: position.left + fbZoomedBorder
	 		});
	 		
		});
		
		/*-----------------------------------------------------------------------------------*/
		/*	Flip Book Navigation
		/*-----------------------------------------------------------------------------------*/
		
		var slideshowDelay = slideShowInterval,
			navWidth = 0,
			i = 0;
			
		fbNav.find('ul li').each(function() {
			var $this = $(this);
			
			if($this.hasClass('left')) {
				navWidth += 97;
			} else if ($this.hasClass('center')) {
				navWidth += 89;
			} else if ($this.hasClass('right')) {
				navWidth += 95;
			} else if ($this.hasClass('round')) {
				if(i == 0) {
					navWidth += 96;
					$this.css('margin-left', '0px');
				 } else { 
					navWidth += 96;
				}
			}
			i++;
		});
		
		fbNav.width(navWidth);
	
		fbNav.find('ul li').each(function(){
			var $this = $(this);
			if($this.hasClass('slideshow')) {
				$this.append('<span class="button"></span><span class="button-over"></span><span class="button-icon"></span><span class="button-icon-over"></span>');
			} else {
				$this.append('<span class="button"></span><span class="button-over"></span><span class="button-icon"></span>');
			}
		});
		
		fbCont.append('<div class="next round"><span class="button"></span><span class="button-over"></span><span class="button-icon"></span></div><div class="preview round"><span class="button"></span><span class="button-over"></span><span class="button-icon"></span></div>');
		
		if(fbNav.hasClass('mobile')){
			fbCont.find('div.next, div.preview').addClass('mobile');
		}
		
		$('.fb-nav ul li, .flipbook-container div.next, .flipbook-container div.preview').hover(function(){
			var	$this = $(this);
					
			$this.children('span.button').clearQueue();
			$this.children('span.button-over').clearQueue();
			$this.children('span.button').animate( { opacity : 0 }, 300);
			$this.children('span.button-over').animate( { opacity : 1 }, 300);
		}, function() {
			var	$this = $(this);
			if($this.hasClass('slideshow') && slideshow || $this.hasClass('zoom') && zoomed) {
				//do nothing
			} else {
				$this.children('span.button').animate( { opacity : 1 }, 300);
				$this.children('span.button-over').animate( { opacity : 0 }, 300);
			}
		});
		
		// Table Of Content
		fbNav.find('ul li.toc').on('click', function(e){
			if(flipbook.turn('page') != tocIndex)
				flipbook.trigger('mouseover');
				flipbook.turn('page', tocIndex);
				disableShadows(flipbook);
	
		});
		
		// Zoom
		fbNav.find('ul li.zoom').on('click', function(e){
			flipbook.find('div.turn-page-wrapper').each(function() {
				var $this = $(this);
				if($this.attr('page') == flipbook.turn('page') && !zoomed)
					$this.trigger('dblclick');
				else if($this.attr('page') == flipbook.turn('page') && zoomed)
					fbCont.find('div.zoomed').trigger('dblclick');
			});
		});
	
		// Slideshow	
		fbNav.find('ul li.slideshow').on('click', function(e){
			slideshow = !slideshow;
			var $this = $(this);
			if(slideshow) {
				flipbook.turn('next');
				$this.children('span.button-icon-over').animate( { opacity : 1 }, 300);
				$this.children('span.button-icon').animate( { opacity : 0 }, 300);
			} else {
				$this.children('span.button-icon-over').animate( { opacity : 0 }, 300);
				$this.children('span.button-icon').animate( { opacity : 1 }, 300);
	
			}
		});
		
		// Show All Pages
		fbNav.find('ul li.show-all').on('click', function(e){
			var fbHeight = flipbook.height(),
				fbWidth = flipbook.width(),
				paddingAround = 12,
				paddingVertical,
				paddingHorizontal,
				thumbHeight,
				thumbWidth,
				row = 6,
				ind = 1,
				col = 10,
				clone,
				percentage,
				borderSize;
			
			flipbook.turn('stop');
			
			fbCont.append('<div class="show-all"><div class="content"></div></div>');
			
			fbCont.append('<div class="showall-shadow-top"></div><div class="showall-shadow-bottom"></div>');
			fbCont.find('div.preview, div.next').animate( { opacity: 0 }, 300);
				
			var showAll = fbCont.find('div.show-all');
			
			// add next
			fbCont.append('<span class="big-next show-all-next"><span class="arrow"></span><span class="left"></span><span class="center"></span><span class="right"></span><span class="left hover"></span><span class="center hover"></span><span class="right hover"></span></span>');
			
			// add previous
			fbCont.append('<span class="big-next show-all-previous"><span class="arrow"></span><span class="left"></span><span class="center"></span><span class="right"></span><span class="left hover"></span><span class="center hover"></span><span class="right hover"></span></span>');
			
			ind = 2;
			flipbook.find('div.page-content').each(function(){
				var $this = $(this);
				if(!$this.parent().parent().hasClass('fpage')) {
					clone = $this.clone().addClass('show-all-thumb');
					clone.find('img.bg-img.zoom-large').remove();
					// add odd pages class
					
					if($this.parent().parent().parent().hasClass('last'))
						clone.addClass('even');
					else if($this.parent().parent().parent().hasClass('first'))
						clone.addClass('odd');	
	
					// if page double add class double
					if($this.parent().hasClass('double')) clone.addClass('double');
					// append clone to show-all div
					if($this.parent().parent().parent().hasClass('last'))
						showAll.find('div.content').prepend(clone);
					else
						showAll.find('div.content').append(clone);
					
					ind++;
				} 
			});
			
			paddingAround = parseInt(showAll.find('div.content').css('top'));
			paddingVertical = parseInt(showAll.find('div.show-all-thumb').css('margin-bottom'));
			paddingHorizontal = parseInt(showAll.find('div.show-all-thumb.odd').css('margin-right'));
			thumbHeight = parseInt(showAll.find('div.show-all-thumb').css('height'));
			thumbWidth = parseInt(showAll.find('div.show-all-thumb').css('width'));
			borderSize = parseInt(showAll.find('div.show-all-thumb.odd').css('border-right-width'));
			
			percentage = thumbHeight/fbHeight;
			
			// check how many rows
			while(fbCont.height() - 100 <= ((paddingAround * 2) + (row * (thumbHeight + borderSize*2 + paddingVertical)) - paddingVertical)){
				row--;
			}
			
			// check how many columns
			while($(window).width() - 100 <= ((paddingAround * 2) + (col * (thumbWidth+borderSize)) + (col * paddingHorizontal * 0.5)) - paddingHorizontal){
				col--;
			}
			
			if(col % 2 != 0)
				col--;
				
			if(col > 6)
				col = 6;
			
			showAll.css({
				'width':  ((paddingAround * 2) + (col * (thumbWidth+borderSize)) + (col * paddingHorizontal * 0.5)) - paddingHorizontal + 'px',
				'height': ((paddingAround * 2) + (row * (thumbHeight + borderSize*2 + paddingVertical)) - paddingVertical) +'px'
			});
			
			ind = 1;
			
			showAll.find('div.show-all-thumb').each(function(){
				var $this = $(this);
				// if last in the row add class last
				if(ind % col == 0) $this.addClass('last-thumb');
						
				ind++;
				
				
				$this.find('.enlarge').each(function(){
					$(this).css({
						'font-size': Math.round(parseInt($(this).css('font-size')) * percentage) + 'px',
						'line-height': Math.round(parseInt($(this).css('line-height')) * percentage) + 'px'
						});
					
				});
				
				$this.prepend('<span class="shadow"></span>');
				$this.find('div.video').remove();
			});
			
			
			flipbook.animate( { opacity: 0 }, 500, function() {
				flipbook.css('visibility', 'none');
			});
			
			fbCont.find('div.preview').animate( { opacity: 0 }, 300);
			fbCont.find('div.next').animate( { opacity: 0 }, 300);
			
			flipbook.css('pointer-events', 'none');
			fbNav.animate( { opacity: 0 }, 500);
			showAll.animate( { opacity: 1 }, 500);
			
			showAll.css({
				'left': (fbCont.width() - showAll.width()) / 2 + 'px'
			});
			
			fbCont.find('span.show-all-previous').css({
					'width': showAll.width(),
					'top': parseInt(showAll.css('top')) - 43 + 'px',
					'left': parseInt(showAll.css('left')) + 1 + 'px' 	
			});
			
			fbCont.find('span.show-all-next').css({
					'width': showAll.width(),
					'top': parseInt(showAll.css('top')) + parseInt(showAll.css('height')) - 33 + 'px',
					'left': parseInt(showAll.css('left')) + 1 + 'px' 	
			});
			
			fbCont.find('span.big-next').each(function() {
				$(this).find('span.center').width($(this).width() - 26);
			});
			
			if(showAll.height() < showAll.find('div.content').height()-paddingVertical){
				fbCont.find('span.show-all-previous').css('visibility', 'visible');
				fbCont.find('span.show-all-next').css('visibility', 'visible');
				fbCont.find('span.show-all-previous').animate( { opacity: 1 }, 500);
				fbCont.find('span.show-all-next').animate( { opacity: 1 }, 500);
			}
			
			/* Show All Events */
			showAll.find('div.show-all-thumb').hover( function(){ 
				var $this = $(this);
				$this.find('span.shadow').clearQueue();
				$this.find('span.shadow').animate( { opacity: 1 }, 300);
				
				if($this.hasClass('even')) {
					$this.next().find('span.shadow').clearQueue();
					$this.next().find('span.shadow').animate( { opacity: 1 }, 300);
				} else {
					$this.prev().find('span.shadow').clearQueue();
					$this.prev().find('span.shadow').animate( { opacity: 1 }, 300);
				}
				
			}, function(){
				var $this = $(this);
				
				$this.find('span.shadow').animate( { opacity: 0 }, 300);
				
				if($this.hasClass('even')) {
					$this.next().find('span.shadow').clearQueue();
					$this.next().find('span.shadow').animate( { opacity: 0 }, 300);
				} else {
					$this.prev().find('span.shadow').clearQueue();
					$this.prev().find('span.shadow').animate( { opacity: 0 }, 300);
				}
			});
			
			/* Show All Events */
			var position = showAll.position();
			fbCont.find('div.showall-shadow-top, div.showall-shadow-bottom').width(showAll.width()).delay(500).animate( { opacity: 1 }, 500);
	 		fbCont.find('div.showall-shadow-top').css({
	 			top: position.top - 12	,
	 			left: position.left + borderSize
	 		});
	 		
	 		fbCont.find('div.showall-shadow-bottom').css({
	 			top: position.top + showAll.height() - 39,
	 			left: position.left + borderSize
	 		});
	
	
			/* Thumbnail Click */
			showAll.find('div.show-all-thumb').on('click', function(){
				var $this = $(this),
					id = Math.ceil($this.index());
	
				flipbook.trigger('mouseover');
				disableShadows(flipbook);
				flipbook.turn('page', id);
				
				/* Close */
				showAll.animate( { opacity: 0 }, 300, function(){
					$(this).remove();
				});
				
				fbCont.find('div.showall-shadow-bottom').animate( { opacity: 0 }, 100, function(){
					$(this).remove();
				});
				
				fbCont.find('div.showall-shadow-top').animate( { opacity: 0 }, 100, function(){
					$(this).remove();
				});
				
				fbCont.find('span.show-all-previous').animate( { opacity: 0 }, 300, function(){
					$(this).remove();
				});
		
				fbCont.find('span.show-all-next').animate( { opacity: 0 }, 300, function(){
					$(this).remove();
				});
				
				/*fbCont.find('div.preview').css( { opacity: 0 } );
				fbCont.find('div.next').css( { opacity: 0 } );*/
				flipbook.css('visibility', 'visible');	
				flipbook.clearQueue();
				flipbook.animate( { opacity: 1 }, 300 );
				fbNav.animate( { opacity: 1 }, 500);
				
				if(id < 2){
					flipbook.find('div.fb-shadow-bottom-left').css('opacity', 0);
					flipbook.find('div.fb-shadow-top-left').css('opacity', 0);
				}
				
				flipbook.css('pointer-events', 'all');
			});
			
			var saContent = showAll.find('div.content'),
				scrollAmount = row * (thumbHeight + paddingVertical + borderSize * 2),
				animation = false;
			
			/* Scroll ShowAll */
			fbCont.find('span.show-all-previous').on('click', function() {
				if(parseInt(saContent.css('top')) != paddingAround && !animation) {
					animation = true;
					saContent.clearQueue();
					saContent.animate( { top: (parseInt(saContent.css('top')) + scrollAmount) }, 1000, 'easeOutExpo', function(){
						animation = false;
					});
				}
			});
			
			fbCont.find('span.show-all-next').on('click', function() {
				if(parseInt(saContent.css('top')) - scrollAmount > 12 - saContent.height() && !animation){
					animation = true;
					saContent.clearQueue();
					saContent.animate( { top: (parseInt(saContent.css('top')) - scrollAmount) }, 1000, 'easeOutExpo', function(){
						animation = false;
					});
				}
			});
			
			fbCont.find('span.show-all-next, span.show-all-previous').hover(function() {
				var but = $(this);
				but.clearQueue();
				but.find('span.left.hover, span.right.hover, span.center.hover').animate( { opacity: 1 }, 300);
			}, function() {
				var but = $(this);
				but.clearQueue();
				but.find('span.left.hover, span.right.hover, span.center.hover').animate( { opacity: 0 }, 300);
			});
			
		});
		
		/* Next & Previous */
		fbCont.find('div.next').on('click', function(e){
			if(pageTurning)
				return;
			activeArrow = 'right';	
			flipbook.trigger('mouseover');
			flipbook.turn('next');
		});
		
		fbCont.find('div.preview').on('click', function(e){
			if(pageTurning)
				return;
				
			activeArrow = 'left';
			flipbook.trigger('mouseover');
			flipbook.turn('previous');
		});	
	
		/*-----------------------------------------------------------------------------------*/
		/* Shadows	
		/*-----------------------------------------------------------------------------------*/
			
		addInsideBookShadow(flipbook);
		
		/*-----------------------------------------------------------------------------------*/
		/* Events	
		/*-----------------------------------------------------------------------------------*/
		
		hashChange(flipbook, fbCont);
		
		firstWidth = flipbook.width(),
		firstHeight = flipbook.height();
		var posArray = new Array(),
			i = 0;
		$('.flipbook div.page-content .enlarge').each(function() {
			posArray.push(new Array());
			posArray[i].push(parseInt($(this).css('font-size')));
			posArray[i].push(parseInt($(this).css('line-height')));
			i++;
		});
		
		/* Window Resize */
		$(window).on('resize', function() {
			
			var currentID = flipbook.turn('page');
			
			if ((currentID == 1 || currentID == flipbook.data().totalPages)) {
	
				var left;
		
				if(currentID == 1) 
					left = Math.floor((fbCont.width() - flipbook.width()/2) * 0.5) - flipbook.width()/2;
				else
					left = Math.floor((fbCont.width() - flipbook.width()/2) * 0.5);
		
				if(parseInt(flipbook.css('left')) != left)
					flipbook.css({'left': left });
				
			} else {
					flipbook.css( {'left': Math.floor((fbCont.width() - flipbook.width()) * 0.5) });
			}	
	
		
			var $this = $(this),
				width = $this.width(),
				height = $this.height(),
				fbNext = fbCont.find('div.next'),
				fbPrev = fbCont.find('div.preview'),
				ratio, fbWidth, fbHeight, fbPercentage,
				areaHeight = parseInt(flipbook.css('margin-top').replace("px", "")) + parseInt(flipbook.css('margin-bottom').replace("px", "")) + flipbook.height() + parseInt(fbNav.css('margin-top').replace("px", "")) + parseInt(fbNav.css('margin-bottom').replace("px", "")) + parseInt(fbNav.css('top').replace("px", "")) + fbNav.height() + 40,
				areaWidth = flipbook.width() + 330, 
				areaMinHeight = parseInt(flipbook.css('margin-top').replace("px", "")) + flipbook.height() + fbNav.height() - 55,
				areaMinWidth = flipbook.width() + 140,
				position = flipbook.position();
			
					
			/* Count the new width and height of the book */
			if(height / areaMinHeight < width / areaMinWidth)
				ratio = height / areaMinHeight;
			else 
				ratio = width / areaMinWidth;
	
			fbWidth = Math.round(flipbook.width() * ratio);
			fbHeight = Math.round(flipbook.height() * ratio);
			
			if(fbWidth > firstWidth || fbHeight > firstHeight) {
				fbWidth = firstWidth; 
				fbHeight = firstHeight;
			} 
			
			if(fbWidth < fbNav.width() + 20) {
				fbWidth = fbNav.width() + 20;
				fbHeight = firstHeight * ( fbWidth / firstWidth);
			}
			
			if(fbWidth != flipbook.width() || fbHeight != flipbook.height())
				resizeFB( fbWidth, fbHeight, flipbook, fbCont);
			
			
			if(height > areaHeight && width > areaWidth) {
				fbWidth = firstWidth;
				fbHeight = firstHeight;
				resizeFB( firstWidth, firstHeight, flipbook, fbCont);
			}
			
			fbPercentage = flipbook.height() / firstHeight;
			fbPercentage = parseInt(fbPercentage * 100);
			
			var i = 0;
			
			
			$('.flipbook div.page-content .enlarge').each(function() {
				if(fbPercentage == 100) {
					$(this).css('font-size', posArray[i][0] + "px");
					$(this).css('line-height', posArray[i][1] + "px");
				} else {
					$(this).css('font-size', posArray[i][0] * (fbPercentage/100) + "px");
					$(this).css('line-height', posArray[i][1] * (fbPercentage/100) + "px");	
				}
				i++;
			});

			
			width = $this.width();
			height = $this.height();
			areaHeight = parseInt(flipbook.css('margin-top').replace("px", "")) + parseInt(flipbook.css('margin-bottom').replace("px", "")) + fbHeight + parseInt(fbNav.css('margin-top').replace("px", "")) + parseInt(fbNav.css('margin-bottom').replace("px", "")) +  fbNav.height();
			areaWidth = fbWidth + 330; 
			
			areaMinHeight = parseInt(flipbook.css('margin-top').replace("px", "")) + fbHeight + fbNav.height() - 55;
			areaMinWidth = fbWidth + 140;
			
			/* Preview / Next Arrows */
			if(width < areaWidth ) {
				fbNext.addClass('small').css({ left: position.left + flipbook.width() - 40 });
				fbPrev.addClass('small').css({ left: position.left - 45 });
				fbPrev.find('span.button-icon').css({ left: 6 });
				fbNext.find('span.button-icon').css({ left: 41 });
			} else if (width > areaWidth) {
				fbNext.removeClass('small').css({ left: position.left + flipbook.width() + 54 });
				fbPrev.removeClass('small').css({ left: position.left - 140 });
				fbPrev.find('span.button-icon').css({ left: 22 });
				fbNext.find('span.button-icon').css({ left: 26 });
			}
		
			if(fbPrev.css('opacity') == "0")
				fbPrev.css('left', '100px'); 
			
			if(fbNext.css('opacity') == "0")
				fbNext.css('right', '100px'); 
	
			
			/* Bottom UI */
			if(height < areaHeight) {
				fbNav.addClass('small').css({ top: -55 });
				fbNav.find('ul > li.toc > span.button-icon').css({ top: 40 });
				fbNav.find('ul > li.zoom > span.button-icon').css({ top: 38 });
				fbNav.find('ul > li.slideshow > span.button-icon, ul > li.slideshow > span.button-icon-over').css({ top: 39 });
				fbNav.find('ul > li.show-all > span.button-icon').css({ top: 40 });
			} else if (height > areaHeight) {
				fbNav.removeClass('small').css({ top: 0 });	
				fbNav.find('ul > li.toc > span.button-icon').css({ top: 25 });
				fbNav.find('ul > li.zoom > span.button-icon').css({ top: 24 });
				fbNav.find('ul > li.slideshow > span.button-icon, ul > li.slideshow > span.button-icon-over').css({ top: 25 });
				fbNav.find('ul > li.show-all > span.button-icon').css({ top: 26 });
			}
	
		});
		
		/* Flip Book Events */
		flipbook.bind('turned', function(e, page, pageObj) {
			setHashTag(flipbook);
			return false;
		});
		
		/* Global Events */
		$(window).bind('keydown', function(e) { // keyboard events
			if (e.keyCode == 37) {
				if(pageTurning)
					return;
				activeArrow = 'left';
				flipbook.trigger('mouseover');
				flipbook.turn('previous');
			} else if (e.keyCode == 39) {
				if(pageTurning)
					return;
				activeArrow = 'right';
				flipbook.trigger('mouseover');
				flipbook.turn('next');
			} else if (e.keyCode == 27) {
				fbCont.find('div.zoomed').animate( { opacity: 0 }, 300, function(){
					$(this).remove();
					zoomed = false;
					fbNav.find('ul li.zoom').mouseout();
					
				});
				
				fbCont.find('div.zoomed-shadow-bottom').animate( { opacity: 0 }, 100, function(){ $(this).remove(); });
				fbCont.find('div.zoomed-shadow').animate( { opacity: 0 }, 200, function(){ $(this).remove(); });
				fbCont.find('div.zoomed-shadow-top').animate( { opacity: 0 }, 100, function(){ $(this).remove(); });
				fbCont.find('div.showall-shadow-bottom').animate( { opacity: 0 }, 100, function(){ $(this).remove(); });
				fbCont.find('div.showall-shadow-top').animate( { opacity: 0 }, 100, function(){	$(this).remove(); });
				fbCont.find('div.show-all').animate( { opacity: 0 }, 300, function(){ $(this).remove(); });
				fbCont.find('span.show-all-previous').animate( { opacity: 0 }, 300, function(){ $(this).remove(); });
				fbCont.find('span.show-all-next').animate( { opacity: 0 }, 300, function(){ $(this).remove(); });
				
				flipbook.css({
					'visibility': 'visible', 
					'pointer-events': 'all'
				});
				
				flipbook.animate( { opacity: 1 }, 300, function(){
					hideShadows('turned', 'false', flipbook, fbCont, 'close');
				}); 
				
				fbNav.animate( { opacity: 1 }, 300);
				
				flipbook.css('pointer-events', 'all');
				
			}
		}).bind('hashchange', function() { // hashchange event (unique url for each page)
			hashChange(flipbook, fbCont);	
		}).bind('touchstart', function(e) { // touch events for mobile stuff
			var t = e.originalEvent.touches;
			if (t[0]) 
				touchStart = {
						x: t[0].pageX, 
						y: t[0].pageY };
						
			touchEnd = null;
		}).bind('touchmove', function(e) {
			var t = e.originalEvent.touches, 
				pos = flipbook.offset();
				
			if (t[0].pageX>pos.left && t[0].pageY>pos.top && t[0].pageX<pos.left+flipbook.width() && t[0].pageY<pos.top+flipbook.height()) {
				if (t.length==1)
					e.preventDefault();
					
				if (t[0]) 
					touchEnd = {
						x: t[0].pageX, 
						y: t[0].pageY 
					};
			}
			
		}).bind('touchend', function(e) {
			if (window.touchStart && window.touchEnd) {
				var w = flipbook.width()/2,
					d = { 
						x: touchEnd.x-touchStart.x, 
						y: touchEnd.y-touchStart.y },
					pos = {
						x: touchStart.x-flipbook.offset().left, 
						y: touchStart.y-flipbook.offset().top };
			
				if (Math.abs(d.y)<100) {
					if(pageTurning)
						return;
					 if (d.x>100 && pos.x<w) {
					 	flipbook.turn('previous');
					 } else if (d.x<100 && pos.x>w) {
					 	flipbook.turn('next');
					 }		
				}
			}
		}).bind('start', function(e, turn) {
			if(ie) {
				flipbook.find('div.fpage object').css({ 'display' : 'none' });
				flipbook.find('div.video object').css({ 'display' : 'none' });
			} else {
				flipbook.find('div.fpage object').css({ opacity : 0 });
			}
			hideShadows('start', activeArrow, flipbook, fbCont, 'start');	
			activeCorner = true;
		}).bind('end', function(e){
			if(ie) {
				flipbook.find('div.fpage object').css({ 'display' : 'block' });
				flipbook.find('div.video object').css({ 'display' : 'block' });
			} else {
				flipbook.find('div.fpage object').css({ opacity : 1 });
			}
			hideShadows('turned', 'false', flipbook, fbCont, 'end');
			activeCorner = false;
			limiter = 0;
		});	
		
		fbFirstRun(flipbook, fbCont);
	});

})();