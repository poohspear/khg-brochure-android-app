<?php

/*
* Created by MassivePixelCreation
*
* Version 1.0
*
* This file is used to setup the displayed
* settings inside the styles-switcher.
*
*
* How to use:
* The best way to use this is to use
* the same ids for the fields as in the MassivePanel
*
*/

function ss_options() {

	$shortname = 'inc'; // use the same shortname as in the massive-panel;

	// this array is used for images example (first attribute of the image is used as a description for the image, the second is the path)
    $images_array = array("No Pattern" => "patterns/p12.png",
    	"Patern 1" => "patterns/p1.png",
        "Pattern 2" => "patterns/p2.png",
        "Pattern 3" => "patterns/p3.png",
        "Pattern 4" => "patterns/p4.png",
        "Pattern 5" => "patterns/p5.png",
        "Pattern 6" => "patterns/p6.png",
        "Pattern 7" => "patterns/p7.png",
        "Pattern 8" => "patterns/p8.png",
        "Pattern 9" => "patterns/p9.png",
        "Pattern 10" => "patterns/p10.png",
        "Pattern 24" => "patterns/p24.png",
        "Pattern 23" => "patterns/p23.jpg",
        "Pattern 13" => "patterns/p13.jpg",
        "Pattern 15" => "patterns/p15.jpg",
        "Pattern 14" => "patterns/p14.jpg",
        "Pattern 16" => "patterns/p16.jpg",
        "Pattern 17" => "patterns/p17.jpg",
        "Pattern 18" => "patterns/p18.jpg",
        "Pattern 19" => "patterns/p19.jpg",
        "Pattern 20" => "patterns/p20.png",
        "Pattern 21" => "patterns/p21.jpg",
        "Pattern 22" => "patterns/p22.png"
        );
        
    $dropDown = array("Flip Book Overview" => "main",
    				  "Brochure" => "brochure",
    				  "Template Blue" => "template-blue",
    				  "Template Ocean" => "template-ocean",
    				  "Template Gold" => "template-gold",
    				  "Template Light" => "template-light",
    				  "Template Pistachio" => "template-pistachio",
    				  "Template Grass" => "template-grass",
    				  "Template Violet" => "template-violet",
    				  "Template Brownie" => "template-brownie"); 
    				  
    $dropDownMenu = array("Stacked" => "stacked",
    				 	 "Spread" => "spread");  
        
	$options = array();
	
	// logo at the top
	$options[] = array("type" => "logo",
					   "src" => "styles-switcher/images/logo.png");
	
	// Other Books
	$options[] = array("type" => "dropdown",
					   "desc" => "See other examples",
					   "desc-pos" => "top",
					   "id" => "ss_fb_dropdown",
					   "options" => $dropDown,
					   "val" => "Brochure");
					   
	$options[] = array("type" => "dropdown",
					   "desc" => "Change menu style",
					   "desc-pos" => "top",
					   "id" => "ss_fb_menu",
					   "options" => $dropDownMenu,
					   "val" => "Spread");
	
	// background color picker
	$options[] = array( "desc" => "Choose background color",
						"desc-pos" => "top", 
						"id" => $shortname."_bg_color",
						"type" => "color",
						"val" => "#FAFAFA");

	// background patern images 
	$options[] = array( "desc" => "Choose background pattern overlay",
						"desc-pos" => "top",
						"id" => $shortname."_background_image",
						"options" => $images_array,
						"type" => "choose-image",
						"val" => 13);			

	return $options;

} /* end ss_options */

?>