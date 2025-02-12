import { Panel } from '@wordpress/components'

import { FullWeek } from './foh-settings-fullweek'
import { Day } from './foh-settings-types'
import isJSON from '../utility/is-json'

export default function FohSettingsNormalHours() {
	// get input and data
	const hoursInput: HTMLInputElement | null = document.querySelector(
		'#foh_normal_open_hours'
	)
	if (!hoursInput) {
		throw new Error('#foh_normal_open_hours_field not found')
	}
	let hoursinfo: Day[] = [
		{ dayInt: 0, title: 'Monday', hours: [] },
		{ dayInt: 1, title: 'Tuseday', hours: [] },
		{ dayInt: 2, title: 'Wednesday', hours: [] },
		{ dayInt: 3, title: 'Thursday', hours: [] },
		{ dayInt: 4, title: 'Friday', hours: [] },
		{ dayInt: 5, title: 'Saturday', hours: [] },
		{ dayInt: 6, title: 'Sunday', hours: [] },
	]
	if (isJSON(hoursInput.value)) {
		let hoursinfoInput = JSON.parse(hoursInput.value)
		hoursinfoInput = hoursinfoInput.filter((item: Day) => {
			if (!('hours' in item)) {
				return
			}
			return item
		})

		if (hoursinfoInput.length != hoursinfo.length) {
			hoursinfoInput = hoursinfo
		}
		hoursinfo = hoursinfoInput
	}

	return (
		<Panel>
			<div id='full-week'>
				<FullWeek week={hoursinfo} input={hoursInput} />
			</div>
		</Panel>
	)
}
