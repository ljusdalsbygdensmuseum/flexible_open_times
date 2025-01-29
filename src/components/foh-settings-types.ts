import { TimeInputValue } from '@wordpress/components/build-types/date-time/types'

export type Hour = {
	id: number
	open: TimeInputValue
	close: TimeInputValue
}

export type Day = {
	dayInt: 0 | 1 | 2 | 3 | 4 | 5 | 6
	hours: Hour[]
}
