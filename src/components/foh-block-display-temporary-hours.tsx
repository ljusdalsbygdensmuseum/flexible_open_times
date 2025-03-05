import DisplayDays from '../components/foh-block-display-day'
import { Day, TemporaryHoursData } from '../types/foh-settings-types'
import {
	defaultNormalTitle,
	backName,
	toNormalHours,
} from '../utility/fohNames'

import { useState } from 'react'

interface Props {
	temporary: TemporaryHoursData[]
	normal: Day[]
}
export default function DisplayTemporaryHours({ temporary, normal }: Props) {
	const [showNormal, setShowNormal] = useState(false)

	const allTemporary = temporary.map((temporary) => {
		const title = temporary.title
		return (
			<DisplayDays showTitle={true} days={temporary.hours} header={title} />
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
					{showNormal ? `${backName}` : `${toNormalHours}`}
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
					header={defaultNormalTitle}
				/>
			)}
			{changeButton}
		</div>
	)
}
