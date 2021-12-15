<?php
/**
 * Plugin Name:       Social Share Block
 * Description:       Links to share current post to most used social such as Facebook, Twitter, Email, LinkedIn.
 * Requires at least: 5.8.2
 * Requires PHP:      7.0
 * Version:           1.0.0
 * Author:            Innocode
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       innocode-block-social-share
 *
 * @package           innocode
 */

function innocode_block_social_share_block_init() {
	register_block_type( __DIR__ );
}

add_action( 'init', 'innocode_block_social_share_block_init' );
