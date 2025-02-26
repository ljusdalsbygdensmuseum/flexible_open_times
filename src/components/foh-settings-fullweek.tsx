import { PanelBody, PanelRow, Button } from '@wordpress/components'

import { useState } from 'react'

import { Day, Hour, TimeInputValue } from '../types/foh-settings-types'
import { Times } from './foh-settings-times'
import { weekNames, singleWeekName } from '../utility/fohNames'

interface Props {
	week: Day[]
	input: HTMLInputElement
}

export function FullWeek({ week, input }: Props) {
	const [weekArray, setWeekArray] = useState(week)
	const theWeek = week.map((dayObj: Day, index, array) => {
		const [hours, setHours] = useState(dayObj)

		const title = array.length == 7 ? weekNames[index] : singleWeekName

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
			setWeekArray((oldWeek) => {
				const newHours = [...oldWeek[index], emptyHoursObj]
				const newWeek = oldWeek.concat([])
				newWeek[index] = newHours
				input.value = JSON.stringify(newWeek)
				return newWeek
			})
		}

		const removeItem = (itemIndex: number) => {
			setWeekArray((oldWeek) => {
				if (itemIndex < 0) {
					return oldWeek
				}
				const newWeek = oldWeek.concat([])
				newWeek[index].splice(itemIndex, 1)
				input.value = JSON.stringify(newWeek)
				return newWeek
			})
		}

		const changeItem = (
			newTime: TimeInputValue,
			open: boolean,
			itemIndex: number
		) => {
			setWeekArray((oldWeek) => {
				const newWeek = oldWeek.concat([])
				if (open) {
					newWeek[index][itemIndex].open = newTime
				} else if (!open) {
					newWeek[index][itemIndex].close = newTime
				}
				input.value = JSON.stringify(newWeek)
				return newWeek
			})
		}

		return (
			<>
				<PanelBody
					title={title}
					initialOpen={week[index].length > 0 ? true : false}
				>
					<Times
						hours={weekArray[index]}
						onRemoveItem={removeItem}
						onChangeItem={changeItem}
					/>
					<PanelRow>
						{week[index].length < 4 && (
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
