<?php

/*
    Plugin Name: Flexible Open Hours
    Description: Eselly change open times on the fly.
    Version: 0.0.1
    Author: ina
*/

if( ! defined( 'ABSPATH' ) ) exit; // Exit if accessed directly

class FlexibleOpenHours{
    function __construct()
    {
        //Menu page
        add_action('admin_menu', array($this, 'main_page'));

        //Admin enqueue
        add_action('admin_enqueue_scripts', array($this, 'admin_scripts'));

        //Settings
        add_action('admin_init', array($this, 'settings'));

        //Post type
        add_action('init', array($this, 'init_post_type'));

        //Meta boxes
        add_action('add_meta_boxes', array($this, 'init_meta_boxes'));
        add_action('save_post_foh-extra-hours', array($this, 'save_meta_values'));
        add_action('save_post_foh-closed', array($this, 'save_meta_values'));
    }

    //Page
    function main_page()
    {
        $menuPage = add_menu_page('Open Hours', 'Open Hours', 'edit_pages', 'open-hours', array($this, 'main_page_html'), 'dashicons-clock', 4);

        add_action('load-' . $menuPage, array($this, 'load_main_page'));

        // rename the submenu page 
        add_submenu_page( 'open-hours', 'Open Hours', 'Normal hours', 'edit_pages', 'open-hours' );

        // submenu pages for custom post type
        add_submenu_page( 'open-hours', 'Extra hours', 'Extra hours', 'edit_pages', 'edit.php?post_type=foh-extra-hours');
        add_submenu_page( 'open-hours', 'Extra hours', 'Closed', 'edit_pages', 'edit.php?post_type=foh-closed');
    }

    function main_page_html() 
    {?>
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
    <?php }

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
        wp_enqueue_style( 'wp-components' );
    }

    function admin_scripts($hook){
        if ($hook != 'post.php' && $hook != 'post-new.php') {
            return;
        }
        if (get_post_type() == 'foh-extra-hours') {
            //Grab dependencies
            $assets = include plugin_dir_path(__FILE__) . 'build/extra_open.asset.php';

            //Enqueue scripts
            wp_enqueue_script('foh-extra-open-js', plugin_dir_url(__FILE__) . 'build/extra_open.js', $assets['dependencies'], $assets['version'], true);

        }
        if (get_post_type() == 'foh-closed') {
            //Grab dependencies
            $assets = include plugin_dir_path(__FILE__) . 'build/closed.asset.php';

            //Enqueue scripts
            wp_enqueue_script('foh-closed-js', plugin_dir_url(__FILE__) . 'build/closed.js', $assets['dependencies'], $assets['version'], true);
        }
    }

    //Settings
    function settings() 
    {
        register_setting('normal_open_hours', 'foh-normal-open-hours', array(
            'sanitize_callback' => 'sanitize_text_field',
            'default' => '[{"dayInt":0,"hours":[]}, {"dayInt": 1,"hours":[]}, {"dayInt": 2,"hours":[]}, {"dayInt": 3,"hours":[]}, {"dayInt":4,"hours":[]}, {"dayInt":5,"hours":[]}, {"dayInt":6,"hours":[]}]'
        ));

        add_settings_section( 'normal_open_hours', null, array($this, 'open_hours_settings_html'), 'open-hours' );

        add_settings_field('foh-normal-open-hours', null, array($this, 'day_html'), 'open-hours', 'normal_open_hours');

        
    }

    function open_hours_settings_html() 
    {
       echo '<div id="foh-normal-open-hours-input"></div>'; 
    }

    function day_html($day)
    {?>
        <input id="foh-normal-open-hours" name="foh-normal-open-hours" type="text" value='<?php echo esc_html(get_option('foh-normal-open-hours'))?>'>
    <?php 
    }

    //Post types
    function init_post_type() 
    {
        $args = array(
            'public' => TRUE,
            'supports' => array('title'),
            'show_in_menu' => FALSE,
            'labels' => array(
                'name' => 'Extra hours',
            )
        );
        register_post_type('foh-extra-hours', $args);

        $argsClosed = array(
            'public' => TRUE,
            'supports' => array('title'),
            'show_in_menu' => FALSE,
            'labels' => array(
                'name' => 'Closed',
            )
        );
        register_post_type('foh-closed', $argsClosed);
    }

    //Meta box
    function init_meta_boxes()
    {
        add_meta_box('foh-extra-hours-meta', 'Extra hours', array($this, 'callback_content_meta_box'), 'foh-extra-hours', 'advanced', 'high');
        add_meta_box('foh-closed-meta', 'Days', array($this, 'callback_content_meta_box'), 'foh-closed', 'advanced', 'high');
    }

    function callback_content_meta_box($post, $args) 
    {
        wp_nonce_field( 'save_meta_values', $args['id']. '_wpnonce' );

        $value = esc_attr( get_post_meta( $post->ID, $args['id'], true ) );

        echo '<div id="'.$args['id'].'_container" ></div><input type="text" id="'.$args['id'].'" name="'.$args['id'].'" value="'.$value.'">';
    }

    function save_meta_values($postID)
    {
        $post_type = get_post_type($postID);

        if ( ! isset($_POST[$post_type.'-meta_wpnonce'])) {
            return;
        }
        if ( ! wp_verify_nonce($_POST[$post_type.'-meta_wpnonce'], 'save_meta_values')) {
            return;
        }
        if ( ! current_user_can('edit_post', $postID)) {
            return;
        }
        if ( ! isset($_POST[$post_type.'-meta'])) {
            return;
        }

        $data = sanitize_text_field($_POST[$post_type.'-meta']);

        update_post_meta($postID, $post_type.'-meta', $data);
    }
}

$flexibleOpenHours = new FlexibleOpenHours();