<?php

defined( 'ABSPATH' ) || exit;

final class CCLL {

	protected static $_instance = null;

	public static function instance() {
		if ( is_null( self::$_instance ) ) {
			self::$_instance = new self();
		}
		return self::$_instance;
	}
	/**
	 * Crowd Curation Link Library Constructor.
	 */
	public function __construct() {
		//$this->define_constants();
		$this->includes();
		$this->init_hooks();
		$this->cll_register_all_meta();
		do_action( 'CCLL_loaded' );
	}
	/**
	 * Hook into actions and filters.
	 *
	 * 
	 */
	private function init_hooks() {
		register_activation_hook( CCLL_PLUGIN_FILE, array($this, 'cll_activate') );
		add_action('rest_api_init', array( $this, 'register_ccll_rest_routes'));

		add_shortcode( 'cll_list', array( $this, 'cll_list_shortcode'));
		//add_shortcode( 'cll_search_engine', array( $this, 'cll_search_engine_shortcode')); deprecated
		add_shortcode( 'cll_react', array( $this, 'cll_react' ) );

		add_action( 'wp_enqueue_scripts', array( $this, 'cll_register_styles')); //REGISTERS CSS for conditional loading later
		add_action( 'init', array( $this, 'cll_register_link_post_type'));
		add_action( 'admin_enqueue_scripts', array( $this, 'load_link_manager_css_and_js' ));
		add_action( 'admin_menu', array( $this, 'cll_create_menu' ));
		add_action( 'admin_init', array( $this, 'cll_remove_menu_pages' ));
		add_action( 'init', array( $this, 'create_link_taxonomies'), 0 );
		
	}

	private function includes(){
		
	}

