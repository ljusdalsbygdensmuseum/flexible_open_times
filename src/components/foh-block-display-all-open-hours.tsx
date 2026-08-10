import apiFetch from '@wordpress/api-fetch'
import { useState, useEffect } from 'react'
import DisplayDays from '../components/foh-block-display-day'
import DisplayExtraHours from '../components/foh-block-display-extra-hours'
import DisplayTemporaryHours from '../components/foh-block-display-temporary-hours'
import { __ } from '@wordpress/i18n'

import { AllHoursDataSchema, AllHoursData } from '../types/foh-settings-types'

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
		settings: {
			week_name_format: 0,
			week_name_format_extra: 0,
			hour_name_format: 0,
		},
		normal_hours: [[], [], [], [], [], [], []],
		extra_hours: [],
		temporary_hours: [],
	}

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
			},
		)
	}, [])

	//normal and temporary hours
	const normalHours =
		showTemporary && allHours.temporary_hours.length ? (
			<DisplayTemporaryHours
				temporary={allHours.temporary_hours}
				normal={allHours.normal_hours}
				weekNameFormat={allHours.settings.week_name_format}
				hourNameFormat={allHours.settings.hour_name_format}
			/>
		) : (
			<DisplayDays
				showTitle={true}
				days={allHours.normal_hours}
				header={__('Open hour', 'foh-domain')}
				weekNameFormat={allHours.settings.week_name_format}
				hourNameFormat={allHours.settings.hour_name_format}
			/>
		)

	//Extra hours
	const ExtraHours = showExtra ? (
		<DisplayExtraHours
			event={allHours.extra_hours}
			weekNameFormat={allHours.settings.week_name_format_extra}
			hourNameFormat={allHours.settings.hour_name_format}
		/>
	) : (
		''
	)

	return (
		<>
			{normalHours}
			{ExtraHours}
		</>
	)
}
