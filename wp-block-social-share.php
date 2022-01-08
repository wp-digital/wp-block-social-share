<?php
/**
 * Plugin Name:       Social Share Block
 * Description:       Links to share current post to most used social such as Facebook, Twitter, Email, LinkedIn.
 * Requires at least: 5.8
 * Requires PHP:      7.0
 * Version:           2.1.0
 * Author:            Innocode
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       innocode-block-social-share
 *
 * @package           innocode
 */

/**
 * @return array
 */
function innocode_block_social_share_socials() : array {
	return apply_filters( 'innocode-block-social-share-socials', [
		'facebook' => [
			'label' => esc_html__( 'Share on Facebook', 'innocode-block-social-share' ),
			'icon'  => '<svg viewBox="0 0 320 512" xmlns="http://www.w3.org/2000/svg" role="img" aria-hidden="false" focusable="false"><path d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z"></path></svg>',
		],
		'twitter'  => [
			'label' => esc_html__( 'Share on Twitter', 'innocode-block-social-share' ),
			'icon'  => '<svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg" role="img" aria-hidden="false" focusable="false"><path d="M459.37 151.716c.325 4.548.325 9.097.325 13.645 0 138.72-105.583 298.558-298.558 298.558-59.452 0-114.68-17.219-161.137-47.106 8.447.974 16.568 1.299 25.34 1.299 49.055 0 94.213-16.568 130.274-44.832-46.132-.975-84.792-31.188-98.112-72.772 6.498.974 12.995 1.624 19.818 1.624 9.421 0 18.843-1.3 27.614-3.573-48.081-9.747-84.143-51.98-84.143-102.985v-1.299c13.969 7.797 30.214 12.67 47.431 13.319-28.264-18.843-46.781-51.005-46.781-87.391 0-19.492 5.197-37.36 14.294-52.954 51.655 63.675 129.3 105.258 216.365 109.807-1.624-7.797-2.599-15.918-2.599-24.04 0-57.828 46.782-104.934 104.934-104.934 30.213 0 57.502 12.67 76.67 33.137 23.715-4.548 46.456-13.32 66.599-25.34-7.798 24.366-24.366 44.833-46.132 57.827 21.117-2.273 41.584-8.122 60.426-16.243-14.292 20.791-32.161 39.308-52.628 54.253z"></path></svg>',
		],
		'linkedin' => [
			'label' => esc_html__( 'Share on LinkedIn', 'innocode-block-social-share' ),
			'icon'  => '<svg viewBox="0 0 448 512" xmlns="http://www.w3.org/2000/svg" role="img" aria-hidden="false" focusable="false"><path d="M100.28 448H7.4V148.9h92.88zM53.79 108.1C24.09 108.1 0 83.5 0 53.8a53.79 53.79 0 0 1 107.58 0c0 29.7-24.1 54.3-53.79 54.3zM447.9 448h-92.68V302.4c0-34.7-.7-79.2-48.29-79.2-48.29 0-55.69 37.7-55.69 76.7V448h-92.78V148.9h89.08v40.8h1.3c12.4-23.5 42.69-48.3 87.88-48.3 94 0 111.28 61.9 111.28 142.3V448z"></path></svg>',
		],
		'email'    => [
			'label' => esc_html__( 'Share via email', 'innocode-block-social-share' ),
			'icon'  => '<svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg" role="img" aria-hidden="false" focusable="false"><path d="M502.3 190.8c3.9-3.1 9.7-.2 9.7 4.7V400c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V195.6c0-5 5.7-7.8 9.7-4.7 22.4 17.4 52.1 39.5 154.1 113.6 21.1 15.4 56.7 47.8 92.2 47.6 35.7.3 72-32.8 92.3-47.6 102-74.1 131.6-96.3 154-113.7zM256 320c23.2.4 56.6-29.2 73.4-41.4 132.7-96.3 142.8-104.7 173.4-128.7 5.8-4.5 9.2-11.5 9.2-18.9v-19c0-26.5-21.5-48-48-48H48C21.5 64 0 85.5 0 112v19c0 7.4 3.4 14.3 9.2 18.9 30.6 23.9 40.7 32.4 173.4 128.7 16.8 12.2 50.2 41.8 73.4 41.4z"></path></svg>',
		],
	] );
}

/**
 * @param string $social
 * @param int    $post_id
 * @return string
 */
function innocode_block_social_share_url_by_social( string $social, int $post_id = 0 ) : string {
	$link = get_the_permalink( $post_id );
	$title = get_the_title( $post_id );

	switch ( $social ) {
		case 'facebook':
			return add_query_arg( 'u', $link, 'https://www.facebook.com/sharer/sharer.php' );
		case 'twitter':
			return add_query_arg( [
				'text' => $title,
				'url'  => $link,
			], 'https://twitter.com/intent/tweet' );
		case 'linkedin':
			return add_query_arg( 'url', $link, 'https://www.linkedin.com/sharing/share-offsite/' );
		case 'email':
			return add_query_arg( 'body', "$title &mdash; $link", 'mailto:' );
		default:
			return apply_filters( "innocode-block-social-share-$social-url", '', $post_id );
	}
}

/**
 * @param array $block_attributes
 * @return string
 */
function innocode_block_social_share_block_render( array $block_attributes ) : string {
	$block_class_name = 'innocode-block-social-share';

	$class_names = [ $block_class_name ];

	if ( isset( $block_attributes['align'] ) ) {
		$class_names[] = "align{$block_attributes['align']}";
	}

	$block_label = '';

	if ( ! empty( $block_attributes['hasLabel'] ) && isset( $block_attributes['label'] ) ) {
		$block_label = sprintf(
			'<div class="%1$s__label">%2$s</div>',
			$block_class_name,
			$block_attributes['label']
		);
	}

	$social_links = '';

	foreach ( innocode_block_social_share_socials() as $name => $social ) {
		$social_links .= sprintf(
			'<a href="%1$s" title="%2$s" target="_blank" rel="noreferrer noopener" class="%3$s__link %3$s__link_%4$s">%5$s %2$s</a>',
			innocode_block_social_share_url_by_social( $name ),
			$social['label'] ?? $name,
			$block_class_name,
			$name,
			$social['icon'] ?? ''
		);
	}

	return sprintf(
		'<div class="%1$s">%2$s%3$s</div>',
		implode( ' ', $class_names ),
		$block_label,
		$social_links
	);
}

function innocode_block_social_share_block_init() {
	register_block_type( __DIR__, [
		'render_callback' => 'innocode_block_social_share_block_render',
	] );
}

add_action( 'init', 'innocode_block_social_share_block_init' );

function innocode_block_social_share_enqueue_scripts() {
	wp_add_inline_script(
		'innocode-block-social-share-editor-script',
		'var innocodeBlockSocialShareSocials = ' . wp_json_encode( innocode_block_social_share_socials() ),
		'before'
	);
}

add_action( 'admin_enqueue_scripts', 'innocode_block_social_share_enqueue_scripts' );
