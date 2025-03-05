import { Panel } from '@wordpress/components'

import { FullWeek } from './foh-settings-fullweek'
import { Day, DaysSchema } from '../types/foh-settings-types'
import isJSON from '../utility/is-json'

export default function FohSettingsNormalHours() {
	// get input and data
	const hoursInput: HTMLInputElement | null = document.querySelector(
		'#foh_normal_open_hours'
	)
	if (!hoursInput) {
		throw new Error('#foh_normal_open_hours_field not found')
	}
	let hoursinfo: Day[] = [[], [], [], [], [], [], []]
	if (isJSON(hoursInput.value)) {
		let json = JSON.parse(hoursInput.value)
		if (DaysSchema.safeParse(json)) {
			hoursinfo = json
		}
	}

	return (
		<Panel>
			<div id='full-week'>
				<FullWeek week={hoursinfo} input={hoursInput} />
			</div>
		</Panel>
	)
}
