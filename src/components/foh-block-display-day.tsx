import { Day } from '../types/foh-settings-types'
import DisplayHours from './foh-block-display-hours'
import { weekNames } from '../utility/fohNames'

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
	const theWeek = days.map((day, index) => {
		//check if is empty
		if (day.length < 1) {
			return
		}
		let theDay = ''
		if (showTitle) {
			theDay = weekNames[index]
		}

		return (
			<li>
				{theDay} <DisplayHours hours={day} />
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
