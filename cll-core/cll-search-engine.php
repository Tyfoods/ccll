<?php

if ( ! defined('ABSPATH') ) {
    /** Set up WordPress environment */
    //require_once( dirname( __FILE__ ) . '/wp-load.php' );
    //include ('wp-load.php');
}


function cllCaptureSearchEngineInput(){
	header('Content-type: application/json;charset=UTF-8'); //sends raw HTTP header to client
	$rawSearchEngineInput = file_get_contents('php://input');
	echo 'Non processed search engine input: ';
	echo $rawSearchEngineInput;
	//if string json_string= exists, extract newLinkItemData
	if (strstr($rawSearchEngineInput, 'json_string=') !== false) {
    	//echo 'Json String Was Found';
    	$rawJsonSearchEngineInput = strstr($rawSearchEngineInput, 'json_string=');
		$jsonSearchEngineInput = str_replace('json_string=', '', $rawJsonSearchEngineInput);
		$searchEngineInputData = json_decode($jsonSearchEngineInput, true);
	}


	echo $searchEngineInputData;

	$parse_uri = explode( 'wp-content', $_SERVER['SCRIPT_FILENAME'] );
	require_once( $parse_uri[0] . 'wp-load.php' );
	
	$search_engine_query_args = array( 
	//'orderby' => 'title',
	'post_type' => 'cll_link',
	's' => $searchEngineInputData
	);

	//echo $search_engine_query_args;

	$search_engine_query = new WP_Query( $search_engine_query_args );

	echo $search_engine_query;
	/*
	if ( $search_engine_query->have_posts() ) : while ( $search_engine_query->have_posts() ) : $search_engine_query->the_post();

	//echo the_title();

		endwhile;

	endif;
	*/

	return $searchEngineInputData;
}

cllCaptureSearchEngineInput();

?>