import { applyFilters } from '@wordpress/hooks';
import { __ } from '@wordpress/i18n';

export const BLOCK_CLASS_NAME = 'innocode-block-social-share';

export const SOCIAL_FACEBOOK = 'facebook';
export const SOCIAL_TWITTER = 'twitter';
export const SOCIAL_LINKED_IN = 'linkedin';
export const SOCIAL_EMAIL = 'email';

export const SOCIALS = applyFilters('innocode.block-social-share.socials', [
	SOCIAL_FACEBOOK,
	SOCIAL_TWITTER,
	SOCIAL_LINKED_IN,
	SOCIAL_EMAIL,
]);

export const SOCIAL_LABELS = {
	[SOCIAL_FACEBOOK]: __('Share on Facebook', 'innocode-block-social-share'),
	[SOCIAL_TWITTER]: __('Share on Twitter', 'innocode-block-social-share'),
	[SOCIAL_LINKED_IN]: __('Share on LinkedIn', 'innocode-block-social-share'),
	[SOCIAL_EMAIL]: __('Share via email', 'innocode-block-social-share'),
};

export const HAS_TEXT_DEFAULT = applyFilters(
	'innocode.block-social-share.has_text.default',
	true
);
