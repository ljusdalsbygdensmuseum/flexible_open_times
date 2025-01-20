import {
    Flex,
    FlexItem,
    FlexBlock,
    TimePicker,
    Button
} from '@wordpress/components';

import{ Hour } from './foh-settings-types'
import { useState } from 'react';

interface Props {
    hours: Hour[]
    onRemoveItem: (item: Hour) => void
}

export function Times({hours, onRemoveItem}: Props){




    const theTimes = hours.map((timeObj: Hour)=>{
        //const [timmmmme, setTimmmmme] = useState(timeObj)

        const editHours = () => {

        }

        const removeHours = () => {
            const index = hours.indexOf(timeObj)
            
        }

        return(<>
            <Flex>
                <FlexItem>
                    <TimePicker.TimeInput label='Open' value={timeObj.open}/>
                </FlexItem>
                <FlexItem>
                    <TimePicker.TimeInput label='Close' value={timeObj.close}/>
                </FlexItem>
                <FlexBlock>
                    <Button isDestructive variant="tertiary" onClick={()=>{
                        onRemoveItem(timeObj)
                    }}>Remove</Button>
                </FlexBlock>
            </Flex>      
        </>)
    })
    
    return theTimes
}

                    