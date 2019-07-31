<?php
/*
Handles a request from non-admin/library manager

*/
function process_logged_in_user_list_request(){
	header('Content-type: application/json;charset=UTF-8'); //sends raw HTTP header to client
	$raw_new_list_item_data = file_get_contents('php://input');
	echo 'Non processed data: ';
	echo $raw_new_list_item_data;
	//if string json_string= exists, extract new_list_item_data
	if (strstr($raw_new_list_item_data, 'json_string=') !== false) {
    	//echo 'Json String Was Found';
    	$raw_json_str_new_list_item_data = strstr($raw_new_list_item_data, 'json_string=');
		$json_new_list_item_data = str_replace('json_string=', '', $raw_json_str_new_list_item_data);
		$new_list_item_data = json_decode($json_new_list_item_data, true);
	}
	//if string commonUserId= exists, extract commonUserId
	if (strstr($raw_new_list_item_data, 'json_string=') !== false) {
    	//echo 'Json String Was Found';
    	//echo 'Extracting CommonUserId';
    	$raw_json_str_new_list_item_data = strstr($raw_new_list_item_data, 'json_string=');
		$raw_json_common_user_id = str_replace($raw_json_str_new_list_item_data, '', $raw_new_list_item_data);
		$json_common_user_id = str_replace('commonUserId=', '', $raw_json_common_user_id);
		$common_user_id = json_decode($json_common_user_id, true);
	}
/*
	echo "<-SPACER->The New List Item Data Should Be Here: ";
	echo $new_list_item_data; // <--- Array that contains data entered by user
	echo "<-SPACER->The Common User ID Should Be Here: ";
	echo $common_user_id;
*/
	$new_list_item_data_array = array($new_list_item_data, $common_user_id);

	return $new_list_item_data_array;
}

function main_request_handler()
{
    $new_list_item_data_array = process_logged_in_user_list_request();
    echo var_dump($new_list_item_data_array);

	$new_list_item_data = $new_list_item_data_array[0];
	$common_user_id = $new_list_item_data_array[1];



	echo $common_user_id;



	$new_list_item_category = $new_list_item_data['list_category'];
	$new_list_page_origin = $new_list_item_data['list_page_origin'];
    echo $new_list_item_category;

	

	$wp_config_path = $_SERVER['DOCUMENT_ROOT'] . 'wp-config.php';
	//echo $_SERVER['DOCUMENT_ROOT'] . 'wp-config.php';
	require_once($wp_config_path);
	global $wpdb;
	$table_name = $wpdb->prefix .'cll_pending_list_data';
	//echo $table_name;
	$wpdb->insert( 
		$table_name, 
		array( 
			//'time' => current_time( 'mysql' ), 
			'common_user_id' => $common_user_id, 
			'list_category' => $new_list_item_category,
			'list_page_origin' => $new_list_page_origin
		)
	);

}
main_request_handler();