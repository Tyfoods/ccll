<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>Crowd Curation Link Manager Page</title>
  </head>
  <body>
  <h1 id="cll-link-manager-page-title"> Crowd Curation Link Manager Page </h1>

	<div>
	  <h2 class = "pending_titles" style="text-align:center"> Pending Links</h2>
	  <table id="pending-link-data-table" style="width:100%">
	   <th>Link Category</th>
	   <th>User ID</th>
	   <th>Link Title</th> 
	   <th>Link URL</th>

	  <hr>

	  <?php
		require_once( ABSPATH . 'wp-config.php');
		global $wpdb;
		// this adds the prefix which is set by the user upon instillation of wordpress
		$table_name = $wpdb->prefix .'cll_pending_links_data';
		$table_name;
		// this will get the data from your table
		$retrieve_data = $wpdb->get_results( "SELECT * FROM $table_name" );
	  ?>

	  <?php $pending_link_id = 1 ?>
	  <?php foreach ($retrieve_data as $retrieved_data){ ?>
	  <tr class="pending-link-data">
	  	<td id="<?php echo $pending_link_id ?>" class="pending-link-data"> <?php echo get_the_category_by_ID($retrieved_data->link_categories) ?> </td>
	    <td title="userId" cllid="<?php echo $pending_link_id ?>" class="pending-link-data"> <?php echo $retrieved_data->common_user_id ?> </td>
	    <td title="linkTitle" cllid="<?php echo $pending_link_id ?>" class="pending-link-data"> <?php echo $retrieved_data->link_title ?> </td>
	    <td title="content" cllid="<?php echo $pending_link_id ?>" class="pending-link-data"> <?php echo $retrieved_data->link_url ?> </td>
	    <td style="display:none" title="linkId" cllid="<?php echo $pending_link_id ?>" class="pending-link-data"> <?php echo $retrieved_data->pending_link_id ?> </td>
		<td style="display:none" title="category" cllid="<?php echo $pending_link_id ?>" class="pending-link-data"> <?php echo $retrieved_data->link_categories ?> </td>
	    <td> <button type="button" cllid="<?php echo $pending_link_id ?>" class="cllApproveBtn">Approve</button> </td>
	    <td> <button type="button" cllid="<?php echo $pending_link_id ?>" class="cllDeclineBtn">Decline</button> </td>
	  </tr>
	  <?php $pending_link_id+=1 ?>
	  <?php } ?>

	 </div>

</table>

<?php

if(empty($retrieve_data)){
	?> <h4 class = "no_pending_items" style = "text-align: center"> There are no pending links! </h4> <?php ;
};

?>


<hr>


<div>
<h2 class = "pending_titles" style="text-align:center"> Pending Lists</h2>
<table id="pending-list-data-table" style="width:100%">
	   <th>List Page Orgin</th>
	   <th>List ID</th>
	   <th>User ID</th>
	   <th>List Category</th> 

	<hr>

	<?php
		// this adds the prefix which is set by the user upon instillation of wordpress
		$table_name2 = $wpdb->prefix .'cll_pending_list_data';
		$table_name2;
		// this will get the data from your table
		$retrieved_list_data = $wpdb->get_results( "SELECT * FROM $table_name2" );
	?>


	   <?php $pending_list_cllid = 1 ?>
	  <?php foreach ($retrieved_list_data as $list_data){ ?>
	  <tr class="pending-list-data">
	  	<td title="list_page_orgin" cllid="<?php echo $pending_list_cllid ?>" class="pending-list-data"> <?php echo $list_data->list_page_orgin ?> </td>
	    <td title="listId" cllid="<?php echo $pending_list_cllid ?>" class="pending-list-data"> <?php echo $list_data->pending_list_id ?> </td>
	    <td title="userId" cllid="<?php echo $pending_list_cllid ?>" class="pending-list-data"> <?php echo $list_data->common_user_id ?> </td>
	    <td title="list_category" cllid="<?php echo $pending_list_cllid ?>" class="pending-list-data"> <?php echo $list_data->list_category ?> </td>
	    <td> <button type="button" cllid="<?php echo $pending_list_cllid ?>" class="cllListApproveBtn">Approve</button> </td>
	    <td> <button type="button" cllid="<?php echo $pending_list_cllid ?>" class="cllListDeclineBtn">Decline</button> </td>
	  </tr>
	  <?php $pending_list_cllid+=1 ?>
	  <?php } ?>
	  
</table>


<?php

if(empty($retrieved_list_data)){
	?> <h4 class = "no_pending_items" style = "text-align: center"> There are no pending lists! </h4> <?php ;
};

?>

</div>

  </body>
</html>