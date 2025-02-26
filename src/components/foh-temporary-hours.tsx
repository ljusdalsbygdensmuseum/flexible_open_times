import { Panel } from '@wordpress/components'

import { FullWeek } from './foh-settings-fullweek'
import { FOHDateRange } from './foh-date-range'
import { Day, DaysSchema } from '../types/foh-settings-types'

import isJSON from '../utility/is-json'
import { DatesRange } from '../types/foh-metabox-temporary-types'

export function FohTemporaryHours() {
	//get input and data
	//hours
	const hoursInput: HTMLInputElement | null = document.querySelector(
		'#foh-temporary-hours_hours_field'
	)
	if (!hoursInput) {
		throw new Error('#foh-temporary-hours_hours_field not found')
	}
	let hoursinfo: Day[] = [[], [], [], [], [], [], []]
	if (isJSON(hoursInput.value)) {
		let json = JSON.parse(hoursInput.value)
		if (DaysSchema.safeParse(json)) {
			hoursinfo = json
		}
	}

	//date
	const mindateInput: HTMLInputElement | null = document.querySelector(
		'#foh-temporary-hours_min_date_field'
	)
	const maxdateInput: HTMLInputElement | null = document.querySelector(
		'#foh-temporary-hours_max_date_field'
	)
	if (!mindateInput || !maxdateInput) {
		throw new Error('dates_field not found')
	}

	let minDate = parseInt(mindateInput.value)
	if (minDate < 86400000) {
		minDate = new Date().getTime()
	}
	const maxDate = parseInt(maxdateInput.value)

	return (
		<>
			<Panel>
				<div id='day-select'>
					<FOHDateRange
						dates={[minDate, maxDate]}
						input={[mindateInput, maxdateInput]}
					/>
				</div>
			</Panel>
			<Panel>
				<div id='full-week'>
					<FullWeek week={hoursinfo} input={hoursInput} />
				</div>
			</Panel>
		</>
	)
}
