/*
* Created by MassivePixelCreation
*
* Version 1.0
*
* This is a jQuery file for styles-switcher.
*
*/

jQuery(document).ready(function($) { 	
	$('#mpc-styles-switcher').animate({
   	  left: '-240'
  	}, 1000, 'easeOutExpo', function(){
  	
  	});
  	
  	$('.ss-dropdown').customStyle();
  	
  	$('#ss-bookmark').click(function() {
		var container = $(this).parent().parent().find('#mpc-styles-switcher');
		//alert(container.position().left);
		if(container.position().left < 0){
			container.animate({
   	  			left: '0'
  			}, 1000, 'easeOutExpo', function(){
  	
  			});
		} else {
			container.animate({
   	  			left: '-240'
  			}, 1000, 'easeOutExpo', function(){
  	
  			});
		}
  	});
  	
  	$('.ss-color').click(function() {
  		$(this).parent().find('div').trigger('click');
  	});
  	
  	/*  Color Picker */
	$('.ss-colorSelector').each(function() {
		var Othis = this; //cache a copy of the this variable for use inside nested function
		var initialColor = $(Othis).next('input').attr('value');
	
		$(this).ColorPicker({
			color: initialColor,
			onShow: function (colpkr) {
				$(colpkr).fadeIn(500);
				return false;
			},
			onHide: function (colpkr) {
				$(colpkr).fadeOut(500);
				return false;
			},
			onChange: function (hsb, hex, rgb) {
				$(Othis).children('div').css('backgroundColor', '#' + hex);
				$(Othis).next('input').attr('value','#' + hex);
				$(Othis).next('input').trigger('change');
			}
		});
	});
	
	/* Choose Image */
	$('.ss-image input:checked').each(function() {
		$(this).parent().find('img').css('background-color', '#717171');
	});

	
	$('.ss-image img').click(function() {	
		$('.ss-image img').each(function() {
			$(this).css('background-color', '#FFFFFF');
			$(this).parent().find('input').removeAttr("checked");
		});
		
		if($(this).css('background-color') == "rgb(255, 255, 255)"){
			$(this).css('background-color', '#717171');
		} else {
			$(this).css('background-color', '#FFFFFF');
		}
		
		$(this).parent().find('input').attr("checked", "checked");
		$(this).parent().find('input').trigger('change');
	});
	
	
	
	/*-----------------------------------------------------------------------------------*/
	/*	On Settings Change, Change CSS...
	/*-----------------------------------------------------------------------------------*/
	
	// dropdown
	$('#ss_fb_dropdown').change(function() {
		var preview = $(this).val();
		
		if(preview == "main") {
			window.location = "http://www.mpcreation.pl/flipbook/html/";
		} else if (preview == "brochure") {
			window.location = "http://www.mpcreation.pl/flipbook/html/" + preview + "/#3";
		} else {
			window.location = "http://www.mpcreation.pl/flipbook/html/" + preview + "/";
		} 
	});
	
	$('#ss_fb_menu').change(function() {
		var menu = $(this).val(),
		i = 0,
		last = $('div.flipbook-container div.fb-nav li').length-1;
		
		if(menu == "stacked") {
			$('div.flipbook-container div.fb-nav').removeClass('spread').addClass('stacked');
			i = 0;
			$('div.flipbook-container div.fb-nav ul li').each(function(){
				$(this).removeClass('round');
				if(i == 0){
					$(this).addClass('left');
				} else if ( i == last ) {
					$(this).addClass('right');
				} else {
					$(this).addClass('center');
				}
				i++;
			});
		} else if (menu == "spread") {
			$('div.flipbook-container div.fb-nav').removeClass('stacked').addClass('spread');
			i = 0;
			$('div.flipbook-container div.fb-nav ul li').each(function(){
				$(this).removeClass('left, right, center');
				$(this).addClass('round');
				i++;
			});
		} 
		
		var navWidth = 0,
			i = 0,
			fbNav = $('div.flipbook-container div.fb-nav');
			
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
					navWidth += 86;
					$this.css('margin-left', '0px');
				 } else { 
					navWidth += 96;
				}
			}
			i++;
		});
	
		fbNav.width(navWidth);
	});
	
	// background-color
	$('#inc_bg_color').change(function() {
		var color = $(this).val();
		
		$('body').css('background-color', color);
	});
	
	// body text color
	$('#inc_body_color').change(function() {
		var color = $(this).val();
		
		$("body, .nav_menu li a, .message_button:hover a.lern_more, li.widget li a, .tabs ul li a, .tagcloud a, .twitter_widget .twtr-widget p, .twitter_widget #twtr-widget-2 .twtr-bd p, #twtr-widget-2 .twtr-tweet .twtr-tweet-text em a, .twitter_message #twtr-widget-1 .twtr-doc p a, input:hover#searchsubmit, .accordion_title a, a.btn, a.read_more, a.more-link, h1.post_title a:hover, span.related_caption, #main_content .filter li a,  #commentform input:focus, #comment_form input:focus, #commentform textarea:focus, #comment_form textarea:focus, h5.author_name a:hover, .cancel-comment-reply small a, .comments_form_who p a:hover, h4.portfolio_title a:hover, .coment_author span a:hover, .message_button:hover span.message_arrow").css('color', color);
	});
	
	// hover text color
	$('#inc_second_color').change(function() {
		var color = $(this).val();
		
		$("a:hover, a.lern_more, a.btn:hover, a:hover.read_more, a:hover.more-link, a:hover.comment-reply-link, #main_content .filter li:hover a, #main_content .filter li.active a, li.widget a:hover, .tagcloud a:hover, input#searchsubmit, .page_title, .author_name, .tabs ul li.active a, .post_title a, .post_meta a:hover, #pagination a:hover, p.coment_author, #commentform input:hover.send, #comment_form button:hover.send, #comment_form input:hover.reset, #commentform input:hover.reset, .dropmenu a:hover, .dropmenu .sub-menu a:hover, .dropmenu .current-menu-item a:hover, .dropmenu .current-menu-item > a, .dropmenu .sub-menu li.current-menu-item > a, .portfolio_title a, .tabs ul li a:hover, h5.author_name a, h1.post_title a, .comments_form_who p a, div.toggle-header h3.toggle-title a:hover, .cancel-comment-reply small a:hover, h4.portfolio_title a, .widget_title, .coment_author span, span.related_caption, span.message_arrow").css('cssText', 'color: ' +color+' !important');	
		
		$("span.message_arrow").css('background-color', color);
	});

	// background patterns 
	$('#ss_background_pattern input').change(function() {
		var pattern = $(this).val();
		$('body').css('background-image', "url(http://www.mpcreation.pl/flipbook/html/"+pattern+")");
		
		if(pattern == "patterns/p22.png") {
			$('body').css('background-size', '100% 100%');
			$('body').css('background-repeat', 'no-repeat');
		} else {
			$('body').css('background-repeat', 'repeat');
			$('body').css('background-size', 'auto');
		}	
	});
	
	// heading text color
	$('#inc_heading_color').change(function() {
		var color = $(this).val();
		$("#inc_content h1, #inc_content h2, #inc_content h3, #inc_content h4, #inc_content h5, #inc_content h6").css('color', color);	
	});
	
	// welcome message color
	$('#inc_message_color').change(function() {
		var color = $(this).val();
		$(".message_text h2").css('color', color);	
	});
	
	// twitter message color
	$('#inc_twitter_message_color').change(function() {
		var color = $(this).val();
		$(".twtr-tweet-text p").css('cssText', 'color: ' +color+' !important');	
	});

	 
	 	
});