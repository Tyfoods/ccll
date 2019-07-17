<?php
/*
Plugin Name: Crowd Curation Link Library
Plugin URI: https://www.propdanceculture.com
Description: Crowd Curation Link Library allows you to create your own crowd sourced library of links. Users on your website can up/down vote, or 5-star review different links and criteria for how links stay or do not stay in your library is customizable. All in all, this tool allows you to outsource the job of finding quality content to host on your website.
Author: TyFoods
Author URI: https://www.propdanceculture.com/profile/?tyfooodsgmail-com-2/
Version: 1.0.0
*/

//Exit if accessed directly
if(!defined('ABSPATH')){
	exit;
}

// Define CLL_PLUGIN_FILE.
if ( ! defined( 'CLL_PLUGIN_DIR' ) ) {
	define( 'CLL_PLUGIN_DIR', plugin_dir_url(__FILE__) );
}

function cll_root(){
	return '<div id="root"></div>';

}
add_shortcode( 'cll_root', 'cll_root');

add_action('rest_api_init', function () {
	register_rest_route( 'cll-submitted_by/v1', '/cll-link/(?P<id>\d+)',array(
				  'methods'  => WP_REST_Server::READABLE,
				  'callback' => 'show_submitted_by'
		));
  });

  function show_submitted_by($data){
	return get_userdata($data['id'])->data->user_login;
  }


add_action('rest_api_init', function () {
	register_rest_route( 'cll-vote/v1', '/cll-link/(?P<id>\d+)',array(
				  'methods'  => WP_REST_Server::EDITABLE,
				  'callback' => 'vote_against_link'
		));
  });

function vote_against_link($data){

	$new_meta_data_array = json_decode($data->get_body(), true);

	
	$url = $new_meta_data_array['URL'];
	$link_type =  $new_meta_data_array['link_type'];
	$up_votes = $new_meta_data_array['up_votes'];
	$down_votes = $new_meta_data_array['down_votes'];
	$voteRecord = $new_meta_data_array['voteRecord'];
	
	$metas = array( 
		'URL'   => $new_meta_data_array['URL'],
		'link_type' => $new_meta_data_array['link_type'], 
		'up_votes'  => $new_meta_data_array['up_votes'],
		'down_votes'       => $new_meta_data_array['down_votes'],
		'voteRecord'     => $new_meta_data_array['voteRecord']
	);
	

	foreach($metas as $key => $value) {
		update_post_meta($data['id'], $key, $value );
	}


	return get_post_meta($data['id']);

}


function cll_register_link_post_type() {
		$labels = array(
					'name' => 'Link',
					'singular_name' => 'Link',
					'add_new' => 'Add New Link',
					'add_new_item' => 'Add New Link',
					'edit_item' => 'Edit Link',
					'new_item' => 'New Link',
					'all_items' => 'All Links',
					'view_item' => 'View Link',
					'search_items' => 'Search Links',
					'not_found' => 'No links found',
					'not_found_in_trash' => 'No links found in Trash',
					'menu_name' => 'Links'
					);
 		$args = array(
					 'public' => true,
					 'show_in_rest' => true,
					 'rest_base' => 'cll-link',
  					 'rest_controller_class' => 'WP_REST_Posts_Controller',
					 'has_archive' => true,
					 'labels' => $labels,
					 'taxonomies' => array( 'category' ),
					 'rewrite' => array( 'slug' => 'link' ), 
					 'supports' => array( 'title', 'editor', 'author', 'thumbnail', 'comments', 'custom-fields')
					 );
 	register_post_type( 'cll_link', $args );
 }

 register_meta('post', 'URL', [
    'object_subtype' => 'cll_link', // Limit to a post type.
    'type'           => 'string',
    'single'         => true,
    'show_in_rest'   => true,
]);
register_meta('post', 'link_type', [
    'object_subtype' => 'cll_link', // Limit to a post type.
    'type'           => 'string',
    'single'         => true,
    'show_in_rest'   => true,
]);

