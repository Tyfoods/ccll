<?php
/*
Handles a request from non-admin/library manager

*/
function process_logged_in_user_link_request(){
	header('Content-type: application/json;charset=UTF-8'); //sends raw HTTP header to client
	$raw_new_link_item_data = file_get_contents('php://input');
	//echo 'Non processed data: ';
	//echo $raw_new_link_item_data;
	//if string json_string= exists, extract new_link_item_data
	if (strstr($raw_new_link_item_data, 'json_string=') !== false) {
    	//echo 'Json String Was Found';
    	$raw_json_str_new_link_item_data = strstr($raw_new_link_item_data, 'json_string=');
		$json_new_link_item_data = str_replace('json_string=', '', $raw_json_str_new_link_item_data);
		$new_link_item_data = json_decode($json_new_link_item_data, true);
	}
	//if string commonUserId= exists, extract commonUserId
	if (strstr($raw_new_link_item_data, 'json_string=') !== false) {
    	//echo 'Json String Was Found';
    	//echo 'Extracting CommonUserId';
    	$raw_json_str_new_link_item_data = strstr($raw_new_link_item_data, 'json_string=');
		$raw_json_common_user_id = str_replace($raw_json_str_new_link_item_data, '', $raw_new_link_item_data);
		$json_common_user_id = str_replace('commonUserId=', '', $raw_json_common_user_id);
		$common_user_id = json_decode($json_common_user_id, true);
	}
/*
	echo "<-SPACER->The New Link Item Data Should Be Here: ";
	echo $new_link_item_data; // <--- Array that contains data entered by user
	echo "<-SPACER->The Common User ID Should Be Here: ";
	echo $common_user_id;
*/
	$new_link_item_data_array = array($new_link_item_data, $common_user_id);

	return $new_link_item_data_array;
}

function main_request_handler()
{
	$new_link_item_data_array = process_logged_in_user_link_request();
	echo var_dump($new_link_item_data_array);
	$new_link_item_data = $new_link_item_data_array[0];

	//getUserID
	$common_user_id = $new_link_item_data_array[1];

	//Unpack Array
	$new_link_item_title = $new_link_item_data['title'];
	$new_link_item_url = $new_link_item_data['content'];
	$new_link_item_status = $new_link_item_data['status'];
	//get Category
	$new_link_item_categoies = $new_link_item_data['categories'];
	$new_link_item_category = $new_link_item_categoies[0];

	

	$wp_config_path = $_SERVER['DOCUMENT_ROOT'] . '/wp-config.php';
	//echo $_SERVER['DOCUMENT_ROOT'] . 'wp-config.php';
	require_once($wp_config_path);
	global $wpdb;
	$table_name = $wpdb->prefix .'cll_pending_links_data';
	//echo $table_name;
	$wpdb->insert( 
	$table_name, 
	array( 
		//'time' => current_time( 'mysql' ), 
		'common_user_id' => $common_user_id, 
		'link_title' => $new_link_item_title, 
		'link_url' => $new_link_item_url,
		'link_status' => $new_link_item_status,
		'link_categories' => $new_link_item_category
	)
);

}
main_request_handler();