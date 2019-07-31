<?php
/*
Plugin Name: Crowd Curation Link Library
Plugin URI: https://www.propdanceculture.com
Description: Crowd Curation Link Library allows you to create your own crowd sourced library of links. Users on your website can up/down vote, or 5-star review different links and criteria for how links stay or do not stay in your library is customizable. All in all, this tool allows you to outsource the job of finding quality content to host on your website.
Author: TyFoods
Author URI: https://www.propdanceculture.com/profile/?tyfooodsgmail-com-2/
Version: 1.0.0
*/

//Exit if accessed directly
if(!defined('ABSPATH')){
	exit;
}

// Define CLL_PLUGIN_DIR
if ( ! defined( 'CLL_PLUGIN_DIR' ) ) {
	define( 'CLL_PLUGIN_DIR', plugin_dir_url(__FILE__) );
}
// Define CLL_PLUGIN_FILE
if ( ! defined( 'CCLL_PLUGIN_FILE' ) ) {
	define( 'CCLL_PLUGIN_FILE', __FILE__ );
}

if ( ! defined( 'CCLL_SERVER_DIR' ) ) {
	define( 'CCLL_SERVER_DIR', __DIR__ );
}



// Include the main CCLL class.
if ( ! class_exists( 'CCLL' ) ) {
	include_once dirname( __FILE__ ) . '/includes/class-ccll.php';
}

function CCLL(){
	return CCLL::instance();
}
CCLL();

/* Will eventually convert plugin to use React.js
function cll_root(){
	return '<div id="root"></div>';

}
add_shortcode( 'cll_root', 'cll_root');
*/
