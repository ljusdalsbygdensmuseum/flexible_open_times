import {
    Panel,
} from '@wordpress/components';

import { FullWeek } from './foh-settings-fullweek';
import{ Day } from './foh-settings-types'

import { DaySelect } from './foh-day-select';
import{ Days } from './foh-day-select-types'

import isJSON from '../utility/is-json'


export default function FohExtraHours(){
    // get input and data
    const infoInput: HTMLInputElement | null = document.querySelector('#foh-extra-hours-meta_field')
    if (!infoInput) {
        throw new Error("#foh-extra-hours-meta_field not found")
    }
    let info: Day[] = [{dayInt: 0, hours:[{id: 0, open:{hours:0, minutes:0}, close:{hours:0, minutes:0}}]}]
    if (isJSON(infoInput.value)) {
        info = JSON.parse(infoInput.value)
    }
    const names = ['']

    const daysInfo: Days[] = []

    return (<>
        <Panel>
            <div id="day-select">
                <DaySelect/>
            </div>
        </Panel>
        <Panel>
            <div id="full-week">
                <FullWeek week={info} names={names} input={infoInput}/>
            </div>
        </Panel>
    </>)
}