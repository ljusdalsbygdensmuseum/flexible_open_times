import { __ } from '@wordpress/i18n'
export const weekNames = {
	default: [
		__('Monday', 'flexible-open-hours-domain'),
		__('Tuesday', 'flexible-open-hours-domain'),
		__('Wednesday', 'flexible-open-hours-domain'),
		__('Thursday', 'flexible-open-hours-domain'),
		__('Friday', 'flexible-open-hours-domain'),
		__('Saturday', 'flexible-open-hours-domain'),
		__('Sunday', 'flexible-open-hours-domain'),
	],
	short: [
		__('Mon', 'flexible-open-hours-domain'),
		__('Tue', 'flexible-open-hours-domain'),
		__('Wed', 'flexible-open-hours-domain'),
		__('Thu', 'flexible-open-hours-domain'),
		__('Fri', 'flexible-open-hours-domain'),
		__('Sat', 'flexible-open-hours-domain'),
		__('Sun', 'flexible-open-hours-domain'),
	],
	pointing: [
		__('Monday the', 'flexible-open-hours-domain'),
		__('Tuesday the', 'flexible-open-hours-domain'),
		__('Wednesday the', 'flexible-open-hours-domain'),
		__('Thursday the', 'flexible-open-hours-domain'),
		__('Friday the', 'flexible-open-hours-domain'),
		__('Saturday the', 'flexible-open-hours-domain'),
		__('Sunday the', 'flexible-open-hours-domain'),
	],
}

export const singleWeekName = __('Hours', 'flexible-open-hours-domain')

export const normalTitle = {
	default: __('Open hours', 'flexible-open-hours-domain'),
	whenTemp: __('Normal open hours', 'flexible-open-hours-domain'),
	showNormal: __('Show normal open hours', 'flexible-open-hours-domain'),
	backName: __('Back to current hours', 'flexible-open-hours-domain'),
}
