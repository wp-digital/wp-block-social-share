# Social Share Block

### Description

Links to share current post to most used social such as Facebook, Twitter, Email, LinkedIn.

### Demo

[Social Share Block](https://blocks.innocode.digital/social-share-block/)

### Install

- Preferable way is to use [Composer](https://getcomposer.org/):

    ````
    composer require innocode-digital/wp-block-social-share
    ````

- Alternate way is to clone this repo to `wp-content/plugins/`:

    ````
    cd wp-content/plugins/
    git clone git@github.com:innocode-digital/wp-block-social-share.git
    ````

Activate **Social Share Block** with [WP-CLI](https://make.wordpress.org/cli/handbook/)
`wp plugin activate wp-block-social-share` or from **Plugins** page.

### Documentation

Add or remove social with hook `innocode.block-social-share.socials`. If new social
added then it needs to be rendered via `innocode.block-social-share.${type}` filter. **Example**:

````
wp.hooks.addFilter( 'innocode.block-social-share.socials', 'my-theme', ( socials ) => [
	...socials,
	'snapchat',
] );
````

````
wp.hooks.addFilter( 'innocode.block-social-share.snapchat', 'my-theme', ( el, link, title, blockClassName ) => {
	// Create element.

	return el;
} );
````
