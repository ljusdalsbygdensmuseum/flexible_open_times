import apiFetch from '@wordpress/api-fetch'
import { useState, useEffect } from 'react'
import DisplayDays from '../components/foh-block-display-day'

import {
	AllHoursDataSchema,
	DaySchema,
	AllHoursData,
	Day,
} from '../types/foh-settings-types'
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
	const fullWeekInfo: AllHoursData = {
		normal_hours: [
			{ dayInt: 0, title: 'Monday', hours: [] },
			{ dayInt: 1, title: 'Tuseday', hours: [] },
			{ dayInt: 2, title: 'Wednesday', hours: [] },
			{ dayInt: 3, title: 'Thursday', hours: [] },
			{ dayInt: 4, title: 'Friday', hours: [] },
			{ dayInt: 5, title: 'Saturday', hours: [] },
			{ dayInt: 6, title: 'Sunday', hours: [] },
		],
		extra_hours: [],
		temporary_hours: [],
	}
	const week: Day = { dayInt: 0, title: 'Monday', hours: [] }

	const [allHours, setAllHours] = useState(fullWeekInfo)

	//Normal hours
	// get the setting
	useEffect(() => {
		apiFetch({ path: '/flexible_open_hours/v1/normal_hours' }).then(
			(settings) => {
				if (typeof settings == 'object' && settings != undefined) {
					setAllHours(() => {
						if (AllHoursDataSchema.safeParse(settings).success) {
							return AllHoursDataSchema.parse(settings)
						} else {
							console.log(AllHoursDataSchema.safeParse(settings))
							return fullWeekInfo
						}
					})
				}
			}
		)
	}, [])

	//Extra hours
	console.log(allHours)
	return <DisplayDays showTitle={true} days={allHours.normal_hours} />
}
