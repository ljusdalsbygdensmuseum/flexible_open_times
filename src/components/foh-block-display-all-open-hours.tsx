import apiFetch from '@wordpress/api-fetch'
import { useState, useEffect } from 'react'
import DisplayDays from '../components/foh-block-display-day'
import DisplayExtraHours from '../components/foh-block-display-extra-hours'
import DisplayTemporaryHours from '../components/foh-block-display-temporary-hours'
import { __ } from '@wordpress/i18n'

import { motion, LayoutGroup } from 'motion/react'

import { AllHoursDataSchema, AllHoursData } from '../types/foh-settings-types'

interface Props {
	showExtra: boolean
	showTemporary: boolean
	title: string
	animateOnEnter: any
}
export default function DisplayAllOpenHours({
	showExtra,
	showTemporary,
	title,
	animateOnEnter,
}: Props) {
	const [allHours, setAllHours] = useState<AllHoursData | null>(null)

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
							return null
						}
					})
				}
			},
		)
	}, [])

	if (allHours === null) {
		return (
			<LayoutGroup>
				<h2>{__('Open hours', 'foh-domain')}</h2>
				<motion.div
					className='foh-display__spinner'
					aria-label={__('Loading open hours')}
					animate={{ transform: 'rotate(360deg)' }}
					transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
				></motion.div>
			</LayoutGroup>
		)
	}

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
				header={__('Open hours', 'foh-domain')}
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
			<motion.div
				initial={animateOnEnter && { opacity: 0, y: 15 }}
				whileInView={animateOnEnter && { opacity: 1, y: 0 }}
				viewport={animateOnEnter && { once: true, margin: '-20px' }}
			>
				<LayoutGroup>
					{normalHours}
					{ExtraHours}
				</LayoutGroup>
			</motion.div>
		</>
	)
}
