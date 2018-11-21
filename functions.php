<?php

//Add styles and scripts
add_action( 'wp_enqueue_scripts', 'theme_scripts' );

function theme_scripts() {

//  Adding styles
  wp_enqueue_style( 'style-css', get_template_directory_uri() . '/dist/css/style.css' );

//  Adding scripts
//  wp_enqueue_script( 'script-name', get_template_directory_uri() . '/js/example.js', array(), '1.0.0', true );

}