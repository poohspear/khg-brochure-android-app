<?php 

/*-----------------------------------------------------------------------------------*/
/*	Settings for HTML Flip Book
/*-----------------------------------------------------------------------------------*/

/* Flip Book Variables */

/* Main */
$fb_id = "flipbook-1"; /* flip book id (default flipbook-1) */
$fb_cont = "flipbook-container-1"; /* flip book container */
$fb_width = 424; /* flip book width in pixels (without border) */
$fb_height = 600; /* flip book height in pixels (without border) */

/* Book Position */
$margin_top = '20';
$margin_left = '0';
$margin_right = '0';
$margin_bottom = '0';

/* Book Decoration */
$border_color = '#ECECEC'; /* border color */
$border_size = 0; /* size in pixels */
$border_outline = false; /* outline around the pages*/
$border_outline_color = "#BFBFBF"; /* outline color*/
$border_radius = 0; /* border radius */

/* Page Shadow */
$inner_page_shadows = true; /* shadow displayed on the page, over the page content */
$page_edge = false;	/* at the end of each page there is a dark outline that gives the book a 3d look, here you can turn it off */

/* Zoom Settings */
$zoom_overlay = true; /* overlay displayed in zoom panel on top of the page */
$zoom_overlay_opacity = 1; /* opacity of the overlay */
$zoom_border_size = 10; /* zoom panel border size */
$zoom_border_color = '#ECECEC'; /* zoom panel border color */
$zoom_outline = true; /* zoom panel outline */
$zoom_outline_color = '#D0D0D0'; /* zoom panel outline color */
$zoom_border_radius = 10; /* zoom panel border radius */

/* Show All Pages */
$sa_thumb_width = 125; /* show all pages panel, page thumbnail width */
$sa_thumb_height = 180; /* show all pages page panel, thumbnail height */
$sa_thumb_border_size = 1; /* show all pages panel, thumbanil border size */
$sa_thumb_border_color = '#878787'; /* show all pages panel, thumbanil border color  */
$sa_padding_vertical = 12; /* show all pages panel thumbnails vertical spacing */
$sa_padding_horizontal = 10; /* show all pages panel thumbnails horizontal spacing */
$sa_border_size = 10; /* show all pages panel border size */
$sa_border_radius = 10; /* show all pages panel border radius */
$sa_bg_color = '#F6F6F6'; /* show all pages panel background color */
$sa_border_outline = true; /* show all pages panel outline */
$sa_border_outline_color = '#D6D6D6'; /* show all pages panel outline color */


/* End of Settings - DO NOT EDIT bellow this line! */

$fb_id = "#".$fb_id;
$fb_cont = "#".$fb_cont;

?>

