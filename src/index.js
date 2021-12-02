import { registerBlockType } from '@wordpress/blocks';

import Edit from './edit';
import save from './save';
import icon from './icon';

import { HAS_TEXT_DEFAULT, SOCIALS_DEFAULT } from './constants';

import './style.scss';

registerBlockType('innocode/wp-block-social-share', {
	attributes: {
		hasText: {
			type: 'boolean',
			default: HAS_TEXT_DEFAULT,
		},
		postTitle: {
			type: 'string',
			default: '',
		},
		postLink: {
			type: 'string',
			default: '',
		},
		text: {
			type: 'string',
			default: '',
		},
		socials: {
			type: 'array',
			default: SOCIALS_DEFAULT,
		},
	},
	edit: Edit,
	save,
	icon,
});
