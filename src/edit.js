import { __ } from '@wordpress/i18n';
import {
	useBlockProps,
	InspectorControls,
	RichText,
} from '@wordpress/block-editor';
import { PanelBody, PanelRow, ToggleControl } from '@wordpress/components';

import { BLOCK_CLASS_NAME, SOCIALS } from './constants';

import icons from './icons.json';

import './editor.scss';

export default function Edit(props) {
	const { attributes, setAttributes } = props;
	const { hasLabel, label } = attributes;

	const onChange = (key, value) => {
		setAttributes({ [key]: value });
	};

	const onHasLabelChange = () => onChange('hasLabel', !hasLabel);
	const onLabelChange = (value) => onChange('label', value);

	return (
		<div
			{...useBlockProps({
				className: BLOCK_CLASS_NAME,
			})}
		>
			<InspectorControls>
				<PanelBody
					title={__('Settings', 'innocode-block-social-share')}
					initialOpen
				>
					<PanelRow>
						<ToggleControl
							label={__(
								'Show label',
								'innocode-block-social-share'
							)}
							checked={hasLabel}
							onChange={onHasLabelChange}
						/>
					</PanelRow>
				</PanelBody>
			</InspectorControls>
			{hasLabel && (
				<RichText
					tagName="div"
					value={label}
					placeholder={__(
						'Label',
						'innocode-block-social-share'
					)}
					onChange={onLabelChange}
					className={`${BLOCK_CLASS_NAME}__label`}
				/>
			)}
			{Object.keys(SOCIALS).map((social) => (
				<span
					key={social}
					role="button"
					tabIndex={0}
					dangerouslySetInnerHTML={{
						__html: `${icons[social]} ${SOCIALS[social]}`,
					}}
					className={`${BLOCK_CLASS_NAME}__link ${BLOCK_CLASS_NAME}__link_${social}`}
				/>
			))}
		</div>
	);
}
