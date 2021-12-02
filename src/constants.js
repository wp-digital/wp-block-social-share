import { applyFilters } from '@wordpress/hooks';

export const BLOCK_CLASS_NAME = 'innocode-block-social-share';

export const Socials = {
	FACEBOOK: 'facebook',
	TWITTER: 'twitter',
	LINKED_IN: 'linked-in',
	EMAIL: 'email',
};

export const SOCIALS_DEFAULT = applyFilters(
	'innocode.block-social-share.socials.default',
	[Socials.FACEBOOK, Socials.TWITTER, Socials.LINKED_IN, Socials.EMAIL]
);

export const HAS_TEXT_DEFAULT = applyFilters(
	'innocode.block-social-share.has_text.default',
	true
);
