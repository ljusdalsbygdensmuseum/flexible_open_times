import DisplayHours from './foh-block-display-hours'
import { ExtraHoursData } from '../types/foh-settings-types'
import { __ } from '@wordpress/i18n'
import { weekNames } from '../utility/fohNames'

interface Props {
	event: ExtraHoursData[]
	weekNameFormat: number
	hourNameFormat: number
}
export default function DisplayExtraHours({
	event,
	weekNameFormat,
	hourNameFormat,
}: Props) {
	// sets which weekNames to use
	let weekNamesFormated = weekNames.default

	if (weekNameFormat == 1) {
		weekNamesFormated = weekNames.pointing
	}
	if (weekNameFormat == 2) {
		weekNamesFormated = weekNames.short
	}
	if (weekNameFormat == 3) {
		weekNamesFormated = ['', '', '', '', '', '', '']
	}

	const theDays = event.map((theEvent) => {
		const title = theEvent.title ? (
			<li>
				<h2>{theEvent.title}</h2>
			</li>
		) : (
			''
		)
		const message = theEvent.message ? <li>{theEvent.message}</li> : ''
		// sort dates and map to be easier to remove duplicates
		let sortedDates = theEvent.dates
			.sort((dateA, dateB) => {
				return new Date(dateA.date).getTime() - new Date(dateB.date).getTime()
			})
			.map((date) => {
				const thedate = new Date(date.date)
				return `${thedate.getFullYear()}-${
					thedate.getMonth() + 1
				}-${thedate.getDate()}`
			})
		// remove duplicates
		sortedDates = [...new Set(sortedDates)]

		const dates = sortedDates.map((date, index, array) => {
			let comma = ', '

			if (array.length - 1 == index) {
				comma = ''
			} else if (array.length - 2 == index) {
				comma = ` ${__('and', 'foh-domain')} `
			}

			return (
				<li>{`${weekNamesFormated[new Date(date).getDay()]} ${new Date(
					date,
				).getDate()}/${new Date(date).getMonth() + 1}${comma}`}</li>
			)
		})
		const hours = theEvent.hours[0].length ? (
			<DisplayHours hours={theEvent.hours[0]} hourNameFormat={hourNameFormat} />
		) : (
			'Closed'
		)

		return (
			<ul className='foh-display__wrap'>
				{title}
				<ul>{message}</ul>

				<ul className='foh-display__dates'>{dates}</ul>

				<ul className='foh-display__hours'>
					<li>{hours}</li>
				</ul>
			</ul>
		)
	})
	return theDays
}
