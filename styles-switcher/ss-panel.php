<?php

/*
* Created by MassivePixelCreation
*
* Version 1.0
*
* This file prints out the switcher panel.
*
*/

include('ss-options.php');

$ss_options = ss_options();

// get Massive Panel options
$mp_options = ''//mp_get_global_options();

?>

<div id="mpc-styles-switcher">
	<!-- <img src="http://www.mpcreation.pl/themeforest/eco_incorporated2/wp-content/themes/incorporated/images/slider/04.jpg"/> -->
	
	<div id="ss-bookmark">
		<div id="ss-bookmark-icon"></div>
	</div>
	
	<div id="ss-content">
		<?php 
		$output = '';
		$counter = 0;
		$options_length = count($ss_options);
	//	print_r($options_length);
		foreach($ss_options as $option) {
			
			$counter++;
			//print_r("petla");
			//if(isset($option['id']) && isset($mp_options[$option['id']]))
				$val = $option['val'];
				
			if($option['type'] == "logo") {
				$output .= '<div class="ss-option logo">';
			} elseif($counter == 2) {
				$output .= '<div class="ss-option first">';
			} elseif($counter == $options_length) {
				$output .= '<div class="ss-option last">';
			} else {
				$output .= '<div class="ss-option">';
			}
			
			if(isset($option['desc']) && $option['desc'] != ''){
				$output .= '<div class="ss-desc">';
				$output .= $option['desc'];
				$output .= '</div>';
			}
			
			switch($option['type']) {
				// logo
				case 'logo':
							$output .= '<img src="'.$option['src'].'" class="ss-logo"/>';
				break;
				
				// dorp down
				case 'dropdown':
							
							$output .= '<select class="ss-dropdown" id="'.$option['id'].'">';
							
							foreach ($option['options'] as $key => $value ) {
								$selected = '';
					 			if(isset($val) && $val != '') {
						 			if($val == $key){ 
						 				$selected = ' selected="selected"';
						 			} 
			     				}
				 				$output .= '<option'.$selected.' value="'.$value.'">'.$key.'</option>';
				 			}
				 			
							$output .= '</select>';
				break;
				
				// color picker
				case 'color':
							$output .= '<div id="'.$option['id'].'_picker' . '" class="ss-colorSelector"><div style="'. 'background-color:'.$val.'"></div></div>';
							$output .= '<input class="ss-color" id="'.$option['id'].'" type="text" value="'.$val.'" /><div class="ss-picker-icon"></div>';	
				break;
				
				// image chooser
				case "choose-image": 
					$count = 1;
					$option_name = "inc_options";
					$name = $option_name .'['. $option['id'] .']';
					$output .= '<div id="ss_background_pattern">';
					foreach($option['options'] as $key => $value){
							
						if($count % 4 == 0)
							$output .= '<div class="ss-image no-margin">';
						else 
							$output .= '<div class="ss-image">';
						
						$output .= '<img src="styles-switcher/images/'.$value. '"/>';
						$id = $option_name . '-' . $option['id'] .'-'. $key;
						if($val == $count)
							$output .= '<input class="mp-radio" type="radio" name="' .$name. '" id="' .$id. '" value="'.$value. '" checked />';						else
							$output .= '<input class="mp-radio" type="radio" name="' .$name. '" id="' .$id. '" value="'.$value. '"/>';

						$output .= '</div>';
						$count++;
					}
					$output .= '</div>';
					
					
				break;	

			}
			
			if($counter == $options_length){ //if last item
				$output .= '<div class="ss-desc-last">';
				$output .= '<i>and much more…</i>';
				$output .= '</div>';
			}
			
			$output .= '</div>';
	
		} // end foreach 
		
		echo $output; ?>
	
	
	</div> <!-- end ss-content -->
</div> <!-- end mpc-styles-switcher -->