<style type="text/css">
	
		<?php echo $fb_id; ?> {
			margin-top: <?php echo $margin_top; ?>px;
			margin-bottom: <?php echo $margin_bottom; ?>px;
			margin-left: <?php echo $margin_left; ?>px;
			margin-right: <?php echo $margin_right; ?>px;
			
			width: <?php echo (($fb_width * 2) + ($border_size * 2)); ?>px; 
			height: <?php echo (($fb_height) + ($border_size * 2)); ?>px; 
		}
		
		<?php echo $fb_id; ?> div.fb-page div.page-content {
			margin: <?php echo $border_size;?>px 0px; 
		}
		
		<?php echo $fb_id; ?> .turn-page {
			width: <?php echo ($fb_width + ($border_size)); ?>px;		
			height: <?php echo ($fb_height + ($border_size * 2)); ?>px;
			background: <?php echo $border_color; ?>;
			border-top-right-radius: <?php echo $border_radius; ?>px;
			border-bottom-right-radius: <?php echo $border_radius; ?>px;
			<?php if($border_outline) ?>
				box-shadow: inset -1px 0px 1px 0px <?php echo $border_outline_color; ?>; 
			
		}
		
		<?php echo $fb_id; ?> .last .turn-page,
		<?php echo $fb_id; ?> .even .turn-page {
			border-radius: 0px;
			border-top-left-radius: <?php echo $border_radius; ?>px;
			border-bottom-left-radius: <?php echo $border_radius; ?>px;	
			<?php if($border_outline) ?>
				box-shadow: inset 1px 0px 1px 0px <?php echo $border_outline_color; ?>;
		}
		
		<?php echo $fb_id; ?> .fpage .turn-page {
			border-radius: 0px;
			border-top-left-radius: <?php echo $border_radius; ?>px;
			border-bottom-left-radius: <?php echo $border_radius; ?>px;
			<?php if($border_outline) ?>
				box-shadow: inset 1px 0px 1px 0px  <?php echo $border_outline_color; ?>;
		}
		
		<?php echo $fb_id; ?> .last .fpage .turn-page,
		<?php echo $fb_id; ?> .even .fpage .turn-page {
			border-radius: 0px;
			border-top-right-radius: <?php echo $border_radius; ?>px;
			border-bottom-right-radius: <?php echo $border_radius; ?>px;
			<?php if($border_outline) ?>
				box-shadow: inset -1px 0px 1px 0px <?php echo $border_outline_color; ?>;
		}
		
		<?php echo $fb_cont; ?> div.page-content div.container img.bg-img {
			margin-top: 0px;
			margin-left: 0px;
		}
		
		<?php echo $fb_cont; ?> div.page-content.first div.container img.bg-img {
			margin-top: <?php echo $border_size; ?>px;
		}
	
		<?php echo $fb_cont; ?> div.page-content.even div.container img.bg-img {
			left: 0px;
		}
		
		<?php echo $fb_cont; ?> div.page-content.last div.container img.bg-img {
			left: <?php echo $border_size; ?>px;
			margin-top: <?php echo $border_size; ?>px;
		}
	
		<?php echo $fb_id; ?> div.page-transition.last div.page-content,
		<?php echo $fb_id; ?> div.page-transition.even div.page-content,
		<?php echo $fb_id; ?> div.turn-page-wrapper.odd div.page-content {
			margin-left: 0px;
			margin-right: <?php echo ($border_size);?>px; 
		}
	
		<?php echo $fb_id; ?> div.turn-page-wrapper.first div.page-content {
			margin-right: <?php echo ($border_size);?>px;
			margin-left: 0px; 
		}
	
		<?php echo $fb_id; ?> div.page-transition.first div.page-content,
		<?php echo $fb_id; ?> div.page-transition.odd div.page-content,
		<?php echo $fb_id; ?> div.turn-page-wrapper.even div.page-content,
		<?php echo $fb_id; ?> div.turn-page-wrapper.last div.page-content {
			margin-left: <?php echo ($border_size);?>px;
		}
		
		<?php echo $fb_id; ?> div.fb-page-edge-shadow-left,
		<?php echo $fb_id; ?> div.fb-page-edge-shadow-right,
		<?php echo $fb_id; ?> div.fb-inside-shadow-left,
		<?php echo $fb_id; ?> div.fb-inside-shadow-right {
			top: <?php echo ($border_size);?>px;
			height: <?php echo $fb_height; ?>px;
		}
		
		<?php echo $fb_id; ?> div.fb-page-edge-shadow-left {
			left: <?php echo ($border_size);?>px;
		}
		
		<?php echo $fb_id; ?> div.fb-page-edge-shadow-right {
			right: <?php echo ($border_size);?>px;
		}
		
		/* Zoom */
		<?php if(!$zoom_overlay) { ?>
			<?php echo $fb_cont; ?> div.zoomed-shadow {
				display: none;
			}
		<?php } ?>
			
		<?php echo $fb_cont; ?> div.zoomed-shadow {
			opacity: <?php echo $zoom_overlay_opacity;?>;
		}
		
		<?php echo $fb_cont; ?> div.zoomed {
			border: <?php echo $zoom_border_size; ?>px solid <?php echo $zoom_border_color;?>;
			border-radius: <?php echo $zoom_border_radius; ?>px;
			<?php if($zoom_outline) { ?>
				box-shadow: 0px 0px 0px 1px <?php echo $zoom_outline_color; ?>;	
			<?php } else { ?>
				box-shadow: 0px 0px 0px 0px <?php echo $zoom_outline_color; ?>;
			<?php } ?>	
		}	
		
		/* Show All Pages */
		<?php echo $fb_cont; ?> div.show-all div.show-all-thumb {
			margin-bottom: <?php echo $sa_padding_vertical;?>px;
			height: <?php echo $sa_thumb_height;?>px;
			width: <?php echo $sa_thumb_width;?>px;
			border: <?php echo $sa_thumb_border_size;?>px solid <?php echo $sa_thumb_border_color;?>;
		}
		
		<?php echo $fb_cont; ?> div.show-all div.show-all-thumb.odd {
			margin-right: <?php echo $sa_padding_horizontal;?>px;
			border-left: none;
		}
		
		<?php echo $fb_cont; ?> div.show-all div.show-all-thumb.odd img.bg-img {
			padding-left: <?php echo ($sa_thumb_width * 2);?>px;
		}
		
		<?php echo $fb_cont; ?> div.show-all div.show-all-thumb.odd.first img.bg-img {
			padding-left: 0px;
		}
		
		<?php echo $fb_cont; ?> div.show-all div.show-all-thumb.even {
			border-right: none;
		}
		
		<?php echo $fb_cont; ?> div.show-all div.show-all-thumb.last-thumb {
			margin-right: 0px;
		}
		
		<?php echo $fb_cont; ?> div.show-all {
			background: <?php echo $sa_bg_color; ?>;
			border-radius: <?php echo $sa_border_radius; ?>px;
			<?php if($sa_border_outline) ?>
				border: 1px solid <?php echo $sa_border_outline_color; ?>;
		}
		
		<?php echo $fb_cont; ?> div.show-all div.content {
			top: <?php echo $sa_border_size; ?>px;
			left: <?php echo $sa_border_size; ?>px;
		}
	
		
		/* Inner Pages Shadows */
		<?php if(!$inner_page_shadows) { ?>
			<?php echo $fb_id; ?> div.fb-inside-shadow-right,
			<?php echo $fb_id; ?> div.fb-inside-shadow-left {
				display: none;
			}
		<?php } ?>
		
		<?php if(!$page_edge) { ?>
			<?php echo $fb_id; ?> div.fb-page-edge-shadow-left,
			<?php echo $fb_id; ?> div.fb-page-edge-shadow-right {
				display: none;
			}
		<?php } ?>
		
	</style>