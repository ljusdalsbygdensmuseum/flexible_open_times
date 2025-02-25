import DisplayDays from '../components/foh-block-display-day'
import { Day, TemporaryHoursData } from '../types/foh-settings-types'

interface Props {
	temporary: TemporaryHoursData[]
	normal: Day[]
}
export default function DisplayTemporaryHours({ temporary, normal }: Props) {
	const theDays = temporary.map((theTemporary) => {
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
					header='Normal open hours'
				/>
			</>
		)
	})
	return theDays
}
