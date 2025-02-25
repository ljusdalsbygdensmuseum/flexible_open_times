import { Day } from '../types/foh-settings-types'
import DisplayHours from './foh-block-display-hours'

interface Props {
	days: Day[]
	showTitle: boolean
	header?: string
}
export default function DisplayDays({ days, showTitle, header }: Props) {
	const theHeader = header ? (
		<li>
			<h2>{header}</h2>
		</li>
	) : (
		''
	)
	const theWeek = days.map((day) => {
		//check if is empty
		if (day.hours.length < 1) {
			return
		}
		let theDay = ''
		if (showTitle) {
			theDay = day.title
		}

		return (
			<li>
				{theDay} <DisplayHours hours={day.hours} />
			</li>
		)
	})
	return (
		<ul>
			{theHeader}
			{theWeek}
		</ul>
	)
}
