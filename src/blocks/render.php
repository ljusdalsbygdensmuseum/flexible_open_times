<?php

/**
 * @see https://github.com/WordPress/gutenberg/blob/trunk/docs/reference-guides/block-api/block-metadata.md#render
 */
$assets = include plugin_dir_path(__DIR__) . 'block_frontend.asset.php';
wp_enqueue_script('foh-frontend', plugin_dir_url(__DIR__) . 'block_frontend.js', $assets['dependencies'], $assets['version'], true)
?>
<div <?php echo get_block_wrapper_attributes(); ?>>

</div>