import { PanelBody, PanelRow, Button } from '@wordpress/components'
import { TimeInputValue } from '@wordpress/components/build-types/date-time/types'

import { useState } from 'react'

import { Day, Hour } from '../types/foh-settings-types'
import { Times } from './foh-settings-times'

interface Props {
	week: Day[]
	input: HTMLInputElement
}

export function FullWeek(props: Props) {
	const theWeek = props.week.map((dayObj: Day, index) => {
		const [hours, setHours] = useState(dayObj.hours)

		const addMoreHours = () => {
			const emptyHoursObj: Hour = {
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
			newWeek[index].hours = [...hours, emptyHoursObj]

			props.input.value = JSON.stringify(newWeek)
		}

		const removeItem = (item: Hour) => {
			const newHours = props.week[index].hours.filter(
				(compareItem) => compareItem != item
			)

			setHours(() => [...newHours])

			const newWeek = props.week.concat([])
			newWeek[index].hours = [...newHours]

			props.input.value = JSON.stringify(newWeek)
		}

		const changeItem = (newTime: TimeInputValue, open: boolean, item: Hour) => {
			const hourIndex = props.week[index].hours.indexOf(item)

			if (open) {
				props.week[index].hours[hourIndex].open = newTime
			} else if (!open) {
				props.week[index].hours[hourIndex].close = newTime
			}

			setHours(() => [...props.week[index].hours])
			props.input.value = JSON.stringify(props.week)
		}

		return (
			<>
				<PanelBody
					title={props.week[index].title}
					initialOpen={props.week[index].hours.length > 0 ? true : false}
				>
					<Times
						hours={hours}
						onRemoveItem={removeItem}
						onChangeItem={changeItem}
					/>
					<PanelRow>
						{props.week[index].hours.length < 4 && (
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
