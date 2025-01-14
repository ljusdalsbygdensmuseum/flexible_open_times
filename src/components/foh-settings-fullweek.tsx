import {
    PanelBody,
    PanelRow,
    Button
} from '@wordpress/components';

import { Times } from './foh-settings-times';

interface Props {
    week: Day[]
    names: string[]
}

export type Day = {
    dayInt: 0 | 1 | 2 | 3 | 4 | 5 | 6
    hours: Hour[]
}

type Hour = {
    open: {
        hour: number
        minute: number
    }
    close: {
        hour: number
        minute: number
    }
}

export function FullWeek(props: Props) {
    const theWeek = props.week.map((dayObj: Day)=>{
        return(<>
            <PanelBody title={props.names[dayObj.dayInt]}>
                <PanelRow>
                    <Times/>
                </PanelRow>
                <PanelRow>
                    <Button variant='secondary'>Add More</Button>
                </PanelRow>
            </PanelBody>
        </>)
    })
    
    return theWeek
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
}