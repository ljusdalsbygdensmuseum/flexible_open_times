import { Hour } from '../types/foh-settings-types'
import fohFixMissingZero from '../utility/fohFixMissingZero'

interface Prorps {
	hours: Hour[]
	hourNameFormat: number
}

export default function DisplayHours({ hours, hourNameFormat }: Prorps) {
	function minutes(minutes: number) {
		if (hourNameFormat == 0 || minutes) {
			return `.${fohFixMissingZero(minutes)}`
		}
		return ''
	}

	const displayHours = hours.map((hour, index, array) => {
		const comma = array.length - 1 == index ? '' : ', '
		const openHour = `${fohFixMissingZero(hour.open.hours)}${minutes(
			hour.open.minutes,
		)}`
		const closeHour = `${fohFixMissingZero(hour.close.hours)}${minutes(
			hour.close.minutes,
		)}`
		return (
			<li>
				{openHour} - {closeHour}
				{comma}
			</li>
		)
	})
	return <ul>{displayHours}</ul>
}
