import {
    Flex,
    FlexItem,
    FlexBlock,
    TimePicker,
    Button
} from '@wordpress/components';

import{ Day, Hour } from './foh-settings-types'
import { useState } from 'react';

interface Props {
    hours: Hour[]
    week: Day[]
    dayId: number
}

export function Times(props: Props){




    const theTimes = props.hours.map((timeObj: Hour)=>{
        const [time, setTime] = useState(timeObj)

        const editHours = () => {

        }

        const removeHours = () => {
            const index = props.hours.indexOf(timeObj)
            
        }
        console.log('hello')

        return(<>
            <Flex>
                <FlexItem>
                    <TimePicker.TimeInput label='Open' value={timeObj.open}/>
                </FlexItem>
                <FlexItem>
                    <TimePicker.TimeInput label='Close' value={timeObj.close}/>
                </FlexItem>
                <FlexBlock>
                    <Button isDestructive variant="tertiary" >Remove</Button>
                </FlexBlock>
            </Flex>      
        </>)
    })
    
    return theTimes
}

                    