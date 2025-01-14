import {
    PanelBody,
    PanelRow,
    Button
} from '@wordpress/components';

import { useState } from 'react';

import { Times, Hour } from './foh-settings-times';

interface Props {
    week: Day[]
    names: string[]
    input: HTMLInputElement
}

export type Day = {
    dayInt: 0 | 1 | 2 | 3 | 4 | 5 | 6
    hours: Hour[]
}

export function FullWeek(props: Props) {
    const theWeek = props.week.map((dayObj: Day)=>{

        const [hours, setHours] = useState(dayObj.hours)

        const addMoreHours = () => {
            const emptyHoursObj: Hour ={
                open:{
                    hours: 5,
                    minutes: 0,
                },
                close:{
                    hours: 0,
                    minutes: 0,
                }
            }
            setHours([...hours, emptyHoursObj])

            const newWeek = props.week
            props.input.value = JSON.stringify(props.week)
        }

        return(<>
            <PanelBody title={props.names[dayObj.dayInt]}>
                <PanelRow>
                    <Times hours={hours}/>
                </PanelRow>
                <PanelRow>
                    <Button variant='secondary' onClick={addMoreHours}>Add More</Button>
                </PanelRow>
            </PanelBody>
        </>)
    })
    
    return theWeek
}
