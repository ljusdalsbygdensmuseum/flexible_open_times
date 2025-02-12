import { Panel } from '@wordpress/components'

import { FullWeek } from './foh-settings-fullweek'
import { Day } from './foh-settings-types'

import { FOHDateRange } from './foh-date-range'

import isJSON from '../utility/is-json'
import { DatesRange } from './foh-metabox-temporary-types'

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
	const dateInput: HTMLInputElement | null = document.querySelector(
		'#foh-temporary-hours_dates_field'
	)
	if (!dateInput) {
		throw new Error('#foh-temporary-hours_dates_field not found')
	}
	let datesInfo: DatesRange = {
		start: { date: new Date() },
		end: { date: new Date() },
	}
	// checks if info input has the correct format if not throw error
	if (isJSON(dateInput.value)) {
		let datesInfoInput = JSON.parse(dateInput.value)
		if (!('start' in datesInfoInput) || !('end' in datesInfoInput)) {
			datesInfoInput = datesInfo
		}
		if (
			isNaN(new Date(datesInfoInput.start.date).getTime()) ||
			isNaN(new Date(datesInfoInput.end.date).getTime())
		) {
			datesInfoInput = datesInfo
		}
		if (
			new Date(datesInfoInput.start.date).getTime() >
			new Date(datesInfoInput.end.date).getTime()
		) {
			const replacementDate: DatesRange = {
				start: { date: new Date(datesInfoInput.end.date) },
				end: { date: new Date(datesInfoInput.start.date) },
			}
			datesInfo = replacementDate
		}
		datesInfo.start.date = new Date(datesInfoInput.start.date)
		datesInfo.end.date = new Date(datesInfoInput.end.date)
	}

	return (
		<>
			<Panel>
				<div id='day-select'>
					<FOHDateRange dates={datesInfo} input={dateInput} />
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
