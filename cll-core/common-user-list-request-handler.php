<?php
/*
Handles a request from non-admin/library manager

*/
function cllCaptureCommonUserData(){
	header('Content-type: application/json;charset=UTF-8'); //sends raw HTTP header to client
	$rawNewListItemData = file_get_contents('php://input');
	echo 'Non processed data: ';
	echo $rawNewListItemData;
	//if string json_string= exists, extract newListItemData
	if (strstr($rawNewListItemData, 'json_string=') !== false) {
    	//echo 'Json String Was Found';
    	$rawJsonStrNewListItemData = strstr($rawNewListItemData, 'json_string=');
		$JsonNewListItemData = str_replace('json_string=', '', $rawJsonStrNewListItemData);
		$newListItemData = json_decode($JsonNewListItemData, true);
	}
	//if string commonUserId= exists, extract commonUserId
	if (strstr($rawNewListItemData, 'json_string=') !== false) {
    	//echo 'Json String Was Found';
    	//echo 'Extracting CommonUserId';
    	$rawJsonStrNewListItemData = strstr($rawNewListItemData, 'json_string=');
		$rawJsonCommonUserId = str_replace($rawJsonStrNewListItemData, '', $rawNewListItemData);
		$jsonCommonUserId = str_replace('commonUserId=', '', $rawJsonCommonUserId);
		$commonUserId = json_decode($jsonCommonUserId, true);
	}
/*
	echo "<-SPACER->The New List Item Data Should Be Here: ";
	echo $newListItemData; // <--- Array that contains data entered by user
	echo "<-SPACER->The Common User ID Should Be Here: ";
	echo $commonUserId;
*/
	$newListItemDataArray = array($newListItemData, $commonUserId);

	return $newListItemDataArray;
}

function mainRequestHandler()
{
    $newListItemDataArray = cllCaptureCommonUserData();
    echo var_dump($newListItemDataArray);

	$newListItemData = $newListItemDataArray[0];
	$commonUserId = $newListItemDataArray[1];



	echo $commonUserId;



	$newListItemCategory = $newListItemData['list_category'];
	$newListItemPageOrgin = $newListItemData['list_page_orgin'];
    echo $newListItemCategory;

	

	$wpConfigPath = $_SERVER['DOCUMENT_ROOT'] . 'wp-config.php';
	//echo $_SERVER['DOCUMENT_ROOT'] . 'wp-config.php';
	require_once($wpConfigPath);
	global $wpdb;
	$table_name = $wpdb->prefix .'cll_pending_list_data';
	//echo $table_name;
	$wpdb->insert( 
	$table_name, 
	array( 
		//'time' => current_time( 'mysql' ), 
		'common_user_id' => $commonUserId, 
		'list_category' => $newListItemCategory,
		'list_page_orgin' => $newListItemPageOrgin
	)
);

}
mainRequestHandler();