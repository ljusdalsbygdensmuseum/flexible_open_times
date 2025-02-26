import DisplayDays from '../components/foh-block-display-day'
import { Day, TemporaryHoursData } from '../types/foh-settings-types'
import { defaultNormalTitle } from '../utility/fohNames'

interface Props {
	temporary: TemporaryHoursData[]
	normal: Day[]
}
export default function DisplayTemporaryHours({ temporary, normal }: Props) {
	const theDays = temporary.map((theTemporary, index) => {
		const title = theTemporary.title
		const allTemporary = temporary.map((temporary) => {
			return (
				<DisplayDays showTitle={true} days={temporary.hours} header={title} />
			)
		})

		return (
			<>
				{allTemporary}
				<DisplayDays
					showTitle={true}
					days={normal}
					header={defaultNormalTitle}
				/>
			</>
		)
	})
	return theDays
}
