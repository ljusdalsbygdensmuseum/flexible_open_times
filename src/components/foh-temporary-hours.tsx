import { Panel } from '@wordpress/components'

import { FullWeek } from './foh-settings-fullweek'
import { Day } from '../types/foh-settings-types'

import { FOHDateRange } from './foh-date-range'

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
