import apiFetch from '@wordpress/api-fetch'
import { useState, useEffect } from 'react'
import DisplayDays from '../components/foh-block-display-day'

import { Day } from '../components/foh-settings-types'
import { DatePickerEvent } from '@wordpress/components/build-types/date-time/types'

interface Props {
	showExtra: boolean
	showTemporary: boolean
	title: string
}
export default function DisplayAllOpenHours({
	showExtra,
	showTemporary,
	title,
}: Props) {
	const fullWeekInfo: Day[] = [
		{ dayInt: 0, title: 'Monday', hours: [] },
		{ dayInt: 1, title: 'Tuseday', hours: [] },
		{ dayInt: 2, title: 'Wednesday', hours: [] },
		{ dayInt: 3, title: 'Thursday', hours: [] },
		{ dayInt: 4, title: 'Friday', hours: [] },
		{ dayInt: 5, title: 'Saturday', hours: [] },
		{ dayInt: 6, title: 'Sunday', hours: [] },
	]

	const dayInfo: Day = { dayInt: 0, title: '', hours: [] }
	const dateInfo: DatePickerEvent[] = []

	const [normalHours, setNormalHours] = useState(fullWeekInfo)
	const [extraHours, setExtraHours] = useState([])

	// Get the data
	useEffect(() => {
		apiFetch({ path: '/flexible_open_hours/v1/normal_hours' }).then((data) => {
			if (typeof data == 'object' && data != undefined) {
				if (hasOwnProperty(data, 'normal_hours')) {
					setNormalHours(data.normal_hours)
				}
				if (data.hasOwnProperty('extra_hours')) {
					setExtraHours(data.extra_hours)
				}
			}
		})
	}, [])

	// Extra Hours
	const displayExtraHours = extraHours.map((extraHour) => {
		if (extraHour === undefined) {
			return
		}
		const altTitle = extraHour.dates.map((date: DatePickerEvent) => {
			date.date = new Date(date.date)
			return `${date.getDate()}/${date.getMonth()} `
		})
		return (
			<DisplayDays
				showTitle={false}
				altTitle={altTitle}
				showClosed={true}
				days={extraHour.hours}
			/>
		)
	})

	return (
		<>
			{title.length > 0 && <h2>{title}</h2>}
			<DisplayDays showTitle={true} showClosed={false} days={normalHours} />
			{displayExtraHours}
		</>
	)
}
