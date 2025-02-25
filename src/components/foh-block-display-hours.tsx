import { Hour } from '../types/foh-settings-types'
import fohFixMissingZero from '../utility/fohFixMissingZero'

interface Prorps {
	hours: Hour[]
}

export default function DisplayHours({ hours }: Prorps) {
	const displayHours = hours.map((hour) => {
		const openHour = `${fohFixMissingZero(
			hour.open.hours
		)} : ${fohFixMissingZero(hour.open.minutes)}`
		const closeHour = `${fohFixMissingZero(
			hour.close.hours
		)} : ${fohFixMissingZero(hour.close.minutes)}`
		return (
			<li>
				{openHour} - {closeHour}
			</li>
		)
	})
	return <ul>{displayHours}</ul>
}
