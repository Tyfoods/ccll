<?php

function delete_pending_list_item_data(){
	header('Content-type: application/json;charset=UTF-8'); //sends raw HTTP header to client
	$json_new_list_item_data = file_get_contents('php://input');
	//if string json_string= exists, extract new_list_item_data
	if (strstr($json_new_list_item_data, 'json_string=') !== false) {
    	//echo 'Json String Was Found';
    	$raw_json_str_new_list_item_data = strstr($json_new_list_item_data, 'json_string=');
		$json_new_list_item_data = str_replace('json_string=', '', $raw_json_str_new_list_item_data);
		$new_list_item_data = json_decode($json_new_list_item_data, true);
	}
	/*
	echo 'Processed data: ';
	echo $new_list_item_data;
	*/
	$pending_list_id = $new_list_item_data['listId'];
	$common_user_id = $new_list_item_data['commonUserId'];
	$new_list_category = $new_list_item_data['list_category'];


	//Delete Passed in new_list_item_data from pending List table
	$wp_config_path = $_SERVER['DOCUMENT_ROOT'] . '/wp-config.php';
	require_once($wp_config_path);


	global $wpdb;
	$table_name = $wpdb->prefix .'cll_pending_list_data';


	$wpdb_response = $wpdb->delete($table_name, 
		array( 'pending_list_id' => $pending_list_id,
			 )
		);
	echo $wpdb_response;
}


delete_pending_list_item_data();






