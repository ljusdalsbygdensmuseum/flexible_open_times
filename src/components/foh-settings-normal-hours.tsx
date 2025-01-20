import {
    Panel,
} from '@wordpress/components';

import { FullWeek } from './foh-settings-fullweek';
import{ Day } from './foh-settings-types'

export default function FohSettingsNormalHours(){
    // get input and data
    const infoInput: HTMLInputElement | null = document.querySelector('#foh-normal-open-hours')
    if (!infoInput) {
        throw new Error("#foh-normal-open-hours not found")
    }
    const info: Day[] = JSON.parse(infoInput.value)
    const weekNames = ['Monday', 'Tuseday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']

    return (
        <Panel>
            <div id="full-week">
                <FullWeek week={info} names={weekNames} input={infoInput}/>
            </div>
        </Panel>
    )
}