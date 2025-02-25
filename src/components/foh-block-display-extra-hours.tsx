import { ExtraHoursData } from '../types/foh-settings-types'

interface Props {
	event: ExtraHoursData[]
}
export default function DisplayExtraHours({ event }: Props) {
	const theDays = event.map((theEvent) => {
		const title = theEvent.title
		const message = theEvent.message
		const dates = theEvent.dates
		return dates
	})
	console.log(theDays)
	return <li>hello</li>
}
