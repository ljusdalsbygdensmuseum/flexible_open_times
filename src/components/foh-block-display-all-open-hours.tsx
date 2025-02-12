import apiFetch from '@wordpress/api-fetch'
import { useState } from 'react'
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
	const [extraHours, setExtraHours] = useState(dayInfo)
	const [extraDates, setExtraDates] = useState(dateInfo)

	//Normal hours
	// get the setting
	apiFetch({ path: '/wp/v2/settings?foh_normal_open_hours' }).then(
		(settings) => {
			console.log(settings)
			if (
				typeof settings == 'object' &&
				settings != undefined &&
				settings.hasOwnProperty('foh_normal_open_hours')
			) {
				setNormalHours(JSON.parse(settings.foh_normal_open_hours))
			}
		}
	)

	//Extra hours

	return <DisplayDays showTitle={true} days={normalHours} />
}
