<?php
/*
Handles a request from non-admin/library manager

*/
function cllCaptureCommonUserData(){
	header('Content-type: application/json;charset=UTF-8'); //sends raw HTTP header to client
	$rawNewLinkItemData = file_get_contents('php://input');
	//echo 'Non processed data: ';
	//echo $rawNewLinkItemData;
	//if string json_string= exists, extract newLinkItemData
	if (strstr($rawNewLinkItemData, 'json_string=') !== false) {
    	//echo 'Json String Was Found';
    	$rawJsonStrNewLinkItemData = strstr($rawNewLinkItemData, 'json_string=');
		$JsonNewLinkItemData = str_replace('json_string=', '', $rawJsonStrNewLinkItemData);
		$newLinkItemData = json_decode($JsonNewLinkItemData, true);
	}
	//if string commonUserId= exists, extract commonUserId
	if (strstr($rawNewLinkItemData, 'json_string=') !== false) {
    	//echo 'Json String Was Found';
    	//echo 'Extracting CommonUserId';
    	$rawJsonStrNewLinkItemData = strstr($rawNewLinkItemData, 'json_string=');
		$rawJsonCommonUserId = str_replace($rawJsonStrNewLinkItemData, '', $rawNewLinkItemData);
		$jsonCommonUserId = str_replace('commonUserId=', '', $rawJsonCommonUserId);
		$commonUserId = json_decode($jsonCommonUserId, true);
	}
/*
	echo "<-SPACER->The New Link Item Data Should Be Here: ";
	echo $newLinkItemData; // <--- Array that contains data entered by user
	echo "<-SPACER->The Common User ID Should Be Here: ";
	echo $commonUserId;
*/
	$newLinkItemDataArray = array($newLinkItemData, $commonUserId);

	return $newLinkItemDataArray;
}

function mainRequestHandler()
{
	$newLinkItemDataArray = cllCaptureCommonUserData();
	echo var_dump($newLinkItemDataArray);
	$newLinkItemData = $newLinkItemDataArray[0];

	//getUserID
	$commonUserId = $newLinkItemDataArray[1];

	//Unpack Array
	$newLinkItemTitle = $newLinkItemData['title'];
	$newLinkItemUrl = $newLinkItemData['content'];
	$newLinkItemStatus = $newLinkItemData['status'];
	//get Category
	$newLinkItemCategories = $newLinkItemData['categories'];
	$newLinkItemCategory = $newLinkItemCategories[0];

	

	$wpConfigPath = $_SERVER['DOCUMENT_ROOT'] . 'wp-config.php';
	//echo $_SERVER['DOCUMENT_ROOT'] . 'wp-config.php';
	require_once($wpConfigPath);
	global $wpdb;
	$table_name = $wpdb->prefix .'cll_pending_links_data';
	//echo $table_name;
	$wpdb->insert( 
	$table_name, 
	array( 
		//'time' => current_time( 'mysql' ), 
		'common_user_id' => $commonUserId, 
		'link_title' => $newLinkItemTitle, 
		'link_url' => $newLinkItemUrl,
		'link_status' => $newLinkItemStatus,
		'link_categories' => $newLinkItemCategory
	)
);

}
mainRequestHandler();