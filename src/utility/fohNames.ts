import { __ } from '@wordpress/i18n'
export const weekNames = {
	default: [
		__('Monday', 'foh-domain'),
		__('Tuesday', 'foh-domain'),
		__('Wednesday', 'foh-domain'),
		__('Thursday', 'foh-domain'),
		__('Friday', 'foh-domain'),
		__('Saturday', 'foh-domain'),
		__('Sunday', 'foh-domain'),
	],
	short: [
		__('Mon', 'foh-domain'),
		__('Tue', 'foh-domain'),
		__('Wed', 'foh-domain'),
		__('Thu', 'foh-domain'),
		__('Fri', 'foh-domain'),
		__('Sat', 'foh-domain'),
		__('Sun', 'foh-domain'),
	],
	pointing: [
		__('Monday the', 'foh-domain'),
		__('Tuesday the', 'foh-domain'),
		__('Wednesday the', 'foh-domain'),
		__('Thursday the', 'foh-domain'),
		__('Friday the', 'foh-domain'),
		__('Saturday the', 'foh-domain'),
		__('Sunday the', 'foh-domain'),
	],
}

export const singleWeekName = __('Hours', 'foh-domain')

export const normalTitle = {
	default: __('Open hours', 'foh-domain'),
	whenTemp: __('Normal open hours', 'foh-domain'),
	showNormal: __('Show normal open hours', 'foh-domain'),
	backName: __('Back to current hours', 'foh-domain'),
}
