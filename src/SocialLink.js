import { applyFilters } from '@wordpress/hooks';

import {
	BLOCK_CLASS_NAME,
	SOCIAL_LABELS,
	SOCIAL_FACEBOOK,
	SOCIAL_TWITTER,
	SOCIAL_LINKED_IN,
	SOCIAL_EMAIL,
} from './constants';

import { Facebook, Twitter, LinkedIn, Email } from './Socialcons';

export default function SocialLink({ type, link, title }) {
	const label = SOCIAL_LABELS[type];

	let url = null;
	let Icon = null;

	switch (type) {
		case SOCIAL_FACEBOOK:
			url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
				link
			)}`;
			Icon = Facebook;

			break;
		case SOCIAL_TWITTER:
			url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
				title
			)}&url=${encodeURIComponent(link)}`;
			Icon = Twitter;

			break;
		case SOCIAL_LINKED_IN:
			url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
				link
			)}`;
			Icon = LinkedIn;

			break;
		case SOCIAL_EMAIL:
			url = `mailto:?body=${encodeURIComponent(`${title} - ${link}`)}.`;
			Icon = Email;

			break;
		default:
			return applyFilters(
				`innocode.block-social-share.${type}`,
				null,
				link,
				title,
				BLOCK_CLASS_NAME
			);
	}

	return (
		<a
			className={`${BLOCK_CLASS_NAME}__link ${BLOCK_CLASS_NAME}__link_${type}`}
			href={url}
			title={label}
			target="_blank"
			rel="noreferrer noopener"
			aria-label={label}
		>
			<Icon
				className={`${BLOCK_CLASS_NAME}__icon ${BLOCK_CLASS_NAME}__icon_${type}`}
				focusable="false"
				role="img"
			/>
		</a>
	);
}
