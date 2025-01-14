import {
    Flex,
    FlexItem,
    FlexBlock,
    TimePicker,
    Button
} from '@wordpress/components';

export function Times(){
    return(<>
        <Flex>
            <FlexItem>
                <TimePicker.TimeInput label='Open'/>
            </FlexItem>
            <FlexItem>
                <TimePicker.TimeInput label='Close'/>
            </FlexItem>
            <FlexBlock>
                <Button isDestructive variant="tertiary">Remove</Button>
            </FlexBlock>
        </Flex>      
    </>)
}

// construct time pickers
    function load_time_pickers(obj, objIndex){
        const timePicker = obj.openhours.map((hours, hoursIndex)=>{
            return(
            <PanelRow>
                <Flex>
                    <FlexItem>
                        <TimePicker.TimeInput label="Open" value={hours.open} onChange={(data)=>editTime(objIndex, hoursIndex, 'open', data)}/>
                    </FlexItem>
                    <FlexBlock>
                        <TimePicker.TimeInput label="Close" value={hours.close} onChange={(data)=>editTime(objIndex, hoursIndex, 'close', data)}/>
                    </FlexBlock>
                </Flex>
            </PanelRow>
            )
        });
        return timePicker
    }