	public function register_ccll_rest_routes(){

		register_rest_route( 'cll-link/v1', '/list-declined-request/(?P<list_data>[\s\S]+)',array(
			'methods'  => WP_REST_Server::EDITABLE,
			'callback' => array($this, 'handle_list_declined_request')
		));

		register_rest_route( 'cll-link/v1', '/list-request/(?P<list_data>[\s\S]+)',array(
			'methods'  => WP_REST_Server::EDITABLE,
			'callback' => array($this, 'handle_list_request')
		));


		register_rest_route( 'cll-link/v1', '/link-approved-request/(?P<link_data>[\s\S]+)',array(
			'methods'  => WP_REST_Server::EDITABLE,
			'callback' => array($this, 'handle_link_approved_request')
		));

		register_rest_route( 'cll-link/v1', '/link-request/(?P<link_data>[\s\S]+)',array(
			'methods'  => WP_REST_Server::EDITABLE,
			'callback' => array($this, 'handle_link_request')
		));

		register_rest_route( 'cll-link-category/v1', '/cll-link/(?P<category_name>[\s\S]+)',array(
			'methods'  => WP_REST_Server::EDITABLE,
			'callback' => array($this, 'create_new_link_category')
		));
		register_rest_route( 'cll-link-category/v1', '/cll-link/(?P<id>\d+)',array(
			'methods'  => WP_REST_Server::READABLE,
			'callback' => array($this, 'get_link_category_by_id')
		));
	
		register_rest_route( 'cll-submitted_by/v1', '/cll-link/(?P<id>\d+)',array(
			'methods'  => WP_REST_Server::READABLE,
			'callback' => array($this, 'show_submitted_by')
		));
	
		register_rest_route( 'cll-vote/v1', '/cll-link/(?P<id>\d+)',array(
			'methods'  => WP_REST_Server::EDITABLE,
			'callback' => array($this, 'vote_against_link')
		));
	}
	public function cll_register_styles(){
		//if(!is_admin()){
		wp_register_style('cll-control-box-style', CLL_PLUGIN_DIR.'assets/css/cll-control-box-style.css');

		 wp_register_style( 'cll-list-style-1',CLL_PLUGIN_DIR.'assets/css/cll-list-style-1.css');
		 wp_register_style( 'cll-list-style-2',CLL_PLUGIN_DIR.'assets/css/cll-list-style-2.css');
		//}
	}
	public function shortcode_master_category_input_handler($shortcode_master_input){
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
				'taxonomy' => 'link_category',
				"hide_empty" => 0,
				//'object_ids' => $cll_link
			)
		);


		$i = 0;
		//Make processed_existing_category_name array
		foreach($cll_link_existing_categories as $raw_existing_category)
		{
			//process shortcode master categories
			$raw_shortcode_master_category = json_encode($shortcode_master_input);
			$processed_shortcode_master_category = strtolower(str_replace('"','',$raw_shortcode_master_category));

			
			//process existing categories to test against them
			$raw_existing_category_name = $raw_existing_category->name;
			$processed_existing_category_name = strtolower(str_replace('"','',$raw_existing_category_name));


			$processed_existing_category_name_array[$i] = $processed_existing_category_name;

			$final_category_data['processed_existing_category_name_array'] = $processed_existing_category_name_array;
		$i+=1;
		}

		//$iterator = 1;
		foreach($processed_existing_category_name_array as $category_name)
		{

			if($processed_shortcode_master_category === $category_name)
			{
				//move through existing categorys check their name against the existing name found then get the ID
				foreach($cll_link_existing_categories as $matched_category_name)
				{
					if(strtolower($matched_category_name->name) === $category_name)
					{
						/*
						echo "The Name is ".$matched_category_name->name;
						?><br><?php
						*/
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
				//echo "this is the final category in final category data: ".$final_category;
				break;

			}
			else //if category specified by master doesn't exist then...
			{
				$final_category_data['final_category_id'] = get_option('default_category');
				$final_category_data['final_category'] = '';
			}
		}
		//echo "Final category data is: ".var_dump($final_category_data);
		return $final_category_data;
	}

	//Use specified style to set up style template
	public function cll_list_style_processor($style, $final_category_data){

		$cll_php_template_path = CCLL_SERVER_DIR . '/templates/cll-list-style-'.$style.'.php';
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

			//$GLOBALS['cll_include_count'] = 0; initilizing as 0 makes global immutable
			$GLOBALS['cll_include_count'] +=1;

			wp_localize_script('cll-frontEnd','cll_category_ids'.'_'.$GLOBALS['cll_include_count'], array($final_category_id));

			if(!empty($final_category)){
				wp_localize_script('cll-frontEnd','cll_category_names'.'_'.$GLOBALS['cll_include_count'], array($final_category));
			}

			wp_localize_script('cll-frontEnd','cll_category_ids'.'_'.$GLOBALS['cll_include_count'], array($final_category_id));

			if(!empty($final_category)){
				wp_localize_script('cll-frontEnd','cll_category_names'.'_'.$GLOBALS['cll_include_count'], array($final_category));
			}

			return $cll_php_template_path;

		}
		else{
			wp_localize_script('cll-frontEnd','cll_category_ids_0', array($final_category_id));

			if(!empty($final_category)){
				wp_localize_script('cll-frontEnd','cll_category_names_0', array($final_category));
			}

			wp_localize_script('cll-frontEnd','existing_category_names_array', array($processed_existing_category_name_array));

			wp_localize_script('cll-frontEnd','cll_category_ids_0', array($final_category_id));

			if(!empty($final_category)){
				wp_localize_script('cll-frontEnd','cll_category_names_0', array($final_category));
			}

			wp_localize_script('cll-frontEnd','existing_category_names_array', array($processed_existing_category_name_array));

			return $cll_php_template_path;
		}
	}

	public function cll_react(){
		wp_enqueue_script( 'cll-AppCompiled',CLL_PLUGIN_DIR.'assets/js/AppCompiled.js');
		return '<div class="cll-link-list"></div>';
	
	}
	
	
	public function load_list_style_template($style, $final_category_data, $link_category_query_args){
		$style_template = $this->cll_list_style_processor($style, $final_category_data);
		if (isset($style_template)){


			ob_start();
			$link_list_query = new WP_Query( $link_category_query_args );
			include $style_template;
			$output = ob_get_clean();
			wp_localize_script('cll-frontEndAdminManager','current_page_id', array($current_page_id));
			wp_localize_script('cll-frontEndLoggedInUser','current_page_id', array($current_page_id));
			wp_enqueue_style( 'cll-list-style-'.$style);
			wp_enqueue_style('cll-new-list-btn-style');
			wp_enqueue_style('cll-back-btn-style');
			wp_enqueue_style('cll-search-engine-btn-style');
			wp_enqueue_style('cll-control-box-style');
			return $output;
		}
	}
	
	public function generate_list_category_query($final_category_data){
		if(isset($final_category_data['final_category']))
		{
			//echo $final_category_data['final_category'];
			//query specified by ShortCode Master input
			$link_list_query_args = array( 
				'orderby' => 'title',
				'post_type' => 'cll_link',
				'tax_query' => array(
								array(
										'taxonomy' => 'link_category',
										'field' => 'name',
										'terms'    => $final_category_data['final_category']
								),
				)
			);

		}
		else
		{
			//query specified by ShortCode Master input
			$link_list_query_args = array( 
			'orderby' => 'title',
			'post_type' => 'cll_link',
			);
	
		}
		return $link_list_query_args;
	}

	public function cll_list_shortcode($atts){

		$atts = shortcode_atts( array(
			'is_search_engine_on' => 'false',
			'list_data' => '{
								"1": {
									"style": "2",
									"category_name": ""
								}
							
							}'
		), $atts );

		$list_array = json_decode($atts['list_data'], true);
		$is_search_engine_on = ($atts['is_search_engine_on']);

		$user = wp_get_current_user();
		$allowed_roles = array('library_manager', 'administrator');

		//Always load frontEnd and it will be behave differently according to if user logged in, is admin/library_manager
		wp_enqueue_script( 'cll-frontEnd',CLL_PLUGIN_DIR.'assets/js/frontEnd.js');

		if(!is_user_logged_in()){
			wp_localize_script('cll-frontEnd', 'is_user_logged_in', array("false"));
		}
		if(is_user_logged_in()){
			wp_localize_script('cll-frontEnd', 'is_user_logged_in', array("true"));
		}
		if(array_intersect($allowed_roles, $user->roles )){
			wp_localize_script('cll-frontEnd', 'is_user_admin', array("true"));
		}


		/* Is this weird? when I localize the non-global variable "is_search_engine_on",
		it is over written if there are multiple shortcodes on one page, so I use a global 
		variable instead that becomes true if there is are any shortcodes on the page that sets
		"cll-searchEngineValue" to "true"  */
		if($is_search_engine_on === "true"){
			$GLOBALS['cll-searchEngineValue'] = "true";
			wp_localize_script('cll-frontEnd', 'is_search_engine_on', array("true"));
		}

		$style_array = json_decode($atts["style"], true);
		//wp_localize_script("cll-list-style$style_array["1"];

		wp_localize_script('cll-frontEnd', 'list_style', array($style_array["1"]));

		$GLOBALS["atts_counter"]+=1;
		wp_localize_script('cll-frontEnd', 'atts_'.$GLOBALS["atts_counter"], array($atts['list_data']));

		
		if(is_page()){
			wp_localize_script('cll-frontEnd', 'current_page_id', array( get_queried_object_id() ));
			wp_localize_script('cll-frontEnd', 'current_screen_type', array("page"));
		}
		else if(is_single()){
			wp_localize_script('cll-frontEnd', 'current_post_id', array( get_queried_object_id() ));
			wp_localize_script('cll-frontEnd', 'current_screen_type', array("post"));
		}

		wp_localize_script('cll-frontEnd','magicalData',array(
			'nonce' => wp_create_nonce('wp_rest'),
		));

		wp_localize_script('cll-frontEnd', 'cllUserId', array(get_current_user_id()));

		if(current_user_can("manage_options")){
			wp_localize_script('cll-frontEnd', 'cllIsAdmin', array("true"));
		}
		else{
			wp_localize_script('cll-frontEnd', 'cllIsAdmin', array("false"));
		}
		//}
		?>
 		<?php if (!defined("REST_REQUEST")) { ?>
		<div class = "cll-link-lists">
			<?php
				$GLOBALS["cll_shortcode_id"]+=1;
				foreach ($list_array as $key => $list_data){

		
						$final_category_data = $this->shortcode_master_category_input_handler($list_data['category_name']);
						wp_localize_script("cll-frontEnd", 'final_category_id_'.$GLOBALS["cll_shortcode_id"].'_'.$key, array($final_category_data['final_category_id']));

						wp_localize_script("cll-frontEnd", 'final_category_data_'.$GLOBALS["cll_shortcode_id"].'_'.$key, array($final_category_data));

						$list_category_query_args = $this->generate_list_category_query($final_category_data);

						echo ( $this->load_list_style_template($list_data['style'], $final_category_data, $list_category_query_args) );
				};
			?>
		</div>
		<?php } ?>
		<?php

		return '<div class="link-list-container"> </div>';
	}



	public function cll_main_plugin_page(){
		echo "Coming Soon, for now here are basic instructions:";
		?> 
		<h1>Welcome to Crowd Curation Link Library</h1>

		<h2> Links </h2>
		<p>Links are the foundation of what we do here. However, to get started you'll be placing a shortcode onto the page of your choice.</p>
		<p>The shortcodes is: <strong>[cll_list]</strong> </p>
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

	public function cll_pending_manager_page(){
		require_once (CCLL_SERVER_DIR . '/templates/cll-link-manager-page.php');
	}

	public function load_link_manager_css_and_js($hook){
	   if($hook != 'crowd-curation-link-library_page_cll_pending_manager_page')
	   {
			   return;
	   }
	   wp_enqueue_style( 'cll-list-manager-page',CLL_PLUGIN_DIR.'assets/css/cll-link-manager-page.css');
	   wp_enqueue_script( 'cll-backEndAdminManager',CLL_PLUGIN_DIR.'assets/js/backEndAdminManager.js');

	   //Deliver necessary information to Javascript for React Rendering
	   $wp_config_path = $_SERVER['DOCUMENT_ROOT'] . '/wp-config.php';
	   require_once($wp_config_path);
	   global $wpdb;
	   $table_name = $wpdb->prefix .'cll_pending_links_data';
	   $table_name;
	   $retrieve_data = $wpdb->get_results( "SELECT * FROM $table_name" );
	   wp_localize_script('cll-backEndAdminManager', 'link_table_data',array($retrieve_data));

	   $table_name2 = $wpdb->prefix .'cll_pending_list_data';
	   $table_name2;
	   // this will get the data from your table
	   $retrieved_list_data = $wpdb->get_results( "SELECT * FROM $table_name2" );
	   wp_localize_script('cll-backEndAdminManager', 'list_table_data',array($retrieved_list_data));
	   

		wp_localize_script('cll-backEndAdminManager','magicalData',array(
			'nonce' => wp_create_nonce('wp_rest')
		));
	
	
	}
	public function cll_create_menu(){ 
		$cllLinkManagerMenu = add_menu_page( 'Crowd Curation Link Library Plugin Page',
											'Crowd Curation Link Library',
											'edit_others_posts',
											'cll_main_menu',
											array($this, 'cll_main_plugin_page'),
											'',
											'3');
	  
		  //Params = $parent_slug, $page_title, $menu_title, $capability, $menu_slug, $function = ''
		$cllLinkManagerMainSubMenu = add_submenu_page( 'cll_main_menu', 'Pending Link/List Manager Page',
		'Pending Link/List Manager', 'edit_others_posts', 'cll_pending_manager_page',
		array($this, 'cll_pending_manager_page') );
	
	}

	public function add_library_manager_role() {
		add_role( 'library_manager',
				'Library Manager',
				array( 'read' => true,
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
	
	public function cll_remove_menu_pages() {

		//if the user is library_manager then remove these items
		$user = wp_get_current_user();
		$allowed_roles = array('library_manager');
		if( array_intersect($allowed_roles, $user->roles ) ) {
			remove_menu_page( 'index.php' );
			remove_menu_page( 'edit-comments.php' );
			remove_menu_page( 'edit.php' );
			remove_menu_page( 'profile.php' );
			remove_menu_page( 'tools.php' );
		}
	}

	public function create_link_taxonomies() {
		// Add new taxonomy, make it hierarchical (like categories)
		$labels = array(
			'name'              => _x( 'Link Category', 'taxonomy general name', 'textdomain' ),
			'singular_name'     => _x( 'Link Category', 'taxonomy singular name', 'textdomain' ),
			'search_items'      => __( 'Search Link Categories', 'textdomain' ),
			'all_items'         => __( 'All Link Categories', 'textdomain' ),
			'parent_item'       => __( 'Parent Category', 'textdomain' ),
			'parent_item_colon' => __( 'Parent Category:', 'textdomain' ),
			'edit_item'         => __( 'Edit Category', 'textdomain' ),
			'update_item'       => __( 'Update Category', 'textdomain' ),
			'add_new_item'      => __( 'Add New Category', 'textdomain' ),
			'new_item_name'     => __( 'New Category Name', 'textdomain' ),
			'menu_name'         => __( 'Link Category', 'textdomain' ),
		);
	
		$args = array(
			'hierarchical'      => true,
			'labels'            => $labels,
			'show_ui'           => true,
			'show_in_rest'      => true,
			//'rest_base'         => 'link_category',
			'show_admin_column' => true,
			'query_var'         => true,
			'rewrite'           => array( 'slug' => 'link_category' ),
		);
	
		register_taxonomy( 'link_category', array( 'cll_link' ), $args );
	}

	public function cll_create_default_category(){
		$catarr = array(
			'cat_ID' => 0,
			'cat_name' => "uncategorized link",
			'category_description' => "This is the default category for uncategorized links",
			'category_nicename' => "uncategorized link",
			'category_parent' => "",
			'taxonomy' => 'link_category' );
		wp_insert_category( $catarr );
	}

	public function cll_activate() {


		$this->cll_create_default_category();
	
		$this->add_library_manager_role();
	
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
		 list_page_origin text NOT NULL,
		 screen_type text NOT NULL,
		 shortcode_source_id mediumint(9) NOT NULL,
		   PRIMARY KEY  (pending_list_id)
		  ) $charset_collate2;";
	
		require_once( ABSPATH . 'wp-admin/includes/upgrade.php' );
		//execute the query creating our table
		dbDelta( $sql2 );
	
		$cll_link_manager_db_version = '1.0';
	
		 add_option( 'cll_link_manager_db_version', $cll_link_manager_db_version ); 
	
		flush_rewrite_rules();
	}

	public function cll_deactivate() {

		if( get_role('library_manager') ){
			remove_role( 'library_manager' );
		}
	
		global $wpdb;
		$table_name = $wpdb->prefix .'cll_pending_links_data';
		$sql = "DROP TABLE IF EXISTS ".$table_name;
		$wpdb->query($sql);
		delete_option("cll_link_manager_db_version");
	
		global $wpdb;
		$table_name = $wpdb->prefix .'cll_pending_list_data';
		$sql = "DROP TABLE IF EXISTS ".$table_name;
		$wpdb->query($sql);
		delete_option("cll_link_manager_db_version");
	}

	public function show_submitted_by($data){
		return get_userdata($data['id'])->data->user_login;
	}

	public function vote_against_link($data){

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

	public function get_link_category_by_id($data){

		//$data['id'];

		$cll_category = get_term_by('id', (int)$data['id'], 'link_category');


		return $cll_category;
	}

	public function create_new_link_category($data){
	
		$category_name = str_replace('%20', ' ', $data['category_name']);
		$category_nicename = strtolower($category_name);
	
		$catarr = array(
			'slug' => $category_name_slug);
	
		//wp_insert_term($category_name, 'link_category', $catarr );
	
		return wp_insert_term($category_name, 'link_category', $catarr );
	}

	
	public function handle_list_request($data){
		$list_data = json_decode($data->get_body(), true);

		$wp_config_path = $_SERVER['DOCUMENT_ROOT'] . '/wp-config.php';
		//echo $_SERVER['DOCUMENT_ROOT'] . 'wp-config.php';
		require_once($wp_config_path);
		global $wpdb;
		$table_name = $wpdb->prefix .'cll_pending_list_data';
		//echo $table_name;

		return $wpdb->insert( 
			$table_name, 
			array( 
				//'time' => current_time( 'mysql' ), 
				'common_user_id' => $list_data['commonUserId'], 
				'list_category' => $list_data['pendingListData']['list_category'],
				'list_page_origin' => $list_data['pendingListData']['list_page_orgin'],
				'screen_type' => $list_data['pendingListData']['screen_type'],
				'shortcode_source_id' => $list_data['pendingListData']['shortcode_source_id']
			));
	}

		
	public function handle_list_declined_request($data){

		$list_data = json_decode($data->get_body(), true);

		global $wpdb;
		$table_name = $wpdb->prefix .'cll_pending_list_data';
	
		$wpdb_response = $wpdb->delete($table_name, 
			array( 'pending_list_id' => $list_data['listId'],
				 )
			);
		//echo $wpdb_response;

		return $wpdb_response;

	}
	

	public function handle_link_request($data){
		$link_data = json_decode($data->get_body(), true);

		$wp_config_path = $_SERVER['DOCUMENT_ROOT'] . '/wp-config.php';
		//echo $_SERVER['DOCUMENT_ROOT'] . 'wp-config.php';
		require_once($wp_config_path);
		global $wpdb;
		$table_name = $wpdb->prefix .'cll_pending_links_data';

		return $wpdb->insert( 
				$table_name, 
				array( 
					//'time' => current_time( 'mysql' ), 
					'common_user_id' => $link_data['commonUserId'],
					'link_title' => $link_data['newLinkItemData']['title'], 
					'link_url' => $link_data['newLinkItemData']['content'],
					'link_status' => $link_data['newLinkItemData']['status'],
					'link_categories' => $link_data['newLinkItemData']['categories'][0]
				));
	}

	public function handle_link_approved_request($data){
		$link_data = json_decode($data->get_body(), true);
		
		global $wpdb;
		$table_name = $wpdb->prefix .'cll_pending_links_data';
		$wpdb_response = $wpdb->delete($table_name, 
			array( 'pending_link_id' => $link_data['pendingLinkId']
				 )
			);
		
		return var_dump($wpdb_response);
	}


	
	
	 
	public function cll_register_link_post_type() {
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
						 'taxonomies' => array( 'link_category' ),
						 'rewrite' => array( 'slug' => 'link' ), 
						 'supports' => array( 'title', 'editor', 'thumbnail', 'custom-fields')
						 );
		 register_post_type( 'cll_link', $args );
		 
		 flush_rewrite_rules();
	 }

	 public function cll_register_all_meta(){
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
		register_meta('post', 'mention_record', [
			'object_subtype' => 'cll_link', // Limit to a post type.
			'type'           => 'string',
			'single'         => true,
			'show_in_rest'   => true,
		]);
	}





	

	
}