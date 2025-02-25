import DisplayHours from './foh-block-display-hours'
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
				return `${thedate.getFullYear()}-${
					thedate.getMonth() + 1
				}-${thedate.getDate()}`
			})
		// remove duplicates
		sortedDates = [...new Set(sortedDates)]

		const dates = sortedDates.map((date, index, array) => {
			const comma = array.length - 1 == index ? '' : ', '
			return (
				<li>{`${new Date(date).getDate()}/${
					new Date(date).getMonth() + 1
				}${comma}`}</li>
			)
		})
		console.log(theEvent.hours)
		const hours = theEvent.hours[0].hours.length ? (
			<DisplayHours hours={theEvent.hours[0].hours} />
		) : (
			'Closed'
		)

		return (
			<ul>
				<li>
					<h2>{title}</h2>
				</li>
				<li>{message}</li>
				<ul>{dates}</ul>
				<li>{hours}</li>
			</ul>
		)
	})
	return theDays
}
