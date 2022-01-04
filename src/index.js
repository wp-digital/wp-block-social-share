import { registerBlockType } from '@wordpress/blocks';

import Edit from './edit';
import icon from './icon';

import './style.scss';

registerBlockType('innocode/block-social-share', {
	apiVersion: 2,
	supports: {
		align: ['left', 'center', 'right', 'wide'],
		className: false,
	},
	edit: Edit,
	icon,
});