register_meta('post', 'up_votes', [
    'object_subtype' => 'cll_link', // Limit to a post type.
    'type'           => 'integer',
    'single'         => true,
    'show_in_rest'   => true,
]);
register_meta('post', 'down_votes', [
    'object_subtype' => 'cll_link', // Limit to a post type.
    'type'           => 'integer',
    'single'         => true,
    'show_in_rest'   => true,
]);
register_meta('post', 'voteRecord', [
    'object_subtype' => 'cll_link', // Limit to a post type.
    'type'           => 'string',
    'single'         => true,
    'show_in_rest'   => true,
]);
register_meta('post', 'submitted_by', [
    'object_subtype' => 'cll_link', // Limit to a post type.
    'type'           => 'string',
    'single'         => true,
    'show_in_rest'   => true,
]);


 function cll_enqueue_styles(){
	if(!is_admin()){
	 wp_enqueue_style( 'cll-list-style-1',CLL_PLUGIN_DIR.'/assets/css/cll-list-style-1.css');
	}
 }


function shortcode_master_category_input_handler($shortcode_master_input)
{
	$cll_existing_links = get_posts(
	    array(
	        'post_type' => 'cll_link',
	        'posts_per_page' => -1,
	        'fields' => 'ids', // return an array of ids
	        /*'tax_query' => array(
	            array(
	                'taxonomy' => get_query_var('taxonomy'),
	                'field' => 'slug',
	                'terms' => $term_slug = get_queried_object()->slug,
	            )*/
	        )
	    );


	$cll_link_existing_categories = get_terms(
	    array(
	        //'taxonomy' => 'custom_tax',
			"hide_empty" => 0,
	        'object_ids' => $cll_links
	    )
	);


	$i = 0;
	foreach($cll_link_existing_categories as $raw_existing_category)
	{
		//process shortcode master categories
		$raw_shortcode_master_category = json_encode($shortcode_master_input);
		$processed_shortcode_master_category = strtolower(str_replace('"','',$raw_shortcode_master_category));


		//process existing categories and test against them
		$raw_existing_category_name = $raw_existing_category->name;
		$processed_existing_category_name = strtolower(str_replace('"','',$raw_existing_category_name));


		$processed_existing_category_name_array[$i] = $processed_existing_category_name;

		$final_category_data['processed_existing_category_name_array'] = $processed_existing_category_name_array;
	$i+=1;
	}


	foreach($processed_existing_category_name_array as $category_name)
	{
		if($processed_shortcode_master_category === $category_name)
		{
			//move through existing categorys check their name against the existing name found then get the ID
			foreach($cll_link_existing_categories as $matched_category_name)
			{
				if(strtolower($matched_category_name->name) === $category_name)
				{
					//echo "The Name is ".$matched_category_name->name;
					$final_category_id = $matched_category_name->term_id;
					//echo $final_category_id;
					//echo "I've Matched";
					$final_category_data['final_category_id'] = $final_category_id;
					break;

				}
				else
				{
					//echo "nothing found";
				}
			}
			
			$final_category = $shortcode_master_input;

			$final_category_data['final_category'] = $final_category;
			break;

		}
		else //if category specified by master doesn't exist then...
		{
			$final_category_data['final_category_id'] = get_option('default_category');
			$final_category_data['final_category'] = '';
		}
	}
	return $final_category_data;
}



//Use specified style to set up style template
function cll_list_style_processor($style, $final_category_data)
{

	$cll_php_template_path = dirname(__FILE__).'/templates/cll-list-style-'.$style.'.php';
	//echo ($cll_php_template_path);

	//Unpacking my array
	$final_category_id = $final_category_data['final_category_id'];
	$final_category = $final_category_data['final_category'];
	$processed_existing_category_name_array = $final_category_data['processed_existing_category_name_array'];

	//wrap all this in a function called cll_set_up_style_template();
	$cll_includes_files_array = get_included_files();
	$my_array_response = in_array($cll_php_template_path, $cll_includes_files_array);
	if($my_array_response === true )
	{
		//This allows us to assosciate localized data with specific shortcodes.
		$GLOBALS['cll_include_count'] +=1;

		wp_localize_script('cll-mainjs','cll_category_ids'.'_'.$GLOBALS['cll_include_count'], $final_category_id);
		wp_localize_script('cll-mainjs','cll_category_names'.'_'.$GLOBALS['cll_include_count'], $final_category);

		wp_localize_script('cll-commonUserJs','cll_category_ids'.'_'.$GLOBALS['cll_include_count'], $final_category_id);
		wp_localize_script('cll-commonUserJs','cll_category_names'.'_'.$GLOBALS['cll_include_count'], $final_category);

		return $cll_php_template_path;

	}
	else{
		wp_localize_script('cll-mainjs','cll_category_ids_0', $final_category_id);
		wp_localize_script('cll-mainjs','cll_category_names_0', $final_category);
		wp_localize_script('cll-mainjs','existing_category_names_array', $processed_existing_category_name_array);

		wp_localize_script('cll-commonUserJs','cll_category_ids_0', $final_category_id);
		wp_localize_script('cll-commonUserJs','cll_category_names_0', $final_category);
		wp_localize_script('cll-commonUserJs','existing_category_names_array', $processed_existing_category_name_array);

		return $cll_php_template_path;
	}


}

