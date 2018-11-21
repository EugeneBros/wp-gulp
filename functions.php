<?php

//Add styles and scripts
add_action( 'wp_enqueue_scripts', 'theme_scripts' );

function theme_scripts() {

//  Adding styles
  wp_enqueue_style( 'libs-styles', get_template_directory_uri() . '/dist/css/libs.min.css' );
  wp_enqueue_style( 'style-css', get_template_directory_uri() . '/dist/css/main.css' );

//  Adding scripts
  wp_enqueue_script( 'libs-scripts', get_template_directory_uri() . '/dist/js/libs.min.js', array(), '1.0.0', true );
  wp_enqueue_script( 'main-scripts', get_template_directory_uri() . '/dist/js/main.min.js', array(), '1.0.0', true );

}