import { registerBlockType } from '@wordpress/blocks';

import Edit from './edit';
import save from './save';
import attributes from './attributes';
import icon from './icon';

import './style.scss';

registerBlockType('innocode/block-social-share', {
	apiVersion: 2,
	supports: {
		className: false,
	},
	edit: Edit,
	save,
	attributes,
	icon,
});
