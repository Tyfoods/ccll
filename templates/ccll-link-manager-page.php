<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>Crowd Curation Link Manager Page</title>
  </head>
  <body>
  <h1 id="ccll-link-manager-page-title"> Crowd Curation Link Manager Page </h1>

	<div>
	  <h2 class = "pending-titles" style="text-align:center"> Pending Links</h2>
	  <table id="pending-link-data-table" style="width:100%">
	   <th class = "pending-link-data-table__table_header">Link Category</th>
	   <th class = "pending-link-data-table__table_header">User ID</th>
	   <th class = "pending-link-data-table__table_header">Link Title</th> 
	   <th class = "pending-link-data-table__table_header">Link URL</th>

	  <hr>

	  <?php
		require_once( ABSPATH . 'wp-config.php');
		global $wpdb;
		// this adds the prefix which is set by the user upon instillation of wordpress
		$table_name = $wpdb->prefix .'ccll_pending_links_data';
		$table_name;
		// this will get the data from your table
		$retrieve_data = $wpdb->get_results( "SELECT * FROM $table_name" );
		//wp_localize_script('ccll-backEndAdminManager', 'link_table_data',array($retrieve_data));
	  ?>

	  <?php $pending_link_id = 1 ?>
	  <?php foreach ($retrieve_data as $retrieved_data){ ?>
	  <tr class="pending-link-data-table__pending-link-data">
	  	<td id="<?php echo $pending_link_id ?>" class="pending-link-data__id"> <?php echo get_the_category_by_ID($retrieved_data->link_categories) ?> </td>
	    <td title="userId" ccllid="<?php echo $pending_link_id ?>" class="pending-link-data__user-id"> <?php echo $retrieved_data->common_user_id ?> </td>
	    <td title="linkTitle" ccllid="<?php echo $pending_link_id ?>" class="pending-link-data__link-title"> <?php echo $retrieved_data->link_title ?> </td>
	    <td title="content" ccllid="<?php echo $pending_link_id ?>" class="pending-link-data__content"> <?php echo $retrieved_data->link_url ?> </td>
	    <td style="display:none" title="linkId" ccllid="<?php echo $pending_link_id ?>" class="pending-link-data__linkId"> <?php echo $retrieved_data->pending_link_id ?> </td>

		<td style="display:none" title="category" ccllid="<?php echo $pending_link_id ?>" class="pending-link-data__category">
			<?php echo $retrieved_data->link_categories ?>
		</td>

	    <td> <button type="button" ccllid="<?php echo $pending_link_id ?>" class="pending-link-data__approve-btn">Approve</button> </td>
	    <td> <button type="button" ccllid="<?php echo $pending_link_id ?>" class="pending-link-data__decline-btn">Decline</button> </td>
	  </tr>
	  <?php $pending_link_id+=1 ?>
	  <?php } ?>

	 </div>

</table>

<?php

if(empty($retrieve_data)){
	?> <h4 class = "no-pending-link-items-text" style = "text-align: center"> There are no pending links! </h4> <?php ;
};

?>


<hr>


<div>
<h2 class = "pending-titles" style="text-align:center"> Pending Lists</h2>
<table id="pending-list-data-table" style="width:100%">
	   <th class = "pending-list-data-table__table_header">List Page Origin</th>
	   <th class = "pending-list-data-table__table_header">List ID</th>
	   <th class = "pending-list-data-table__table_header">User ID</th>
	   <th class = "pending-list-data-table__table_header">List Category</th> 

	<hr>

	<?php
		// this adds the prefix which is set by the user upon instillation of wordpress
		$table_name2 = $wpdb->prefix .'ccll_pending_list_data';
		$table_name2;
		// this will get the data from your table
		$retrieved_list_data = $wpdb->get_results( "SELECT * FROM $table_name2" );
	?>


	   <?php $pending_list_ccllid = 1 ?>
	  <?php foreach ($retrieved_list_data as $list_data){ ?>
	  <tr class="pending-link-data-table__pending-list-data">
	  	<td style="display: none" title="screen_type" ccllid="<?php echo $pending_list_ccllid ?>" class="pending-list-data__screen-type">
			<?php echo $list_data->screen_type ?>
		</td>
		<td style="display: none" title="shortcode_source_id" ccllid="<?php echo $pending_list_ccllid ?>" class="pending-list-data__shortcode-source-id">
			<?php echo $list_data->shortcode_source_id ?>
		</td>
	  	<td title="list_page_origin" ccllid="<?php echo $pending_list_ccllid ?>" class="pending-list-data__list-page-origin"> <?php echo $list_data->list_page_origin ?> </td>
	    <td title="listId" ccllid="<?php echo $pending_list_ccllid ?>" class="pending-list-data__list-id"> <?php echo $list_data->pending_list_id ?> </td>
	    <td title="userId" ccllid="<?php echo $pending_list_ccllid ?>" class="pending-list-data__user-id"> <?php echo $list_data->common_user_id ?> </td>
	    <td title="list_category" ccllid="<?php echo $pending_list_ccllid ?>" class="pending-list-data__list-category"> <?php echo $list_data->list_category ?> </td>
	    <td> <button type="button" ccllid="<?php echo $pending_list_ccllid ?>" class="pending-list-data__approve-btn">Approve</button> </td>
	    <td> <button type="button" ccllid="<?php echo $pending_list_ccllid ?>" class="pending-list-data__decline-btn">Decline</button> </td>
	  </tr>
	  <?php $pending_list_ccllid+=1 ?>
	  <?php } ?>
	  
</table>


<?php

if(empty($retrieved_list_data)){
	?> <h4 class = "no-pending-list-items-text" style = "text-align: center"> There are no pending lists! </h4> <?php ;
};

?>

</div>

  </body>
</html>