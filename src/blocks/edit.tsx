/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n'

/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import { useBlockProps } from '@wordpress/block-editor'

import apiFetch from '@wordpress/api-fetch'

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './editor.scss'
import { Day } from '../components/foh-settings-types'
import { useState } from 'react'
import DisplayDays from '../components/foh-block-display-day'

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @return {Element} Element to render.
 */

export default function Edit() {
	let hoursinfo: Day[] = [
		{ dayInt: 0, title: 'Monday', hours: [] },
		{ dayInt: 1, title: 'Tuseday', hours: [] },
		{ dayInt: 2, title: 'Wednesday', hours: [] },
		{ dayInt: 3, title: 'Thursday', hours: [] },
		{ dayInt: 4, title: 'Friday', hours: [] },
		{ dayInt: 5, title: 'Saturday', hours: [] },
		{ dayInt: 6, title: 'Sunday', hours: [] },
	]

	const [normalHours, setNormalHours] = useState(hoursinfo)
	// get the setting
	apiFetch({ path: '/wp/v2/settings' }).then((settings) => {
		if (
			typeof settings == 'object' &&
			settings != undefined &&
			settings.hasOwnProperty('foh_normal_open_hours')
		) {
			setNormalHours(JSON.parse(settings.foh_normal_open_hours))
		}
	})

	return <DisplayDays showTitle={true} days={normalHours} />
	//return <p {...useBlockProps()}></p>
}
