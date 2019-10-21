<?php
/*
Plugin Name: Crowd Curation Link Library
Plugin URI: https://github.com/Tyfoods/ccll
Description: CCLL allows you to create your own crowd sourced library of links. Users on your website can up/down vote different links and admins have easy user friendly ways to manage the library. All in all, this tool allows you to outsource the job of finding quality content to host on your website.
Author: TyFoods
Author URI: https://www.tyfoodsforthought.com
Version: 1.0.0
*/

//Exit if accessed directly
if(!defined('ABSPATH')){
	exit;
}

// Define Web PAth (URL) Based on plugin DIR
if ( ! defined( 'CCLL_PLUGIN_DIR' ) ) {
	define( 'CCLL_PLUGIN_DIR', plugin_dir_url(__FILE__) );
}
// Define Server path based on CCL_PLUGIN_FILE
if ( ! defined( 'CCLL_PLUGIN_FILE' ) ) {
	define( 'CCLL_PLUGIN_FILE', __FILE__ );
}
// Define Server Based Dir
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

?>