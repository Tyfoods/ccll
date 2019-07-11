<?php

function cllCaptureNewListItemData(){
	header('Content-type: application/json;charset=UTF-8'); //sends raw HTTP header to client
	$JsonNewListItemData = file_get_contents('php://input');
	//if string json_string= exists, extract newListItemData
	if (strstr($JsonNewListItemData, 'json_string=') !== false) {
    	//echo 'Json String Was Found';
    	$rawJsonStrNewListItemData = strstr($JsonNewListItemData, 'json_string=');
		$JsonNewListItemData = str_replace('json_string=', '', $rawJsonStrNewListItemData);
		$newListItemData = json_decode($JsonNewListItemData, true);
	}
	/*
	echo 'Processed data: ';
	echo $newListItemData;
	*/
	$pendingListId = $newListItemData['listId'];
	$commonUserId = $newListItemData['commonUserId'];
	$newListCategory = $newListItemData['list_category'];


	//Delete Passed in newListItemData from pending List table
	$wpConfigPath = $_SERVER['DOCUMENT_ROOT'] . 'wp-config.php';
	require_once($wpConfigPath);


	global $wpdb;
	$table_name = $wpdb->prefix .'cll_pending_list_data';


	$wpdb_response = $wpdb->delete($table_name, 
		array( 'pending_list_id' => $pendingListId,
			 )
		);
	echo $wpdb_response;
}


cllCaptureNewListItemData();






