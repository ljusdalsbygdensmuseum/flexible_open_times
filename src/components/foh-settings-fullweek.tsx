import { PanelBody, PanelRow, Button } from '@wordpress/components'
import { TimeInputValue } from '@wordpress/components/build-types/date-time/types'

import { useState } from 'react'

import { Day, Hour } from '../types/foh-settings-types'
import { Times } from './foh-settings-times'

interface Props {
	week: Day[]
	input: HTMLInputElement
}

export function FullWeek({ week, input }: Props) {
	const theWeek = week.map((dayObj: Day, index) => {
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
			setHours((oldHours) => {
				const newHours = [...oldHours, emptyHoursObj]

				const newWeek = week.concat([])
				newWeek[index].hours = newHours

				input.value = JSON.stringify(newWeek)

				return newHours
			})
		}

		const removeItem = (item: Hour) => {
			setHours((oldHours) => {
				const newHours = week[index].hours.filter(
					(compareItem) => compareItem != item
				)
				const newWeek = week.concat([])
				newWeek[index].hours = [...newHours]

				input.value = JSON.stringify(newWeek)

				return newHours
			})
		}

		const changeItem = (newTime: TimeInputValue, open: boolean, item: Hour) => {
			const hourIndex = week[index].hours.indexOf(item)

			if (open) {
				week[index].hours[hourIndex].open = newTime
			} else if (!open) {
				week[index].hours[hourIndex].close = newTime
			}

			setHours(() => [...week[index].hours])
			input.value = JSON.stringify(week)
		}

		return (
			<>
				<PanelBody
					title={week[index].title}
					initialOpen={week[index].hours.length > 0 ? true : false}
				>
					<Times
						hours={hours}
						onRemoveItem={removeItem}
						onChangeItem={changeItem}
					/>
					<PanelRow>
						{week[index].hours.length < 4 && (
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
