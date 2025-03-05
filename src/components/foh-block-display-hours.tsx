import { Hour } from '../types/foh-settings-types'
import fohFixMissingZero from '../utility/fohFixMissingZero'

interface Prorps {
	hours: Hour[]
}

export default function DisplayHours({ hours }: Prorps) {
	const displayHours = hours.map((hour, index, array) => {
		const comma = array.length - 1 == index ? '' : ', '
		const openHour = `${fohFixMissingZero(hour.open.hours)}.${fohFixMissingZero(
			hour.open.minutes
		)}`
		const closeHour = `${fohFixMissingZero(
			hour.close.hours
		)}.${fohFixMissingZero(hour.close.minutes)}`
		return (
			<li>
				{openHour} - {closeHour}
				{comma}
			</li>
		)
	})
	return <ul>{displayHours}</ul>
}
