import { PanelBody, PanelRow, Button } from '@wordpress/components'
import { TimeInputValue } from '@wordpress/components/build-types/date-time/types'

import { useState } from 'react'

import { Day, Hour } from './foh-settings-types'
import { Times } from './foh-settings-times'

interface Props {
	week: Day[]
	input: HTMLInputElement
}

export function FullWeek(props: Props) {
	let hourIdInc = 0
	const theWeek = props.week.map((dayObj: Day) => {
		const [hours, setHours] = useState(dayObj.hours)

		const addMoreHours = () => {
			const emptyHoursObj: Hour = {
				id: hourIdInc++,
				open: {
					hours: 0,
					minutes: 0,
				},
				close: {
					hours: 0,
					minutes: 0,
				},
			}
			setHours(() => [...hours, emptyHoursObj])

			const newWeek = props.week.concat([])
			newWeek[dayObj.dayInt].hours = [...hours, emptyHoursObj]

			props.input.value = JSON.stringify(newWeek)
		}

		const removeItem = (item: Hour) => {
			const newHours = props.week[dayObj.dayInt].hours.filter(
				(compareItem) => compareItem != item
			)

			setHours(() => [...newHours])

			const newWeek = props.week.concat([])
			newWeek[dayObj.dayInt].hours = [...newHours]

			props.input.value = JSON.stringify(newWeek)
		}

		const changeItem = (newTime: TimeInputValue, open: boolean, item: Hour) => {
			const hourIndex = props.week[dayObj.dayInt].hours.indexOf(item)

			if (open) {
				props.week[dayObj.dayInt].hours[hourIndex].open = newTime
			} else if (!open) {
				props.week[dayObj.dayInt].hours[hourIndex].close = newTime
			}

			setHours(() => [...props.week[dayObj.dayInt].hours])
			props.input.value = JSON.stringify(props.week)
		}

		return (
			<>
				<PanelBody
					title={props.week[dayObj.dayInt].title}
					initialOpen={
						props.week[dayObj.dayInt].hours.length > 0 ? true : false
					}
				>
					<Times
						hours={hours}
						onRemoveItem={removeItem}
						onChangeItem={changeItem}
					/>
					<PanelRow>
						{props.week[dayObj.dayInt].hours.length < 4 && (
							<Button variant='secondary' onClick={addMoreHours}>
								Add More
							</Button>
						)}
					</PanelRow>
				</PanelBody>
			</>
		)
	})

	return theWeek
}
