import DisplayDays from '../components/foh-block-display-day'
import { Day, TemporaryHoursData } from '../types/foh-settings-types'

import { __ } from '@wordpress/i18n'

import { useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'

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
			<AnimatePresence initial={false} mode='wait'>
				{showNormal ? (
					<motion.div
						initial={{ opacity: 0, x: -10 }}
						animate={{ opacity: 1, x: 0 }}
						exit={{ opacity: 0, x: -10 }}
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
						initial={{ opacity: 0, x: -10 }}
						animate={{ opacity: 1, x: 0 }}
						exit={{ opacity: 0, x: -10 }}
						transition={{ duration: 0.5 }}
						key='temp_days'
					>
						{allTemporary}
					</motion.div>
				)}
			</AnimatePresence>

			{changeButton}
		</div>
	)
}