function cll_search_engine_shortcode(){
	include dirname(__FILE__).'/templates/cllSearchEngine.php';

}
add_shortcode( 'cll_search_engine', 'cll_search_engine_shortcode');


function cll_list_shortcode($atts){


	$atts = shortcode_atts( array(
		'style' => '1',
		'category_name' => '' //Shortcode master must seperate with +'s for valid'
	), $atts );

	$final_category_data = shortcode_master_category_input_handler($atts['category_name']);
	
	//Controls query based on shortcode input
	if(isset($final_category_data['final_category']))
	{
		//query specified by ShortCode Master input
		$link_list_query_args = array( 
		'orderby' => 'title',
		'post_type' => 'cll_link',
		'category_name' => $final_category_data['final_category']
		);

	

		$link_list_query = new WP_Query( $link_list_query_args );
	}
	else
	{
		//query specified by ShortCode Master input
		$link_list_query_args = array( 
		'orderby' => 'title',
		'post_type' => 'cll_link',
		);

		$link_list_query = new WP_Query( $link_list_query_args );
	}

	$user = wp_get_current_user();
	$allowed_roles = array('library_manager', 'administrator');
	//checkUserPermissions if admin, or if Library Manager then execute following, else load "commonUserJS.js"
	if(is_user_logged_in() === true){
		if( array_intersect($allowed_roles, $user->roles ) ) 
		{
			if(!is_admin()){
				//LOAD ADMIN JAVASCRIPT mainjs.js
				wp_enqueue_script( 'cll-mainjs',CLL_PLUGIN_DIR.'/assets/js/mainjs.js');
				//pass "magicalData" to cll-main JS by echoing data through HTML
				wp_localize_script('cll-mainjs','magicalData',array(
					'nonce' => wp_create_nonce('wp_rest'),
					//'cllUserId' => get_current_user_id()
				));

				wp_localize_script('cll-mainjs', 'cllUserId', get_current_user_id());

				/*
				wp_localize_script( 'cll-mainjs', 'cllAjaxUrl', array(
						'ajax_url' => admin_url( 'admin-ajax.php' )
					));
				*/



				$style_template = cll_list_style_processor($atts["style"], $final_category_data);
				if (isset($style_template)){
					include $style_template;
					wp_localize_script('cll-mainjs','current_page_id', $current_page_id);
					wp_localize_script('cll-commonUserJs','current_page_id', $current_page_id);

				}
				return;
			}
		}
		else
		{
			//Load commonUserJS.js
			if(!is_admin()){
				wp_enqueue_script( 'cll-commonUserJs', CLL_PLUGIN_DIR.'/assets/js/commonUserJs.js');
				wp_localize_script('cll-commonUserJs','magicalData',array(
					'nonce' => wp_create_nonce('wp_rest'),
					//'cllUserId' => get_current_user_id(),
				));

				wp_localize_script('cll-commonUserJs', 'cllUserId', get_current_user_id());
				

				$style_template = cll_list_style_processor($atts["style"], $final_category_data);
				if (isset($style_template)){
					include $style_template;
					wp_localize_script('cll-mainjs','current_page_id', $current_page_id);
					wp_localize_script('cll-commonUserJs','current_page_id', $current_page_id);

				}
				return;
			}
		}
	}
	else{
		if(!is_admin()){

			wp_enqueue_script( 'cll-nonLoggedInUser.js',CLL_PLUGIN_DIR.'/assets/js/nonLoggedInUser.js');
			wp_localize_script('cll-nonLoggedInUser.js','magicalData',array(
				'nonce' => wp_create_nonce('wp_rest'),
			));
			$style_template = cll_list_style_processor($atts["style"], $final_category_data);
			if (isset($style_template)){
				include $style_template;
			}
		}
	}

}
add_shortcode( 'cll_list', 'cll_list_shortcode');
add_action( 'wp_enqueue_scripts', 'cll_enqueue_styles'); //LOADS CSS
add_action( 'init', 'cll_register_link_post_type');
add_action('init', 'cll_register_link_list_post_type');




