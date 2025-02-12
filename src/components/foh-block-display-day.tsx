import { Day } from './foh-settings-types'
import DisplayHours from './foh-block-display-hours'

interface Props {
	days: Day[]
	showTitle: boolean
}
export default function DisplayDays({ days, showTitle }: Props) {
	const theWeek = days.map((day) => {
		//check if is empty
		if (day.hours.length < 1) {
			return
		}
		let theDay = ''
		if (showTitle) {
			theDay = day.title
		}
		console.log(day.title)

		return (
			<li>
				{theDay} <DisplayHours hours={day.hours} />
			</li>
		)
	})
	return theWeek
}
