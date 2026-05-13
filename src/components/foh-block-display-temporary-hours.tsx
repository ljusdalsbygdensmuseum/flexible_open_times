import DisplayDays from '../components/foh-block-display-day'
import { Day, TemporaryHoursData } from '../types/foh-settings-types'
import { normalTitle } from '../utility/fohNames'

import { useState } from 'react'

interface Props {
	weekNameFormat: number
	temporary: TemporaryHoursData[]
	normal: Day[]
}
export default function DisplayTemporaryHours({
	temporary,
	normal,
	weekNameFormat,
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
			/>
		)
	})

	const changeButton = (
		<ul>
			<li>
				<button
					onClick={(e) => {
						const target = e.target as HTMLElement
						target
							.closest('.foh-display__full-temporary')
							?.classList.add('foh-display__left-out')
						setTimeout(() => {
							setShowNormal((old) => {
								return !old
							})
							target
								.closest('.foh-display__full-temporary')
								?.classList.remove('foh-display__left-out')
						}, 300)
					}}
					className='foh-display__button'
				>
					{showNormal ? `${normalTitle.backName}` : `${normalTitle.showNormal}`}
				</button>
			</li>
		</ul>
	)

	return (
		<div className='foh-display__full-temporary' aria-live='polite'>
			{!showNormal && allTemporary}
			{showNormal && (
				<DisplayDays
					showTitle={true}
					days={normal}
					header={normalTitle.whenTemp}
					weekNameFormat={weekNameFormat}
				/>
			)}
			{changeButton}
		</div>
	)
}
