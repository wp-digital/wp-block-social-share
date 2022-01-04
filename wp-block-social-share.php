<?php
/**
 * Plugin Name:       Social Share Block
 * Description:       Links to share current post to most used social such as Facebook, Twitter, Email, LinkedIn.
 * Requires at least: 5.8
 * Requires PHP:      7.0
 * Version:           2.0.3
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
		'facebook' => esc_html__( 'Share on Facebook', 'innocode-block-social-share' ),
		'twitter'  => esc_html__( 'Share on Twitter', 'innocode-block-social-share' ),
		'linkedin' => esc_html__( 'Share on LinkedIn', 'innocode-block-social-share' ),
		'email'    => esc_html__( 'Share via email', 'innocode-block-social-share' ),
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
 * @param string $social
 * @return string
 */
function innocode_block_social_share_icon_by_social( string $social ) : string {
	$icons = json_decode( file_get_contents( __DIR__ . '/src/icons.json' ), true );

	return apply_filters( "innocode-block-social-share-$social-icon", $icons[ $social ] ?? '' );
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

	foreach ( innocode_block_social_share_socials() as $social => $label ) {
		$social_links .= sprintf(
			'<a href="%1$s" title="%2$s" target="_blank" rel="noreferrer noopener" class="%3$s__link %3$s__link_%4$s">%5$s %2$s</a>',
			innocode_block_social_share_url_by_social( $social ),
			$label,
			$block_class_name,
			$social,
			innocode_block_social_share_icon_by_social( $social )
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
