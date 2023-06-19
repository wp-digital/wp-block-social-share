import { has } from 'lodash';

import { __ } from '@wordpress/i18n';
import {
	useBlockProps,
	InspectorControls,
	RichText,
} from '@wordpress/block-editor';
import { PanelBody, PanelRow, ToggleControl } from '@wordpress/components';

import { BLOCK_CLASS_NAME, SOCIALS } from './constants';

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
				<PanelBody title={__('Settings', 'wpd-blocks')} initialOpen>
					<PanelRow>
						<ToggleControl
							label={__('Show label', 'wpd-blocks')}
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
					placeholder={__('Label', 'wpd-blocks')}
					onChange={onLabelChange}
					className={`${BLOCK_CLASS_NAME}__label`}
				/>
			)}
			{Object.keys(SOCIALS).map((name) => {
				const social = SOCIALS[name];

				return (
					<span
						key={name}
						role="button"
						tabIndex={0}
						dangerouslySetInnerHTML={{
							__html: `${
								has(social, 'icon') ? social.icon : ''
							} ${has(social, 'label') ? social.label : name}`,
						}}
						className={`${BLOCK_CLASS_NAME}__link ${BLOCK_CLASS_NAME}__link_${name}`}
					/>
				);
			})}
		</div>
	);
}
