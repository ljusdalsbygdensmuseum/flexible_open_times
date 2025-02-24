import { Panel, PanelBody, ToggleControl } from '@wordpress/components'

import { FullWeek } from './foh-settings-fullweek'
import { Day } from '../types/foh-settings-types'

import { DaySelect } from './foh-day-select'
import { DatePickerEvent } from '@wordpress/components/build-types/date-time/types'

import isJSON from '../utility/is-json'
import { useState } from 'react'

export default function FohExtraHours() {
	//get input and data
	//hours
	const hoursInput: HTMLInputElement | null = document.querySelector(
		'#foh-extra-hours_hours_field'
	)
	if (!hoursInput) {
		throw new Error('#foh-extra-hours_hours_field not found')
	}
	let hoursinfo: Day[] = [{ dayInt: 0, title: 'Hours', hours: [] }]
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
		'#foh-extra-hours_dates_field'
	)
	const mindateInput: HTMLInputElement | null = document.querySelector(
		'#foh-extra-hours_min_date_field'
	)
	const maxdateInput: HTMLInputElement | null = document.querySelector(
		'#foh-extra-hours_max_date_field'
	)
	if (!dateInput || !mindateInput || !maxdateInput) {
		throw new Error('#foh-extra-hours_dates_field not found')
	}
	let datesInfo: DatePickerEvent[] = []
	if (isJSON(dateInput.value)) {
		datesInfo = JSON.parse(dateInput.value)
	}

	//---
	//closed
	let closedCheck = false
	if (hoursinfo[0].hours.length <= 0) {
		closedCheck = true
	}
	const [closed, setClosed] = useState(closedCheck)

	return (
		<>
			<Panel>
				<div id='day-select'>
					<DaySelect
						dates={datesInfo}
						input={[dateInput, mindateInput, maxdateInput]}
					/>
				</div>
			</Panel>
			<Panel>
				<div id='full-week'>
					<PanelBody>
						<ToggleControl
							label='Closed'
							checked={closed}
							onChange={(value) =>
								setClosed(() => {
									hoursInput.value = '[{"title": "Hours", "hours":[]}]'
									return value
								})
							}
						/>
					</PanelBody>
					{!closed && <FullWeek week={hoursinfo} input={hoursInput} />}
				</div>
			</Panel>
		</>
	)
}
