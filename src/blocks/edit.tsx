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

import fohFixMissingZero from '../utility/fohFixMissingZero'

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
		{ dayInt: 0, hours: [] },
		{ dayInt: 1, hours: [] },
		{ dayInt: 2, hours: [] },
		{ dayInt: 3, hours: [] },
		{ dayInt: 4, hours: [] },
		{ dayInt: 5, hours: [] },
		{ dayInt: 6, hours: [] },
	]

	const [normalHours, setNormalHours] = useState(hoursinfo)
	// get the setting
	apiFetch({ path: '/wp/v2/settings' }).then((settings) => {
		if (
			typeof settings == 'object' &&
			settings != undefined &&
			settings.foh_normal_open_hours != undefined
		) {
			setNormalHours(JSON.parse(settings.foh_normal_open_hours))
		}
	})
	// for each day
	const theWeek = normalHours.map((day) => {
		//check if is empty
		if (day.hours.length < 1) {
			return
		}
		// for each hour
		const hours = day.hours.map((hour) => {
			const openHour = `${fohFixMissingZero(
				hour.open.hours
			)} : ${fohFixMissingZero(hour.open.minutes)}`
			const closeHour = `${fohFixMissingZero(
				hour.close.hours
			)} : ${fohFixMissingZero(hour.close.minutes)}`
			return (
				<>
					{openHour} - {closeHour}
				</>
			)
		})
		return <p>{hours}</p>
	})
	return theWeek
	//return <p {...useBlockProps()}></p>
}
