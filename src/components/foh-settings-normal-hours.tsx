import {
    Panel,
    PanelBody,
    PanelRow,
    Flex,
    FlexItem,
    FlexBlock,
    TimePicker,
    Button
} from '@wordpress/components';

import {FullWeek, Day} from './foh-settings-fullweek';

export default function FohSettingsNormalHours(){
    // get input and data
    const infoInput: HTMLInputElement | null = document.querySelector('#foh-normal-open-hours')
    if (!infoInput) {
        throw new Error("#foh-normal-open-hours not found")
    }
    const info: Day[] = JSON.parse(infoInput.value).week

    const weekNames = ['Monday', 'Tuseday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']

    return (
        <Panel>
            <div id="full-week">
                <FullWeek week={info} names={weekNames} input={infoInput}/>
            </div>
        </Panel>
    )

/*

    // on edit of time field
    function editTime( objIndex, hourIndex, type, data) {
        if (type === 'open') {
            info.weekday[objIndex].openhours[hourIndex].open = data;
        }
        if(type === 'close'){
            info.weekday[objIndex].openhours[hourIndex].close = data;
        }

        // output data to input
        infoInput.value = JSON.stringify(info);
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

    // the full week
    function full_week(){
        const theWeek = info.weekday.map((obj, objIndex)=>{
            //does not show delete button if there are no hours specified
            let removebtn
            if (obj.openhours.length) {
                removebtn = <Button isDestructive variant="tertiary">Remove</Button>
            }else{
                removebtn = '';
            }
    
            return(
                <PanelBody title={obj.name}>
                        {load_time_pickers(obj, objIndex)}
                    <PanelRow>
                        <Button variant="secondary" onClick={(event)=>{
                            console.log(objIndex);
    
                            info.weekday[objIndex].openhours.push({open:{hours: 0, minutes: 0}, close:{hours: 0, minutes: 0}});
    
                            infoInput.value = JSON.stringify(info);
    
                            //document.querySelector('#full-week') = full_week();
                            
                        }}>Add more</Button>
                        {removebtn}
                    </PanelRow>
                </PanelBody>
            );
        });
        return theWeek;
    }*/
}