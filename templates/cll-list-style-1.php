



<?php
/**
* Another thing worth noting is the use of the esc_html_e function. You should always ensure to escape your output like this. If you expect your output to contain HTML, you should use the wp_kses instead.
*
 * link list style 1 template.
 *
 * Available variables:
 *
 * 
 *
 */
?>

 <?php if (! defined("REST_REQUEST")) { ?>

<div class = "cll_link_list">
	<h4 class = 'list_title'>Category: <?php  echo $atts['category_name']; ?></h4>
	<ul class = 'link-list-style-1'>

	<?php //echo (get_site_url()).'/'.str_replace(' ', '-', (get_the_title())); ?>
	

		<?php $list_item_incrementer = 0; ?>
		<?php if ( $link_list_query->have_posts() ) : while ( $link_list_query->have_posts() ) : $link_list_query->the_post(); ?>

		<li class="link-list-item"> <a class = "link-list-title" href="<?php echo get_post_meta(get_the_id(), 'URL')[0]; ?>"> <?php the_title(); ?> </a></li>
		<?php $list_item_incrementer+=1; ?>


		<?php endwhile; else: ?> <p>Sorry, there are no links to display</p> <?php endif; ?>

		<!-- <li class = "add_to_list_btn">Add To List! +</li> -->

	</ul>
 </div>


<?php
$current_page_id = get_queried_object_id();
?>


<?php } ?>



 


