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

        //Settings
        add_action('admin_init', array($this, 'settings'));

        //Post type
    }

    //Page
    function main_page()
    {
        $menuPage = add_menu_page('Open Hours', 'Open Hours', 'delete_others_posts', 'open-hours', array($this, 'main_page_html'), 'dashicons-clock', 4);

        add_action('load-' . $menuPage, array($this, 'load_main_page'));
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

    //Settings
    function settings() 
    {
        register_setting('normal_open_hours', 'foh-normal-open-hours', array(
            'sanitize_callback' => 'sanitize_text_field',
            'default' => '[{"dayInt":0,"hours":[]}, {"dayInt": 1,"hours":[]}, {"dayInt": 2,"hours":[]}, {"dayInt": 3,"hours":[]}, {"dayInt":4,"hours":[]}, {"dayInt":5,"hours":[]}, {"dayInt":6,"hours":[]}]'
        ));

        add_settings_section( 'normal_open_hours', null, array($this, 'open_hours_settings_html'), 'open-hours' );

        add_settings_field('foh-normal-open-hours', null, array($this, 'day_html'), 'open-hours', 'normal_open_hours',);

        
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
}

$flexibleOpenHours = new FlexibleOpenHours();