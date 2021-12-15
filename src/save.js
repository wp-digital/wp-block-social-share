import { useBlockProps, RichText } from '@wordpress/block-editor';

import SocialLink from './SocialLink';

import { BLOCK_CLASS_NAME, HAS_TEXT_DEFAULT, SOCIALS } from './constants';

export default function save({ attributes }) {
	const {
		postLink,
		postTitle,
		hasText = HAS_TEXT_DEFAULT,
		text,
	} = attributes;

	return (
		<div
			{...useBlockProps.save({
				className: BLOCK_CLASS_NAME,
			})}
		>
			{hasText && !!text && (
				<RichText.Content
					tagName="div"
					value={text}
					className={`${BLOCK_CLASS_NAME}__text`}
				/>
			)}
			{SOCIALS.map((type) => (
				<SocialLink
					key={type}
					type={type}
					link={postLink}
					title={postTitle}
				/>
			))}
		</div>
	);
}
