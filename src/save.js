import { useBlockProps, RichText } from '@wordpress/block-editor';

import {
	BLOCK_CLASS_NAME,
	HAS_TEXT_DEFAULT,
	SOCIALS_DEFAULT,
} from './constants';

import { getSocialLink } from './social-link';

export default function save({ attributes }) {
	const {
		postTitle,
		postLink,
		text,
		hasText = HAS_TEXT_DEFAULT,
		socials = SOCIALS_DEFAULT,
	} = attributes;

	return (
		<div
			{...useBlockProps.save({
				className: BLOCK_CLASS_NAME,
			})}
		>
			{hasText && text && (
				<RichText.Content
					tagName="div"
					value={text}
					className={`${BLOCK_CLASS_NAME}__text`}
				/>
			)}
			{socials.map((social) =>
				getSocialLink(social, postTitle, postLink)
			)}
		</div>
	);
}
