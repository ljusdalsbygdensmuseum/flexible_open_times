<?php

/*
    Plugin Name: Flexible Open Hours
    Description: Easily change open times on the fly.
    Version: 0.0.1
    Author: ina
*/

if (! defined('ABSPATH')) exit; // Exit if accessed directly

class FlexibleOpenHours
{
    function __construct()
    {
        //Menu page
        add_action('admin_menu', array($this, 'main_page'));

        //Admin enqueue
        add_action('admin_enqueue_scripts', array($this, 'enqueue_post_editor'));

        //Settings
        add_action('admin_init', array($this, 'settings'));

        //Post type
        add_action('init', array($this, 'init_post_type'));

        //Meta boxes
        add_action('add_meta_boxes', array($this, 'init_meta_boxes'));
        add_action('save_post_foh-extra-hours', array($this, 'save_fohextrahours_meta_values'));

        add_action('save_post_foh-temporary-hours', array($this, 'save_fohtemporaryhours_meta_values'));

        //Rest API
        add_action('rest_api_init', array($this, 'custom_rest_api'));
    }

    //Page
    function main_page()
    {
        $menuPage = add_menu_page('Open Hours', 'Open Hours', 'edit_pages', 'open-hours', array($this, 'main_page_html'), 'dashicons-clock', 4);

        add_action('load-' . $menuPage, array($this, 'load_main_page'));

        //Rename the submenu page 
        add_submenu_page('open-hours', 'Open Hours', 'Normal hours', 'edit_pages', 'open-hours');

        //Submenu pages for custom post type
        add_submenu_page('open-hours', 'Extra hours', 'Extra hours', 'edit_pages', 'edit.php?post_type=foh-extra-hours');
        add_submenu_page('open-hours', 'Temporary hours', 'Temporary hours', 'edit_pages', 'edit.php?post_type=foh-temporary-hours');
    }

    function main_page_html()
    {
?>
        <div class="wrap">
            <h1>Normal Open Hours</h1>
            <form action="options.php" method="POST">
                <?php
                settings_errors();
                settings_fields('normal_open_hours');
                do_settings_sections('open-hours');
                submit_button();
                ?>
            </form>
        </div>
    <?php
    }

    function load_main_page()
    {
        add_action('admin_enqueue_scripts', array($this, 'enqueue_settings'));
    }

    //Enqueue
    function enqueue_settings()
    {
        //Grab dependencies
        $assets = include plugin_dir_path(__FILE__) . 'build/settings.asset.php';

        //Enqueue scripts
        wp_enqueue_script('foh-settings-js', plugin_dir_url(__FILE__) . 'build/settings.js', $assets['dependencies'], $assets['version'], true);

        //Enqueue styles
        wp_enqueue_style('wp-components');
    }

    function enqueue_post_editor($hook)
    {
        //Return if not in editor
        if ($hook != 'post.php' && $hook != 'post-new.php') {
            return;
        }
        if (get_post_type() == 'foh-extra-hours') {
            //Grab dependencies
            $assets = include plugin_dir_path(__FILE__) . 'build/extra_open.asset.php';

            //Enqueue scripts
            wp_enqueue_script('foh-extra-open-js', plugin_dir_url(__FILE__) . 'build/extra_open.js', $assets['dependencies'], $assets['version'], true);

            //Enqueue styles
            wp_enqueue_style('wp-components');
        }
        if (get_post_type() == 'foh-temporary-hours') {
            //Grab dependencies
            $assets = include plugin_dir_path(__FILE__) . 'build/temporary.asset.php';

            //Enqueue scripts
            wp_enqueue_script('foh-temporary-open-js', plugin_dir_url(__FILE__) . 'build/temporary.js', $assets['dependencies'], $assets['version'], true);

            //Enqueue styles
            wp_enqueue_style('wp-components');
        }
    }

