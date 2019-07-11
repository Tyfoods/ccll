<?php

function cllCaptureNewLinkItemData(){
	header('Content-type: application/json;charset=UTF-8'); //sends raw HTTP header to client
	$JsonNewLinkItemData = file_get_contents('php://input');
	//if string json_string= exists, extract newLinkItemData
	if (strstr($JsonNewLinkItemData, 'json_string=') !== false) {
    	//echo 'Json String Was Found';
    	$rawJsonStrNewLinkItemData = strstr($JsonNewLinkItemData, 'json_string=');
		$JsonNewLinkItemData = str_replace('json_string=', '', $rawJsonStrNewLinkItemData);
		$newLinkItemData = json_decode($JsonNewLinkItemData, true);
	}
	/*
	echo 'Processed data: ';
	echo $newLinkItemData;
	*/
	$pendingLinkId = $newLinkItemData['pendingLinkId'];
	$commonUserId = $newLinkItemData['commonUserId'];
	$newLinkItemTitle = $newLinkItemData['title'];
	$newLinkItemUrl = $newLinkItemData['content'];
	$newLinkItemStatus = $newLinkItemData['status'];


	//Delete Passed in newLinkItemData from pending link table
	$wpConfigPath = $_SERVER['DOCUMENT_ROOT'] . 'wp-config.php';
	require_once($wpConfigPath);


	global $wpdb;
	$table_name = $wpdb->prefix .'cll_pending_links_data';

	/*
	$response = $wpdb->query( $wpdb->prepare( "DELETE FROM $table_name WHERE ( common_user_id = %s AND link_title = %s )", $commonUserId, $newLInkItemTitle) );
	echo $response;
 	*/


/*
	$wpdb->query( $wpdb->prepare(
   "DELETE FROM $wpdb->my_custom_table 
	WHERE id = %d
	AND field_key = %d ", 1, 'address' ) );
*/
	
	$wpdb_response = $wpdb->delete($table_name, 
		array( 'pending_link_id' => $pendingLinkId,
			 )
		);
	echo $wpdb_response;


	
	/*
	//if string commonUserId= exists, extract commonUserId
	if (strstr($rawNewLinkItemData, 'json_string=') !== false) {
    	//echo 'Json String Was Found';
    	//echo 'Extracting CommonUserId';
    	$rawJsonStrNewLinkItemData = strstr($rawNewLinkItemData, 'json_string=');
		$rawJsonCommonUserId = str_replace($rawJsonStrNewLinkItemData, '', $rawNewLinkItemData);
		$jsonCommonUserId = str_replace('commonUserId=', '', $rawJsonCommonUserId);
		$commonUserId = json_decode($jsonCommonUserId, true);
	}
	*/

	//echo "<-SPACER->The New Link Item Data Should Be Here: ";
	//echo $rawNewLinkItemData; // <--- Array that contains data entered by user
	//$newLinkItemDataArray = array($newLinkItemData, $commonUserId);
}


cllCaptureNewLinkItemData();






