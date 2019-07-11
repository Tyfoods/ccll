<?php




//Displays lists based on what attributes are passed to it. Lists always have "Add Link" button appended to the end
/*



*/
function cll_list_shortcode($atts){

	/*Load cll-list-style-1.php TEMPLATE - TAKES CARE OF HTML STRUCTURE */
	require_once (plugin_dir_url( __DIR__).'curation-link-library/templates/cll-list-style-1.php');

	/*Load cll-list-style-1.css TAKES CARE OF STYLING */
 	wp_enqueue_style( 'cll-list-style-1', plugin_dir_url( __DIR__).'curation-link-library/assets/css/cll-list-style-1.css' );

	/*Load cll-list-style-1.js TAKES CARE OF ON THE FLY */

	echo "Here's my ECHO test";
	return "Returning Test";
}
add_shortcode( 'cll_list', 'cll_list_shortcode' );


?>