    //Settings
    function settings()
    {
        register_setting('normal_open_hours', 'foh_normal_open_hours', array(
            'sanitize_callback' => 'sanitize_text_field',
            'show_in_rest'  => TRUE,
            'default' => '[ { dayInt: 0, title: "Monday", hours: [] }, { dayInt: 1, title: "Tuseday", hours: [] }, { dayInt: 2, title: "Wednesday", hours: [] }, { dayInt: 3, title: "Thursday", hours: [] }, { dayInt: 4, title: "Friday", hours: [] }, { dayInt: 5, title: "Saturday", hours: [] }, { dayInt: 6, title: "Sunday", hours: [] },]'
        ));

        add_settings_section('normal_open_hours', null, array($this, 'open_hours_settings_html'), 'open-hours');

        add_settings_field('foh_normal_open_hours', null, array($this, 'settings_field_html'), 'open-hours', 'normal_open_hours');
    }

    //Div to display full week
    function open_hours_settings_html()
    {
    ?>
        <div id="foh_normal_open_hours-input"></div>
    <?php
    }

    //Field to save the data in
    function settings_field_html()
    {
    ?>
        <input id="foh_normal_open_hours" name="foh_normal_open_hours" type="text" value='<?php echo esc_html(get_option('foh_normal_open_hours')) ?>'>
    <?php
    }

    //Post types
    function init_post_type()
    {
        $extra_hours_args = array(
            'public' => TRUE,
            'supports' => array('title'),
            'show_in_menu' => FALSE,
            'labels' => array(
                'name' => 'Extra hours',
            )
        );
        register_post_type('foh-extra-hours', $extra_hours_args);

        $temporary_hours_args = array(
            'public' => TRUE,
            'supports' => array('title'),
            'show_in_menu' => FALSE,
            'labels' => array(
                'name' => 'Temporary hours',
            )
        );
        register_post_type('foh-temporary-hours', $temporary_hours_args);

        register_block_type(__DIR__ . '/build/blocks');
    }

    //Meta box
    function init_meta_boxes()
    {
        //Extra hours
        add_meta_box('foh-extra-hours-meta', 'Extra hours', array($this, 'callback_content_meta_box'), 'foh-extra-hours', 'advanced', 'high');
        add_meta_box('foh-extra-hours-message-meta', 'Message', array($this, 'callback_content_message_meta_box'), 'foh-extra-hours', 'advanced', 'high');

        //Temporary hours
        add_meta_box('foh-temporary-hours-meta', 'Temporary hours', array($this, 'callback_content_temporary_hours_meta_box'), 'foh-temporary-hours', 'advanced', 'high');
    }

    //Meta box content
    function callback_content_meta_box($post)
    {
        wp_nonce_field('save_fohextrahours_meta_values', 'foh-extra-hours_wpnonce');

        $dates = esc_attr(get_post_meta($post->ID, 'foh-extra-hours_dates', true));
        $minDate = (int) esc_attr(get_post_meta($post->ID, 'foh-extra-hours_min_date', true));
        $maxDate = (int) esc_attr(get_post_meta($post->ID, 'foh-extra-hours_max_date', true));
        $hours = esc_attr(get_post_meta($post->ID, 'foh-extra-hours_hours', true));

    ?>
        <div id="foh-extra-hours_container">
        </div>
        <input type="text" id="foh-extra-hours_dates_field" name="foh-extra-hours_dates_field" value="<?php echo $dates ?>" style="display:block;">
        <input type="number" id="foh-extra-hours_min_date_field" name="foh-extra-hours_min_date_field" value="<?php echo $minDate ?>" style="display:block;">
        <input type="number" id="foh-extra-hours_max_date_field" name="foh-extra-hours_max_date_field" value="<?php echo $maxDate ?>" style="display:block;">
        <input type="text" id="foh-extra-hours_hours_field" name="foh-extra-hours_hours_field" value="<?php echo $hours ?>" style="display:block;">
    <?php
    }

    function callback_content_message_meta_box($post)
    {
        wp_nonce_field('save_fohextrahours_meta_values', 'foh-message_wpnonce');

        $value = esc_textarea(get_post_meta($post->ID, 'foh-message', true));

    ?>
        <textarea id="foh-message_field" name="foh-message_field"><?php echo $value ?></textarea>
    <?php
    }

