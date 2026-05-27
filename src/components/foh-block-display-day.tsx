import { Day } from '../types/foh-settings-types'
import DisplayHours from './foh-block-display-hours'
import { weekNames } from '../utility/fohNames'

interface Props {
	days: Day[]
	weekNameFormat: number
	hourNameFormat: number
	showTitle: boolean
	header?: string
}
export default function DisplayDays({
	days,
	showTitle,
	header,
	weekNameFormat,
	hourNameFormat,
}: Props) {
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
			theDay = weekNameFormat
				? weekNames.short[index]
				: weekNames.default[index]
		}

		return (
			<li>
				{theDay} <DisplayHours hours={day} hourNameFormat={hourNameFormat} />
			</li>
		)
	})
	return (
		<ul className='foh-display__days'>
			{theHeader}
			<ul className='foh-display__hours'>{theWeek}</ul>
		</ul>
	)
}
