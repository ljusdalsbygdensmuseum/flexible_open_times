<?php

/*
    Plugin Name: Flexible Open Hours
    Description: Easily change open times on the fly.
    Version: 1.0.0
    Author: ina
    Text domain: foh-domain
    Domain Path: /languages
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

        //Post type and other init
        add_action('init', array($this, 'init_post_type'));

        //Post type description
        add_filter('views_edit-foh-extra-hours', array($this, 'post_type_description'));
        add_filter('views_edit-foh-temporary-hours', array($this, 'post_type_description'));

        //Meta boxes
        add_action('add_meta_boxes', array($this, 'init_meta_boxes'));
        add_action('save_post_foh-extra-hours', array($this, 'save_foh_extra_hours_meta'));

        add_action('save_post_foh-temporary-hours', array($this, 'save_foh_temporary_hours_meta_values'));

        //Rest API
        add_action('rest_api_init', array($this, 'custom_rest_api'));
    }

    //Page
    function main_page()
    {
        $menuPage = add_menu_page(__('Open Hours', 'foh-domain'), __('Open Hours', 'foh-domain'), 'edit_pages', 'open-hours', array($this, 'main_page_html'), 'dashicons-clock', 4);

        add_action('load-' . $menuPage, array($this, 'load_main_page'));

        //Rename the submenu page 
        add_submenu_page('open-hours', __('Open Hours', 'foh-domain'), __('Normal hours', 'foh-domain'), 'edit_pages', 'open-hours');

        //Submenu pages for custom post type
        add_submenu_page('open-hours', 'Extra hours', __('Extra hours', 'foh-domain'), 'edit_pages', 'edit.php?post_type=foh-extra-hours');
        add_submenu_page('open-hours', 'Temporary hours', __('Temporary hours', 'foh-domain'), 'edit_pages', 'edit.php?post_type=foh-temporary-hours');

        //Additional submenu page
        $settingsPage = add_submenu_page('open-hours', 'Settings', __('Settings', 'foh-domain'), 'edit_pages', 'open-hours-settings', array($this, 'settings_page_html'));

        add_action('load-' . $settingsPage, array($this, 'load_settings_page'));
    }

    function main_page_html()
    {
?>
        <div class="wrap">
            <h1><?php _e('Normal Open Hours', 'foh-domain'); ?></h1>
            <form action="options.php" method="POST">
                <?php
                settings_errors();
                settings_fields('foh_normal_open_hours_section');
                do_settings_sections('open-hours');
                submit_button();
                ?>
            </form>
        </div>
    <?php
    }

    function settings_page_html()
    {
    ?>
        <div class="wrap">
            <h1><?php _e('Open Hour Settings', 'foh-domain'); ?></h1>
            <form action="options.php" method="POST">
                <?php
                settings_errors();
                settings_fields('foh_open_hours_settings_section');
                do_settings_sections('open-hours-settings');
                submit_button();
                ?>
            </form>
        </div>
    <?php
    }

    function load_main_page()
    {
        add_action('admin_enqueue_scripts', array($this, 'enqueue_main_page'));
    }

    function load_settings_page()
    {
        add_action('admin_enqueue_scripts', array($this, 'enqueue_settings_page'));
    }

    //Enqueue
    function enqueue_main_page()
    {
        //Grab dependencies
        $assets = include plugin_dir_path(__FILE__) . 'build/main_page.asset.php';

        //Enqueue scripts
        wp_enqueue_script('foh-main-page-js', plugin_dir_url(__FILE__) . 'build/main_page.js', $assets['dependencies'], $assets['version'], true);

        //Enqueue styles
        wp_enqueue_style('wp-components');

        //Set translation
        wp_set_script_translations('foh-main-page-js', 'foh-domain', plugin_dir_path(__FILE__) . '/languages');
    }

    function enqueue_settings_page()
    {
        //Enqueue styles
        wp_enqueue_style('foh-settings-style', plugin_dir_url(__FILE__) . 'build/settings_page.css');

        //Set translation
        wp_set_script_translations('foh-settings-js', 'foh-domain', plugin_dir_path(__FILE__) . '/languages');
    }

    function enqueue_post_editor($hook)
    {
        //Return if not in editor
        if ($hook != 'post.php' && $hook != 'post-new.php') {
            return;
        }
        if (get_post_type() == 'foh-extra-hours') {
            //Grab dependencies
            $assets = include plugin_dir_path(__FILE__) . 'build/metabox_extra.asset.php';

            //Enqueue scripts
            wp_enqueue_script('foh-metabox-extra-js', plugin_dir_url(__FILE__) . 'build/metabox_extra.js', $assets['dependencies'], $assets['version'], true);

            //Enqueue styles
            wp_enqueue_style('wp-components');

            //Set translation
            wp_set_script_translations('foh-metabox-extra-js', 'foh-domain', plugin_dir_path(__FILE__) . '/languages');
        }
        if (get_post_type() == 'foh-temporary-hours') {
            //Grab dependencies
            $assets = include plugin_dir_path(__FILE__) . 'build/metabox_temporary.asset.php';

            //Enqueue scripts
            wp_enqueue_script('foh-metabox-temporary-js', plugin_dir_url(__FILE__) . 'build/metabox_temporary.js', $assets['dependencies'], $assets['version'], true);

            //Enqueue styles
            wp_enqueue_style('wp-components');

            //Set translation
            wp_set_script_translations('foh-metabox-temporary-js', 'foh-domain', plugin_dir_path(__FILE__) . '/languages');
        }
    }

    //Settings
    function settings()
    {
        register_setting('foh_normal_open_hours_section', 'foh_normal_open_hours', array(
            'sanitize_callback' => 'sanitize_text_field',
            'show_in_rest'  => TRUE,
            'default' => '[ [], [], [], [], [], [], [] ]'
        ));

        add_settings_section('foh_normal_open_hours_section', null, array($this, 'open_hours_normal_hours_section_html'), 'open-hours');

        add_settings_field('foh_normal_open_hours', null, array($this, 'open_hours_normal_hours_field_html'), 'open-hours', 'foh_normal_open_hours_section');

        register_setting('foh_open_hours_settings_section', 'foh_week_name_format', array(
            'sanitize_callback' => array($this, 'sanitize_integer'),
            'show_in_rest' => true,
            'default' => 0
        ));

        register_setting('foh_open_hours_settings_section', 'foh_week_name_format_extra', array(
            'sanitize_callback' => array($this, 'sanitize_integer'),
            'show_in_rest' => true,
            'default' => 0
        ));

        add_settings_section('foh_open_hours_week_name_settings_section', __('Week name format', 'foh-domain'), null, 'open-hours-settings');

        add_settings_field('foh_week_name_format', __('Normal Open Hours', 'foh-domain'), array($this, 'open_hours_week_name_format_settings_field_html'), 'open-hours-settings', 'foh_open_hours_week_name_settings_section');
        add_settings_field('foh_week_name_format_extra', __('Extra Open Hours', 'foh-domain'), array($this, 'open_hours_week_name_format_settings_extra_field_html'), 'open-hours-settings', 'foh_open_hours_week_name_settings_section');


        register_setting('foh_open_hours_settings_section', 'foh_hour_name_format', array(
            'sanitize_callback' => array($this, 'sanitize_integer'),
            'show_in_rest' => true,
            'default' => 0
        ));

        add_settings_section('foh_open_hours_hour_name_settings_section', __('Hours format', 'foh-domain'), null, 'open-hours-settings');

        add_settings_field('foh_hour_name_format', __('Hours', 'foh-domain'), array($this, 'open_hours_hour_name_format_settings_field_html'), 'open-hours-settings', 'foh_open_hours_hour_name_settings_section');
    }

    //Div to display full week
    function open_hours_normal_hours_section_html()
    {
    ?>
        <div id="foh_normal_open_hours-input"></div>
    <?php
    }

    //Field to save the data in
    function open_hours_normal_hours_field_html()
    {
    ?>
        <input id="foh_normal_open_hours" name="foh_normal_open_hours" type="text" value='<?php echo esc_html(get_option('foh_normal_open_hours')) ?>' style="display:none;">
    <?php
    }

    function open_hours_week_name_format_settings_field_html()
    {
    ?>
        <fieldset>
            <div>
                <input type="radio" id="week_day_format_0" name="foh_week_name_format" value="0" <?php if (esc_html(get_option('foh_week_name_format'))  == 0) echo 'checked="checked"' ?>>
                <label for="week_day_format_0"><?php _e('Full', 'foh-domain') ?></label>
                <code><?php _e('Monday', 'foh-domain') ?></code>
                <br>
                <input type="radio" id="week_day_format_1" name="foh_week_name_format" value="1" <?php if (esc_html(get_option('foh_week_name_format'))  == 1) echo 'checked="checked"' ?>>
                <label for="week_day_format_1"><?php _e('Half', 'foh-domain') ?></label>
                <code><?php _e('Mon', 'foh-domain') ?></code>
            </div>
        </fieldset>
    <?php
    }

    function open_hours_week_name_format_settings_extra_field_html()
    {
    ?>
        <fieldset>
            <div>
                <input type="radio" id="week_day_format_0" name="foh_week_name_format_extra" value="0" <?php if (esc_html(get_option('foh_week_name_format_extra'))  == 0) echo 'checked="checked"' ?>>
                <label for="week_day_format_0"><?php _e('Full', 'foh-domain') ?></label>
                <code><?php _e('Monday 15/11', 'foh-domain') ?></code>
                <br>
                <input type="radio" id="week_day_format_1" name="foh_week_name_format_extra" value="1" <?php if (esc_html(get_option('foh_week_name_format_extra'))  == 1) echo 'checked="checked"' ?>>
                <label for="week_day_format_1"><?php _e('Definite form', 'foh-domain') ?></label>
                <code><?php _e('Monday the 15/11', 'foh-domain') ?></code>
                <br>
                <input type="radio" id="week_day_format_2" name="foh_week_name_format_extra" value="2" <?php if (esc_html(get_option('foh_week_name_format_extra'))  == 2) echo 'checked="checked"' ?>>
                <label for="week_day_format_2"><?php _e('Half', 'foh-domain') ?></label>
                <code><?php _e('Mon 15/11', 'foh-domain') ?></code>
                <br>
                <input type="radio" id="week_day_format_3" name="foh_week_name_format_extra" value="3" <?php if (esc_html(get_option('foh_week_name_format_extra'))  == 3) echo 'checked="checked"' ?>>
                <label for="week_day_format_3"><?php _e('None', 'foh-domain') ?></label>
                <code><?php _e('15/11', 'foh-domain') ?></code>
            </div>
        </fieldset>
    <?php
    }

    function open_hours_hour_name_format_settings_field_html()
    {
    ?>
        <fieldset>
            <div>
                <input type="radio" id="hours_format_0" name="foh_hour_name_format" value="0" <?php if (esc_html(get_option('foh_hour_name_format'))  == 0) echo 'checked="checked"' ?>>
                <label for="hours_format_0"><?php _e('Full', 'foh-domain') ?></label>
                <code>12:00 - 15:00, 16:00 - 18:30</code>
                <br>
                <input type="radio" id="hours_format_1" name="foh_hour_name_format" value="1" <?php if (esc_html(get_option('foh_hour_name_format'))  == 1) echo 'checked="checked"' ?>>
                <label for="hours_format_1"><?php _e('Half', 'foh-domain') ?></label>
                <code>12 - 15, 16 - 18:30</code>
            </div>
        </fieldset>
    <?php
    }

    //Post types
    function init_post_type()
    {
        load_plugin_textdomain('foh-domain', false, dirname(plugin_basename(__FILE__)) . '/languages');

        $extra_hours_args = array(
            'public' => TRUE,
            'supports' => array('title'),
            'show_in_menu' => FALSE,
            'labels' => array(
                'name' => __('Extra hours', 'foh-domain'),
            ),
            'description' => __('For induvidual dates or events, example: a seminar at night or closed on christmas day.', 'foh-domain')
        );
        register_post_type('foh-extra-hours', $extra_hours_args);

        $temporary_hours_args = array(
            'public' => TRUE,
            'supports' => array('title'),
            'show_in_menu' => FALSE,
            'labels' => array(
                'name' => __('Temporary hours', 'foh-domain'),
            ),
            'description' => __('For longer periods of time, example: summer open hours or a month closed for renovations.', 'foh-domain')
        );
        register_post_type('foh-temporary-hours', $temporary_hours_args);

        register_block_type(__DIR__ . '/build/blocks');
    }

    //Post type description
    function post_type_description($views)
    {
        $screen = get_current_screen();
        $post_type = get_post_type_object($screen->post_type);

        if ($post_type->description) {
            printf('<p>%s</p>', esc_html($post_type->description));
        }
        return $views;
    }

    //Meta box
    function init_meta_boxes()
    {
        //Extra hours
        add_meta_box('foh-extra-hours-hours-meta', __('Extra hours', 'foh-domain'), array($this, 'foh_extra_hours_hours_meta_content'), 'foh-extra-hours', 'advanced', 'high');
        add_meta_box('foh-extra-hours-message-meta', __('Message', 'foh-domain'), array($this, 'foh_extra_hours_message_meta_content'), 'foh-extra-hours', 'advanced', 'high');

        //Temporary hours
        add_meta_box('foh-temporary-hours-meta', __('Temporary hours', 'foh-domain'), array($this, 'foh_temporary_hours_hours_meta_content'), 'foh-temporary-hours', 'advanced', 'high');
    }

    //Meta box content
    function foh_extra_hours_hours_meta_content($post)
    {
        wp_nonce_field('save_foh_extra_hours_meta', 'foh-extra-hours_hours_wpnonce');

        $dates = esc_attr(get_post_meta($post->ID, 'foh-extra-hours_hours_dates', true));
        $minDate = (int) esc_attr(get_post_meta($post->ID, 'foh-extra-hours_hours_min_date', true));
        $maxDate = (int) esc_attr(get_post_meta($post->ID, 'foh-extra-hours_hours_max_date', true));
        $hours = esc_attr(get_post_meta($post->ID, 'foh-extra-hours_hours', true));

    ?>
        <div id="foh-extra-hours_container">
        </div>
        <input type="text" id="foh-extra-hours_hours_dates_field" name="foh-extra-hours_hours_dates_field" value="<?php echo $dates ?>" style="display:none;">
        <input type="number" id="foh-extra-hours_hours_min_date_field" name="foh-extra-hours_hours_min_date_field" value="<?php echo $minDate ?>" style="display:none;">
        <input type="number" id="foh-extra-hours_hours_max_date_field" name="foh-extra-hours_hours_max_date_field" value="<?php echo $maxDate ?>" style="display:none;">
        <input type="text" id="foh-extra-hours_hours_field" name="foh-extra-hours_hours_field" value="<?php echo $hours ?>" style="display:none;">
    <?php
    }

    function foh_extra_hours_message_meta_content($post)
    {
        wp_nonce_field('save_foh_extra_hours_meta', 'foh-extra-hours_message_wpnonce');

        $value = esc_textarea(get_post_meta($post->ID, 'foh-extra-hours_message', true));

    ?>
        <textarea id="foh-extra-hours_message_field" name="foh-extra-hours_message_field"><?php echo $value ?></textarea>
    <?php
    }

    function foh_temporary_hours_hours_meta_content($post)
    {
        wp_nonce_field('save_foh_temporary_hours_meta_values', 'foh-temporary-hours_hours_wpnonce');

        $minDate = (int) esc_attr(get_post_meta($post->ID, 'foh-temporary-hours_hours_min_date', true));
        $maxDate = (int) esc_attr(get_post_meta($post->ID, 'foh-temporary-hours_hours_max_date', true));
        $hours = esc_attr(get_post_meta($post->ID, 'foh-temporary-hours_hours', true));

    ?>
        <div id="foh-temporary-hours_container">
        </div>
        <input type="number" id="foh-temporary-hours_hours_min_date_field" name="foh-temporary-hours_hours_min_date_field" value="<?php echo $minDate ?>" style="display:none;">
        <input type="number" id="foh-temporary-hours_hours_max_date_field" name="foh-temporary-hours_hours_max_date_field" value="<?php echo $maxDate ?>" style="display:none;">
        <input type="text" id="foh-temporary-hours_hours_field" name="foh-temporary-hours_hours_field" value="<?php echo $hours ?>" style="display:none;">
<?php
    }

    //Save meta values
    function save_foh_extra_hours_meta($postID)
    {
        if (! isset($_POST['foh-extra-hours_hours_wpnonce']) || ! isset($_POST['foh-extra-hours_message_wpnonce'])) {
            return;
        }
        if (! wp_verify_nonce($_POST['foh-extra-hours_hours_wpnonce'], 'save_foh_extra_hours_meta') || ! wp_verify_nonce($_POST['foh-extra-hours_message_wpnonce'], 'save_foh_extra_hours_meta')) {
            return;
        }
        if (! current_user_can('edit_post', $postID)) {
            return;
        }
        if (! isset($_POST['foh-extra-hours_hours_dates_field']) || ! isset($_POST['foh-extra-hours_hours_min_date_field']) || ! isset($_POST['foh-extra-hours_hours_max_date_field']) || ! isset($_POST['foh-extra-hours_hours_field']) || ! isset($_POST['foh-extra-hours_message_field'])) {
            return;
        }

        $dates = sanitize_text_field($_POST['foh-extra-hours_hours_dates_field']);
        $minDate = (int) sanitize_text_field($_POST['foh-extra-hours_hours_min_date_field']);
        $maxDate = (int) sanitize_text_field($_POST['foh-extra-hours_hours_max_date_field']);
        $hours = sanitize_text_field($_POST['foh-extra-hours_hours_field']);
        if (empty($hours)) {
            $hours = '[]';
        }
        $message = sanitize_text_field($_POST['foh-extra-hours_message_field']);

        update_post_meta($postID, 'foh-extra-hours_hours_dates', $dates);
        update_post_meta($postID, 'foh-extra-hours_hours_min_date', $minDate);
        update_post_meta($postID, 'foh-extra-hours_hours_max_date', $maxDate);
        update_post_meta($postID, 'foh-extra-hours_hours', $hours);
        update_post_meta($postID, 'foh-extra-hours_message', $message);
    }

    function save_foh_temporary_hours_meta_values($postID)
    {
        if (! isset($_POST['foh-temporary-hours_hours_wpnonce'])) {
            return;
        }
        if (! wp_verify_nonce($_POST['foh-temporary-hours_hours_wpnonce'], 'save_foh_temporary_hours_meta_values')) {
            return;
        }
        if (! current_user_can('edit_post', $postID)) {
            return;
        }
        if (! isset($_POST['foh-temporary-hours_hours_min_date_field']) || ! isset($_POST['foh-temporary-hours_hours_max_date_field']) || ! isset($_POST['foh-temporary-hours_hours_field'])) {
            return;
        }

        $minDate = (int) sanitize_text_field($_POST['foh-temporary-hours_hours_min_date_field']);
        $maxDate = (int) sanitize_text_field($_POST['foh-temporary-hours_hours_max_date_field']);
        $hours = sanitize_text_field($_POST['foh-temporary-hours_hours_field']);

        update_post_meta($postID, 'foh-temporary-hours_hours_min_date', $minDate);
        update_post_meta($postID, 'foh-temporary-hours_hours_max_date', $maxDate);
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
        // Normal hours
        $normalHours = get_option('foh_normal_open_hours');

        // Extra hours
        $extraHoursQuery = new WP_Query(array(
            'posts_per_page' => -1,
            'post_type' => 'foh-extra-hours',
            'meta_query' => array(
                array(
                    'key' => 'foh-extra-hours_hours_max_date',
                    'compare' => '>=',
                    'value' => date('Uv')
                ),
                array(
                    'key' => 'foh-extra-hours_hours_min_date',
                    'compare' => '<',
                    'value' => date('Uv') + (86400000 * 7) // it will show 7 days before beginning/min_date
                ),
            ),
        ));
        $extraHours = [];
        while ($extraHoursQuery->have_posts()) {
            $extraHoursQuery->the_post();
            array_push($extraHours, array(
                'id' => get_the_ID(),
                'title' => get_the_title(),
                'message' => get_post_meta(get_the_ID(), 'foh-extra-hours_message', true),
                'dates' => json_decode(get_post_meta(get_the_ID(), 'foh-extra-hours_hours_dates', true)),
                'hours' => json_decode(get_post_meta(get_the_ID(), 'foh-extra-hours_hours', true))
            ));
        }

        // Temporary hours
        $temporaryHoursQuery = new WP_Query(array(
            'posts_per_page' => -1,
            'post_type' => 'foh-temporary-hours',
            'meta_query' => array(
                array(
                    'key' => 'foh-temporary-hours_hours_max_date',
                    'compare' => '>=',
                    'value' => date('Uv')
                ),
                array(
                    'key' => 'foh-temporary-hours_hours_min_date',
                    'compare' => '<',
                    'value' => date('Uv')
                ),
            ),
        ));
        $temporaryHours = [];
        while ($temporaryHoursQuery->have_posts()) {
            $temporaryHoursQuery->the_post();
            array_push($temporaryHours, array(
                'id' => get_the_ID(),
                'title' => get_the_title(),
                'dates' => array(
                    'start' => array(
                        'date' => date(get_post_meta(get_the_ID(), 'foh-temporary-hours_hours_min_date', true))
                    ),
                    'end' => array(
                        'date' => get_post_meta(get_the_ID(), 'foh-temporary-hours_hours_max_date', true)
                    ),
                ),
                'hours' => json_decode(get_post_meta(get_the_ID(), 'foh-temporary-hours_hours', true))
            ));
        }

        // Return
        $returnValue = array(
            'settings' => array(
                'week_name_format' => (int) esc_html(get_option('foh_week_name_format')),
                'week_name_format_extra' => (int) esc_html(get_option('foh_week_name_format_extra')),
                'hour_name_format' => (int) esc_html(get_option('foh_hour_name_format'))
            ),
            'normal_hours' => json_decode($normalHours),
            'extra_hours' => $extraHours,
            'temporary_hours' => $temporaryHours
        );
        return $returnValue;
    }
    function sanitize_integer($value)
    {
        $value = (int) esc_attr($value);

        return $value;
    }
}

$flexibleOpenHours = new FlexibleOpenHours();