    function callback_content_temporary_hours_meta_box($post)
    {
        wp_nonce_field('save_fohtemporaryhours_meta_values', 'foh-temporary-hours_wpnonce');

        $minDate = (int) esc_attr(get_post_meta($post->ID, 'foh-temporary-hours_min_date', true));
        $maxDate = (int) esc_attr(get_post_meta($post->ID, 'foh-temporary-hours_max_date', true));
        $hours = esc_attr(get_post_meta($post->ID, 'foh-temporary-hours_hours', true));

    ?>
        <div id="foh-temporary-hours_container">
        </div>
        <input type="number" id="foh-temporary-hours_min_date_field" name="foh-temporary-hours_min_date_field" value="<?php echo $minDate ?>" style="display:block;">
        <input type="number" id="foh-temporary-hours_max_date_field" name="foh-temporary-hours_max_date_field" value="<?php echo $maxDate ?>" style="display:block;">
        <input type="text" id="foh-temporary-hours_hours_field" name="foh-temporary-hours_hours_field" value="<?php echo $hours ?>" style="display:block;">
<?php
    }

    //Save meta values
    function save_fohextrahours_meta_values($postID)
    {
        if (! isset($_POST['foh-extra-hours_wpnonce']) || ! isset($_POST['foh-message_wpnonce'])) {
            return;
        }
        if (! wp_verify_nonce($_POST['foh-extra-hours_wpnonce'], 'save_fohextrahours_meta_values') || ! wp_verify_nonce($_POST['foh-message_wpnonce'], 'save_fohextrahours_meta_values')) {
            return;
        }
        if (! current_user_can('edit_post', $postID)) {
            return;
        }
        if (! isset($_POST['foh-extra-hours_dates_field']) || ! isset($_POST['foh-extra-hours_min_date_field']) || ! isset($_POST['foh-extra-hours_max_date_field']) || ! isset($_POST['foh-extra-hours_hours_field']) || ! isset($_POST['foh-message_field'])) {
            return;
        }

        $dates = sanitize_text_field($_POST['foh-extra-hours_dates_field']);
        $minDate = (int) sanitize_text_field($_POST['foh-extra-hours_min_date_field']);
        $maxDate = (int) sanitize_text_field($_POST['foh-extra-hours_max_date_field']);
        $hours = sanitize_text_field($_POST['foh-extra-hours_hours_field']);
        $message = sanitize_text_field($_POST['foh-message_field']);

        update_post_meta($postID, 'foh-extra-hours_dates', $dates);
        update_post_meta($postID, 'foh-extra-hours_min_date', $minDate);
        update_post_meta($postID, 'foh-extra-hours_max_date', $maxDate);
        update_post_meta($postID, 'foh-extra-hours_hours', $hours);
        update_post_meta($postID, 'foh-message', $message);
    }

    function save_fohtemporaryhours_meta_values($postID)
    {
        if (! isset($_POST['foh-temporary-hours_wpnonce'])) {
            return;
        }
        if (! wp_verify_nonce($_POST['foh-temporary-hours_wpnonce'], 'save_fohtemporaryhours_meta_values')) {
            return;
        }
        if (! current_user_can('edit_post', $postID)) {
            return;
        }
        if (! isset($_POST['foh-temporary-hours_min_date_field']) || ! isset($_POST['foh-temporary-hours_max_date_field']) || ! isset($_POST['foh-temporary-hours_hours_field'])) {
            return;
        }

        $minDate = (int) sanitize_text_field($_POST['foh-temporary-hours_min_date_field']);
        $maxDate = (int) sanitize_text_field($_POST['foh-temporary-hours_max_date_field']);
        $hours = sanitize_text_field($_POST['foh-temporary-hours_hours_field']);

        update_post_meta($postID, 'foh-temporary-hours_min_date', $minDate);
        update_post_meta($postID, 'foh-temporary-hours_max_date', $maxDate);
        update_post_meta($postID, 'foh-temporary-hours_hours', $hours);
    }

    //Rest API
    function custom_rest_api()
    {
        register_rest_route('flexible_open_hours/v1', 'normal_hours', array(
            'methods' => WP_REST_Server::READABLE,
            'callback' => array($this, 'normal_hours_rest')
        ));
    }

    function normal_hours_rest()
    {
        $normalHours = get_option('foh_normal_open_hours');
        $returnValue = json_decode($normalHours);
        return $returnValue;
    }
}

$flexibleOpenHours = new FlexibleOpenHours();
