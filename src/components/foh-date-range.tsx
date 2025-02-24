import { useState } from 'react'
import { DatePicker, PanelBody } from '@wordpress/components'
import { DatesRange, DatePickerEvent } from '../types/foh-settings-types'

interface Props {
	dates: number[]
	input: HTMLInputElement[]
}
export function FOHDateRange({ dates, input }: Props) {
	const getAllDates = (range: number[]) => {
		let allDatesArray: DatePickerEvent[] = []
		let loopDate = new Date(range[0])

		while (loopDate <= new Date(range[1])) {
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
					new Date(oldDates[0]).toDateString() ||
				new Date(newDate).toDateString() == new Date(oldDates[1]).toDateString()
			) {
				return oldDates
			}
			if (new Date(newDate) < new Date(oldDates[0])) {
				changeDates[0] = new Date(newDate).getTime()
			}
			if (new Date(newDate) > new Date(oldDates[1])) {
				changeDates[1] = new Date(newDate).getTime()
			}
			if (
				new Date(newDate) > new Date(oldDates[0]) &&
				new Date(newDate) < new Date(oldDates[1])
			) {
				const endRange =
					new Date(oldDates[1]).getTime() - new Date(newDate).getTime()
				const startRange =
					new Date(newDate).getTime() - new Date(oldDates[0]).getTime()

				if (startRange >= endRange) {
					changeDates[1] = new Date(newDate).getTime()
				} else if (startRange < endRange) {
					changeDates[0] = new Date(newDate).getTime()
				}
			}
			setAllDates(() => {
				return getAllDates(changeDates)
			})
			return changeDates
		})

		input[0].value = String(dateRange[0])
		input[1].value = String(dateRange[1])
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
