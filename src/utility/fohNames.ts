import { __ } from '@wordpress/i18n'
export const weekNames = [
	__('Monday', 'flexible-open-hours-domain'),
	__('Tuesday', 'flexible-open-hours-domain'),
	__('Wednesday', 'flexible-open-hours-domain'),
	__('Thursday', 'flexible-open-hours-domain'),
	__('Friday', 'flexible-open-hours-domain'),
	__('Saturday', 'flexible-open-hours-domain'),
	__('Sunday', 'flexible-open-hours-domain'),
]

export const singleWeekName = __('Hours', 'flexible-open-hours-domain')

export const normalTitle = {
	default: __('Open hours', 'flexible-open-hours-domain'),
	whenTemp: __('Normal open hours', 'flexible-open-hours-domain'),
	showNormal: __('Show normal open hours', 'flexible-open-hours-domain'),
	backName: __('Back to current hours', 'flexible-open-hours-domain'),
}
