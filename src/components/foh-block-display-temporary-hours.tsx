import DisplayDays from '../components/foh-block-display-day'
import { Day, TemporaryHoursData } from '../types/foh-settings-types'
import { defaultNormalTitle, backName } from '../utility/fohNames'

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
			<li
				onClick={() => {
					setShowNormal((old) => {
						return !old
					})
				}}
				className='foh-display__button'
			>
				{showNormal ? `<< ${backName}` : `${defaultNormalTitle} >>`}
			</li>
		</ul>
	)

	return (
		<>
			{!showNormal && allTemporary}
			{showNormal && (
				<DisplayDays
					showTitle={true}
					days={normal}
					header={defaultNormalTitle}
				/>
			)}
			{changeButton}
		</>
	)
}
