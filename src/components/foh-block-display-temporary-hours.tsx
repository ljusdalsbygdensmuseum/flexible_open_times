import DisplayDays from '../components/foh-block-display-day'
import { Day, TemporaryHoursData } from '../types/foh-settings-types'

import { __ } from '@wordpress/i18n'

import { useState } from 'react'
import { AnimatePresence, LayoutGroup, motion } from 'motion/react'

interface Props {
	weekNameFormat: number
	hourNameFormat: number
	temporary: TemporaryHoursData[]
	normal: Day[]
}
export default function DisplayTemporaryHours({
	temporary,
	normal,
	weekNameFormat,
	hourNameFormat,
}: Props) {
	const [showNormal, setShowNormal] = useState(false)

	const allTemporary = temporary.map((temporary) => {
		const title = temporary.title
		return (
			<DisplayDays
				showTitle={true}
				days={temporary.hours}
				header={title}
				weekNameFormat={weekNameFormat}
				hourNameFormat={hourNameFormat}
			/>
		)
	})

	const changeButton = (
		<button
			onClick={(e) => {
				const target = e.target as HTMLElement

				setShowNormal((old) => {
					return !old
				})
			}}
			className='foh-display__button'
		>
			{showNormal
				? `${__('Back to current hours', 'foh-domain')}`
				: `${__('Show normal open hours', 'foh-domain')}`}
		</button>
	)

	return (
		<div className='foh-display__full-temporary' aria-live='polite'>
			<AnimatePresence initial={false} mode='popLayout'>
				{showNormal ? (
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						transition={{ duration: 0.5 }}
						key='normal_days'
					>
						<DisplayDays
							showTitle={true}
							days={normal}
							header={__('Normal open hours', 'foh-domain')}
							weekNameFormat={weekNameFormat}
							hourNameFormat={hourNameFormat}
						/>
					</motion.div>
				) : (
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						transition={{ duration: 0.5 }}
						key='temp_days'
					>
						{allTemporary}
					</motion.div>
				)}
			</AnimatePresence>

			<motion.div layout>{changeButton}</motion.div>
		</div>
	)
}
