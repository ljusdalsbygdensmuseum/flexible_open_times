import {
    Panel,
    ToggleControl
} from '@wordpress/components'

import { FullWeek } from './foh-settings-fullweek'
import{ Day } from './foh-settings-types'

import { DaySelect } from './foh-day-select'
import { DatePickerEvent } from "@wordpress/components/build-types/date-time/types"

import isJSON from '../utility/is-json'
import { useState } from 'react'


export default function FohExtraHours(){
    //get input and data
    //hours
    const hoursInput: HTMLInputElement | null = document.querySelector('#foh-extra-hours_hours_field')
    if (!hoursInput) {
        throw new Error("#foh-extra-hours_hours_field not found")
    }
    let hoursinfo: Day[] = [{dayInt: 0, hours:[{id: 0, open:{hours:0, minutes:0}, close:{hours:0, minutes:0}}]}]
    if (isJSON(hoursInput.value)) {
        hoursinfo = JSON.parse(hoursInput.value)
    }
    const names = ['']

    // date
    const dateInput: HTMLInputElement | null = document.querySelector('#foh-extra-hours_dates_field')
    if (!dateInput) {
        throw new Error("#foh-extra-hours_dates_field not found")
    }
    let datesInfo: DatePickerEvent[] = []
    if (isJSON(dateInput.value)) {
        datesInfo = JSON.parse(dateInput.value)
    }
    
    //---
    //closed

    const [closed, setClosed] = useState(false)

    return (<>
        <Panel>
            <h3>Dates</h3>
            <div id="day-select">
                <DaySelect dates={datesInfo} input={dateInput}/>
            </div>
        </Panel>
        <Panel>
            <h3>Hours</h3>
            <div id="full-week">
                <ToggleControl
                        label="Closed"
                        checked={closed}
                        onChange={(value)=> setClosed(() => {
                            hoursInput.value = ''
                            return value
                        })}
                />
                {!closed &&
                    <FullWeek week={hoursinfo} names={names} input={hoursInput}/>
                }
            </div>
        </Panel>
    </>)
}