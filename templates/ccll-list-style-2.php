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

<div  class = "ccll-link-list ccll-link-list--style-2">
	<h2 class = 'ccll-link-list__list-title'>Category: <?php  echo $final_category_data['final_category'] ?></h2>
	<ul class = 'ccll-link-list__link-list--style-2'>

		<?php if ( $link_list_query->have_posts() ) : while ( $link_list_query->have_posts() ) : $link_list_query->the_post(); ?>

		<li class="link-list--style-2__link-list-item">
			<a class = "link-list-item__link-list-title" href="<?php echo get_post_meta(get_the_id(), 'URL')[0]; ?>">
				<h2><?php the_title(); ?></h2>
			</a>
		</li>

		<?php endwhile; else: ?> <!--<p class="link-list--style-2__no-links-text">Sorry, there are no links to display</p>--> <?php endif; ?>
		<li class="link-list--style-2__link-list-item">
			<a class = "link-list-item__link-list-anchor" href="#">
				<h3 class = "link-list-item__link-list-title">Test Title sdglshdfskdhjfgklsjdfhgskdghskdjfhglkjh</h3>
				<img src="https://wordpress-170702-826059.cloudwaysapps.com/wp-content/plugins/curation-link-library/assets/images/test-image.png" class = "ccll-link-thumbnail"/>
				<div class = "link-stats-container">
					<div class = "vote-buttons">
						<button class = "up-vote-button"></button>
						<button class = "neutral-vote-button"></button>
						<button class = "down-vote-button"></button>
					</div>
					<div class = "submitted-by-container">
						<p class="submitted-by">Submitted By: sdjkdfgklsjdfgklsgksjdfglksjdflhkj</p>
					</div>
				</div>
			</a>
		</li>


	</ul>
 </div>


<?php
$current_page_id = get_queried_object_id();
?>





 


