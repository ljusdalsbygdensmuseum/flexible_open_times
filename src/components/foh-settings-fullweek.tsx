import {
    PanelBody,
    PanelRow,
    Button
} from '@wordpress/components';

import { SyntheticEvent, useState } from 'react';

import{ Day, Hour } from './foh-settings-types'
import { Times } from './foh-settings-times';

interface Props {
    week: Day[]
    names: string[]
    input: HTMLInputElement
}

export function FullWeek(props: Props) {
    let hourIdInc = 0
    const theWeek = props.week.map((dayObj: Day)=>{

        const [hours, setHours] = useState(dayObj.hours)

        const addMoreHours = () => {
            const emptyHoursObj: Hour ={
                id: hourIdInc++,
                open:{
                    hours: 0,
                    minutes: 0,
                },
                close:{
                    hours: 0,
                    minutes: 0,
                }
            }
            setHours([...hours, emptyHoursObj])

            const newWeek = props.week.concat([])
            newWeek[dayObj.dayInt].hours = [...hours, emptyHoursObj]

            props.input.value = JSON.stringify(newWeek)
        }

        const removeItem = (item: Hour) => {
            const newHours = props.week[dayObj.dayInt].hours.filter((compareItem)=> compareItem != item)

            setHours([...newHours])

            const newWeek = props.week.concat([])
            newWeek[dayObj.dayInt].hours = [...newHours]

            props.input.value = JSON.stringify(newWeek)
        }

        return(<>
            <PanelBody title={props.names[dayObj.dayInt]}>
                <PanelRow>
                    <Times hours={hours} onRemoveItem={removeItem}/>
                </PanelRow>
                <PanelRow>
                    <Button variant='secondary' onClick={addMoreHours}>Add More</Button>
                </PanelRow>
            </PanelBody>
        </>)
    })
    
    return theWeek
}
