<?php

function cllCaptureThroughLinkPageSlug(){
	header('Content-type: application/json;charset=UTF-8'); //sends raw HTTP header to client
	$raw_slug = file_get_contents('php://input');
	$quoted_slug = str_replace('json_string=', '', $raw_slug);
	echo 'Non processed data: ';
	echo $raw_slug;
	echo "Quoted Data: ";
	echo $quoted_slug;
	$slashed_slug = str_replace('"','', $quoted_slug);
	$processed_slug = str_replace('/','',$slashed_slug);
	echo "clean Data: ";
	echo $processed_slug;

	$page = get_page_by_path( $processed_slug);
	//echo $page->id;
	//echo $page;

}

cllCaptureThroughLinkPageSlug();

