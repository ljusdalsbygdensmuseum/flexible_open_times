import { useState } from 'react'
import { DatePicker, PanelBody } from '@wordpress/components'
import { DatesRange } from './foh-metabox-temporary-types'
import { DatePickerEvent } from '@wordpress/components/build-types/date-time/types'

interface Props {
	dates: DatesRange
	input: HTMLInputElement
}
export function FOHDateRange({ dates, input }: Props) {
	const getAllDates = (range: DatesRange) => {
		let allDatesArray: DatePickerEvent[] = []
		let loopDate = new Date(range.start.date)

		while (loopDate <= new Date(range.end.date)) {
			allDatesArray.push({ date: new Date(loopDate) })
			loopDate = new Date(loopDate.setDate(loopDate.getDate() + 1))
		}
		return allDatesArray
	}

	const [dateRange, setDateRange] = useState(dates)
	const [allDates, setAllDates] = useState(getAllDates(dateRange))

	const onDateClick = (newDate: Date) => {
		setDateRange((oldDates) => {
			let changeDates = oldDates
			if (
				new Date(newDate).toDateString() ==
					new Date(oldDates.start.date).toDateString() ||
				new Date(newDate).toDateString() ==
					new Date(oldDates.end.date).toDateString()
			) {
				return oldDates
			}
			if (new Date(newDate) < new Date(oldDates.start.date)) {
				changeDates.start.date = new Date(newDate)
			}
			if (new Date(newDate) > new Date(oldDates.end.date)) {
				changeDates.end.date = new Date(newDate)
			}
			if (
				new Date(newDate) > new Date(oldDates.start.date) &&
				new Date(newDate) < new Date(oldDates.end.date)
			) {
				const endRange =
					new Date(oldDates.end.date).getTime() - new Date(newDate).getTime()
				const startRange =
					new Date(newDate).getTime() - new Date(oldDates.start.date).getTime()

				if (startRange >= endRange) {
					changeDates.end.date = new Date(newDate)
				} else if (startRange < endRange) {
					changeDates.start.date = new Date(newDate)
				}
			}
			setAllDates(() => {
				return getAllDates(changeDates)
			})
			return changeDates
		})

		input.value = JSON.stringify(dateRange)
	}
	return (
		<>
			<PanelBody>
				<DatePicker
					startOfWeek={1}
					currentDate={null}
					events={allDates}
					onChange={(newDate) => onDateClick(new Date(newDate))}
				/>
			</PanelBody>
		</>
	)
}
