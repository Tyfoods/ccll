<?php

/*

cll post types & taxonomies.


*/

class cll_post_types {
	public static function init(){
		add_action( 'init', 'cll_register_link_list_post_type' ); //Always register post type on INIT
		add_action( 'init', 'cll_register_link_post_type');
		//FLUSH REWRITERULES IN ACTIVATION HOOK! (After you register post type you must flush!)
	}
	public 	static function cll_register_link_list_post_type() {
		$labels = array(
					'name' => 'Link Lists',
					'singular_name' => 'Link List',
					'add_new' => 'Add New Link List',
					'add_new_item' => 'Add New Link List',
					'edit_item' => 'Edit Link List',
					'new_item' => 'New Link List',
					'all_items' => 'All Link Lists',
					'view_item' => 'View Link List',
					'search_items' => 'Search Link Lists',
					'not_found' => 'No link lists found',
					'not_found_in_trash' => 'No link lists found in Trash',
					'menu_name' => 'Link Lists'
					);
 		$args = array(
					 'public' => true,
					 'has_archive' => true,
					 'labels' => $labels,
					 'taxonomies' => array( 'category' ),
					 'rewrite' => array( 'slug' => 'link-list' ), 
					 'supports' => array( 'title', 'editor', 'author', 'thumbnail', 'comments' )
					 );
 	register_post_type( 'cll_link_list', $args );

 	public 	static function cll_register_link_post_type() {
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
					 'has_archive' => true,
					 'labels' => $labels,
					 'taxonomies' => array( 'category' ),
					 'rewrite' => array( 'slug' => 'link' ), 
					 'supports' => array( 'title', 'editor', 'author', 'thumbnail', 'comments' )
					 );
 	register_post_type( 'cll_link', $args );

}

