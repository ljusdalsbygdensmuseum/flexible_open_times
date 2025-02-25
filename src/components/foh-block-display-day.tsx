import { Day } from '../types/foh-settings-types'
import DisplayHours from './foh-block-display-hours'

interface Props {
	days: Day[]
	showTitle: boolean
	altTitle?: string
	showClosed: boolean
}
export default function DisplayDays({
	days,
	showTitle,
	altTitle,
	showClosed,
}: Props) {
	const theWeek = days.map((day) => {
		//check if is empty
		if (day.hours.length < 1 && !showClosed) {
			return
		}
		let theDay = altTitle
		if (showTitle) {
			theDay = day.title
		}

		return (
			<ul>
				{theDay}
				{day.hours.length < 1 ? (
					<ul>
						<li>Closed</li>
					</ul>
				) : (
					<DisplayHours hours={day.hours} />
				)}
			</ul>
		)
	})
	return theWeek
}
