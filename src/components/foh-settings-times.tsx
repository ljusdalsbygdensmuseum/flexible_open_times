import {
    Flex,
    FlexItem,
    FlexBlock,
    TimePicker,
    Button
} from '@wordpress/components';
import { TimeInputValue } from '@wordpress/components/build-types/date-time/types';

interface Props {
    hours: Hour[]
}

export type Hour = {
    open: TimeInputValue
    close: TimeInputValue
}

export function Times(props: Props){
    const theTimes = props.hours.map((timeObj: Hour)=>{
        return(<>
            <Flex>
                <FlexItem>
                    <TimePicker.TimeInput label='Open' value={timeObj.open}/>
                </FlexItem>
                <FlexItem>
                    <TimePicker.TimeInput label='Close' value={timeObj.close}/>
                </FlexItem>
                <FlexBlock>
                    <Button isDestructive variant="tertiary">Remove</Button>
                </FlexBlock>
            </Flex>      
        </>)
    })
    return theTimes
}

                    