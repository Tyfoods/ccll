 <?php
 
// If uninstall/delete not called from WordPress then exit
if( !defined( 'ABSPATH' ) && !defined( 'WP_UNINSTALL_PLUGIN' ) )
 exit();

/*
 // Delete option from options table
 delete_option( 'prowp_options_arr' );
// Delete any other options, custom tables/data, files
*/

global $wpdb;
$table_name = $wpdb->prefix .'ccll_pending_links_data';
$sql = "DROP TABLE IF EXISTS ".$table_name;
$wpdb->query($sql);
delete_option("ccll_link_manager_db_version");

global $wpdb;
$table_name = $wpdb->prefix .'ccll_pending_list_data';
$sql = "DROP TABLE IF EXISTS ".$table_name;
$wpdb->query($sql);
delete_option("ccll_link_manager_db_version");

?> 