function cll_main_plugin_page(){
	echo "Coming Soon, for now here are basic instructions:";
	?> 
<h1>Welcome to Crowd Curation Link Library</h1>

<h2> Links </h2>
<p>Links are the foundation of what we do here. However, to get started you'll be placing a couple shortcodes onto the page of your choice.</p>
<p>The shortcodes are: <strong>[cll_list]</strong> & <strong>[cll_root]</strong></p>
<p>This shortcode takes attributes like [cll_list style="1" category="pink"] </p>
<p>For now there is only one style, which is the default. Categories can be made from the frontend, or backend.</p>
<p>If you view the page this shortcode is on, you will see that you now have a default list that you can easily delete/edit, or add to.</p>
<p>Links can be "External" meaning they link to a website outside your own, or "Internal" meaning they link to a page within' your website</p>
<p>When an "Internal Link" is created, a new page is created which contains a default list. </p>
<p>In this way, you can create pages that contain lists of links with ease </p>
<p>However, such a library would be incomplete without a search bar! </p>
<p>Insert the shortcode: <strong>[cll_search_engine]</strong> onto a page of your choice</p>
<p>Upon viewing the page, you will see a search bar you can use to search through "external links" that you, or another user has created</p>
<p>As mentioned previously, "internal links" will not show up here. This may be changed in a future version of CCLL </p>

<h2> Link Management </h2>
<p>If you look to your left, you'll see a tab called "links". All links that are created in the front end will be present here.</p>
<p>You can use the backend here to create links if desired, but that would, perhaps, defeat the purpose of the plugin</p>
<p>On each individual link page you can see information about the post including title, URL, up_votes, down_votes, link_type, who the link was submitted by and even a record of all who have voted on this particular link</p>
<p>If you look over to your left again and click "Crowd Curation Link Library", you'll see a tab called "link manager" </p>
<p>This allows you to see both links and lists that have been requested by your users </p>
<p>For now, you can only approve or decline the links, but in the future you will be able to edit the links if there are obvious mistakes before accepting them</p>
<p>This plugin is mean't to be extremely simple to use, and as you can see, there is not much too it. If you get stuck, or have problems, please contact me at Ty@TyfoodsForThought.com</p>
<p>I'll be happy to help you get sorted!</p>
<p>Crowd sourcing information has proven to be an extremely effective method for obtaining quality information at little cost. I hope this plugin helps you and your community gather and share the best resources so that you can all grow and get way better at whatever it is you do. Stay gold. </p>


	<?php
}

function cll_pending_manager_page()
{
	require_once (dirname(__FILE__).'/templates/cll-link-manager-page.php');
	//How do I load CSS on this specific menu?
	//Load CSS
	//Load Javascript

}



add_action( 'admin_enqueue_scripts', 'load_link_manager_css_and_js' );
function load_link_manager_css_and_js($hook)
{
   if($hook != 'crowd-curation-link-library_page_cll_pending_manager_page')
   {
   		return;
   }
	wp_enqueue_style( 'cll-list-manager-page',CLL_PLUGIN_DIR.'/assets/css/cll-link-manager-page.css');
	wp_enqueue_script( 'cll-adminApprovalJs',CLL_PLUGIN_DIR.'/assets/js/adminApproval.js');
	wp_localize_script('cll-adminApprovalJs','magicalData',array(
		'nonce' => wp_create_nonce('wp_rest')
	));


}



add_action( 'admin_menu', 'cll_create_menu' );
function cll_create_menu()
{ 
	$cllLinkManagerMenu = add_menu_page( 'Crowd Curation Link Library Plugin Page', 'Crowd Curation Link Library', 'edit_others_posts', 'cll_main_menu', 'cll_main_plugin_page','','3');
  
  	//Params = $parent_slug, $page_title, $menu_title, $capability, $menu_slug, $function = ''
	$cllLinkManagerMainSubMenu = add_submenu_page( 'cll_main_menu', 'Pending Link/List Manager Page',
	'Pending Link/List Manager', 'edit_others_posts', 'cll_pending_manager_page',
	'cll_pending_manager_page' );

}

