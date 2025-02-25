import { ExtraHoursData } from '../types/foh-settings-types'

interface Props {
	event: ExtraHoursData[]
}
export default function DisplayExtraHours({ event }: Props) {
	const theDays = event.map((theEvent) => {
		const title = theEvent.title
		const message = theEvent.message
		// sort dates and map to be easier to remove duplicates
		let sortedDates = theEvent.dates
			.sort((dateA, dateB) => {
				return new Date(dateA.date).getTime() - new Date(dateB.date).getTime()
			})
			.map((date) => {
				const thedate = new Date(date.date)
				return `${thedate.getFullYear()}-${thedate.getMonth()}-${thedate.getDate()}`
			})
		// remove duplicates
		sortedDates = [...new Set(sortedDates)]

		const dates = sortedDates.map((date) => {
			return <li>{new Date(date).getDate()}</li>
		})

		return (
			<ul>
				<li>{title}</li>
				<li>{message}</li>
				<ul>{dates}</ul>
			</ul>
		)
	})
	return theDays
}
