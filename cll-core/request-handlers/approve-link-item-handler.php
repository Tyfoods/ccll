<?php

function delete_pending_link_item_data(){
	header('Content-type: application/json;charset=UTF-8'); //sends raw HTTP header to client
	$json_new_link_item_data = file_get_contents('php://input');
	//if string json_string= exists, extract new_link_item_data
	if (strstr($json_new_link_item_data, 'json_string=') !== false) {
    	//echo 'Json String Was Found';
    	$raw_json_str_new_link_item_data = strstr($json_new_link_item_data, 'json_string=');
		$json_new_link_item_data = str_replace('json_string=', '', $raw_json_str_new_link_item_data);
		$new_link_item_data = json_decode($json_new_link_item_data, true);
	}
	/*
	echo 'Processed data: ';
	echo $new_link_item_data;
	*/
	$pending_link_id = $new_link_item_data['pendingLinkId'];
	$common_user_id = $new_link_item_data['commonUserId'];
	$new_link_item_title = $new_link_item_data['title'];
	$new_link_item_url = $new_link_item_data['content'];
	$new_link_item_status = $new_link_item_data['status'];


	//Delete Passed in new_link_item_data from pending link table
	$wp_config_path = $_SERVER['DOCUMENT_ROOT'] . '/wp-config.php';
	require_once($wp_config_path);


	global $wpdb;
	$table_name = $wpdb->prefix .'cll_pending_links_data';
	$wpdb_response = $wpdb->delete($table_name, 
		array( 'pending_link_id' => $pending_link_id,
			 )
		);
	echo $wpdb_response;


	
	/*
	//if string commonUserId= exists, extract commonUserId
	if (strstr($rawNewLinkItemData, 'json_string=') !== false) {
    	//echo 'Json String Was Found';
    	//echo 'Extracting CommonUserId';
    	$raw_json_str_new_link_item_data = strstr($rawNewLinkItemData, 'json_string=');
		$rawJsonCommonUserId = str_replace($raw_json_str_new_link_item_data, '', $rawNewLinkItemData);
		$jsonCommonUserId = str_replace('commonUserId=', '', $rawJsonCommonUserId);
		$commonUserId = json_decode($jsonCommonUserId, true);
	}
	*/

	//echo "<-SPACER->The New Link Item Data Should Be Here: ";
	//echo $rawNewLinkItemData; // <--- Array that contains data entered by user
	//$new_link_item_data_array = array($new_link_item_data, $commonUserId);
}
delete_pending_link_item_data();