function my_function($hook) {
    if ( 'appearance_page_page-name' != $hook ) {
        return;
    }
    wp_enqueue_style( 'custom-style', get_template_directory_uri() . 'custom-page/style.css' );
}
add_action( 'admin_enqueue_scripts', 'my_function' );

/*delete_posts
delete_published_posts
edit_posts
edit_published_posts
publish_posts
*/
function add_library_manager_role() {
	add_role( 'library_manager', 'Library Manager', array( 'read' => true,
														   'publish_pages' => true,
														   'publish_posts' => true,

														   'manage_categories' => true,

														   'delete_posts' => true,
														   'delete_pages' => true,
														   'delete_others_posts' => true,
														   'delete_others_pages' => true,
														   'delete_published_posts'=> true,
														   'delete_published_pages' => true,

														   'edit_plugins' => true,
														   'edit_posts' => true,
														   'edit_posts' => true,
														   'edit_others_posts' => true,
														   'edit_others_pages' => true,
														   'edit_published_posts' => true,
														   'edit_published_pages' => true,

														   
														   ) );
}

add_action( 'admin_init', 'cll_remove_menu_pages' );
function cll_remove_menu_pages() {

	//if the user is library_manager then remove these items
	$user = wp_get_current_user();
	$allowed_roles = array('library_manager');
	if( array_intersect($allowed_roles, $user->roles ) ) 
	{
		remove_menu_page( 'index.php' );
		remove_menu_page( 'edit-comments.php' );
		remove_menu_page( 'edit.php' );
		remove_menu_page( 'profile.php' );
		remove_menu_page( 'tools.php' );
	}
}

function cll_activate() {



	add_library_manager_role();

    //register taxonomies/post types here
    
    //Create Custom Database Table
    global $wpdb;
	$charset_collate = $wpdb->get_charset_collate();
	//define the custom table name
 	$table_name = $wpdb->prefix .'cll_pending_links_data';
	$sql = "CREATE TABLE $table_name (
	 pending_link_id mediumint(9) NOT NULL AUTO_INCREMENT,
	 common_user_id mediumint(9) NOT NULL,
	 link_title varchar(250) NOT NULL,
	 link_url text NOT NULL,
	 link_status text NOT NULL,
	 link_categories text NOT NULL,
  	 PRIMARY KEY  (pending_link_id)
  	) $charset_collate;";

	require_once( ABSPATH . 'wp-admin/includes/upgrade.php' );
	//execute the query creating our table
	dbDelta( $sql );

	global $wpdb;
	//Create table for pending list data
	$charset_collate2 = $wpdb->get_charset_collate();
	//define the custom table name
 	$table_name2 = $wpdb->prefix .'cll_pending_list_data';
	$sql2 = "CREATE TABLE $table_name2 (
	 pending_list_id mediumint(9) NOT NULL AUTO_INCREMENT,
	 common_user_id mediumint(9) NOT NULL,
	 list_category text NOT NULL,
	 list_page_orgin text NOT NULL,
  	 PRIMARY KEY  (pending_list_id)
  	) $charset_collate2;";

	require_once( ABSPATH . 'wp-admin/includes/upgrade.php' );
	//execute the query creating our table
	dbDelta( $sql2 );

	$cll_link_manager_db_version = '1.0';

 	add_option( 'cll_link_manager_db_version', $cll_link_manager_db_version ); 

    flush_rewrite_rules();
}

register_activation_hook( __FILE__, 'cll_activate' );






function cll_deactivate() {

	if( get_role('library_manager') ){
		remove_role( 'library_manager' );
    }

	/*
	global $wpdb;
	$table_name = $wpdb->prefix .'cll_pending_links_data';
	$sql = "DROP TABLE IF EXISTS ".$table_name;
	$wpdb->query($sql);
	delete_option("cll_link_manager_db_version");
	flush_rewrite_rules();
	*/
}

register_deactivation_hook( __FILE__, 'cll_deactivate' );



