import { HAS_TEXT_DEFAULT } from './constants';

export default {
	postLink: {
		type: 'string',
		default: '',
	},
	postTitle: {
		type: 'string',
		default: '',
	},
	hasText: {
		type: 'boolean',
		default: HAS_TEXT_DEFAULT,
	},
	text: {
		type: 'string',
		default: '',
	},
};
