import { Panel, PanelBody } from '@wordpress/components'

import { FullWeek } from './foh-settings-fullweek'
import { FOHDateRange } from './foh-date-range'
import { Day, DaysSchema } from '../types/foh-settings-types'

import isJSON from '../utility/is-json'
import { __ } from '@wordpress/i18n'

export function FohTemporaryHours() {
	//get input and data
	//hours
	const hoursInput: HTMLInputElement | null = document.querySelector(
		'#foh-temporary-hours_hours_field',
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
		'#foh-temporary-hours_hours_min_date_field',
	)
	const maxdateInput: HTMLInputElement | null = document.querySelector(
		'#foh-temporary-hours_hours_max_date_field',
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
			<Panel header={__('Dates', 'foh-domain')}>
				<PanelBody>
					<div id='day-select'>
						<FOHDateRange
							dates={[minDate, maxDate]}
							input={[mindateInput, maxdateInput]}
						/>
					</div>
				</PanelBody>
			</Panel>
			<Panel header={__('Open hours', 'foh-domain')}>
				<PanelBody>
					<p className='description'>
						{__(
							'fill in your open hours. If all are left empty it will say it is closed',
							'foh-domain',
						)}
					</p>
					<div id='full-week'>
						<FullWeek week={hoursinfo} input={hoursInput} />
					</div>
				</PanelBody>
			</Panel>
		</>
	)
}
