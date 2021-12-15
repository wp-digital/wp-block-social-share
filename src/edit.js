import { __ } from '@wordpress/i18n';
import {
	useBlockProps,
	InspectorControls,
	RichText,
} from '@wordpress/block-editor';
import { useSelect } from '@wordpress/data';
import { PanelBody, PanelRow, FormToggle } from '@wordpress/components';
import { Fragment, useEffect } from '@wordpress/element';

import { BLOCK_CLASS_NAME, HAS_TEXT_DEFAULT, SOCIALS } from './constants';

import SocialLink from './SocialLink';

import './editor.scss';

export default function Edit(props) {
	const { attributes, setAttributes } = props;
	const {
		postLink,
		postTitle,
		text,
		hasText = HAS_TEXT_DEFAULT,
	} = attributes;

	const { link, title } = useSelect(
		(select) => ({
			link: select('core/editor').getEditedPostAttribute('link'),
			title: select('core/editor').getEditedPostAttribute('title'),
		}),
		[]
	);

	useEffect(() => {
		setAttributes({
			postLink: link,
			postTitle: title,
		});
	}, [postLink, postTitle]);

	return (
		<Fragment>
			<InspectorControls>
				<PanelBody
					title={__('Settings', 'innocode-block-social-share')}
					initialOpen
				>
					<PanelRow>
						<legend className="blocks-base-control__label">
							{__(
								'Show share text',
								'innocode-block-social-share'
							)}
						</legend>
						<FormToggle
							checked={hasText}
							onChange={(event) => {
								setAttributes({
									hasText: event.target.checked,
								});
							}}
						/>
					</PanelRow>
				</PanelBody>
			</InspectorControls>
			<div
				{...useBlockProps({
					className: BLOCK_CLASS_NAME,
				})}
			>
				{hasText && (
					<RichText
						tagName="div"
						value={text}
						placeholder={__(
							'Share text',
							'innocode-block-social-share'
						)}
						onChange={(value) => {
							setAttributes({ text: value });
						}}
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
		</Fragment>
	);
}
