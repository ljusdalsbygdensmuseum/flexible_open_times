import { 
    DatePicker,
    PanelBody,
    PanelRow,
    ToggleControl
} from "@wordpress/components";
import { DatePickerEvent } from "@wordpress/components/build-types/date-time/types"
import { useState } from '@wordpress/element'

interface Props {
    dates: DatePickerEvent[]
}

export function DaySelect({dates}: Props){
    const[ dateParam, setDateParam] = useState(dates)

    const [multipleState, setMultipleState] = useState(false)
    const [removeState, setRemoveState] = useState(false)
    const [prevDate, setPrevDate] = useState(new Date())

    function addDate(newDate: Date) {

        console.log(newDate.toDateString(), prevDate)
        
        if (dateParam.includes({date: new Date(newDate)})) {
            return;
        }
        setDateParam((currentDate)=> [...currentDate, {date: newDate}])
        
    }

    function removeDate(newDate: Date){
        const newDates = dateParam.filter((compareItem) => newDate.toDateString() !== new Date(compareItem.date).toDateString())
        setDateParam(()=> newDates)
        
    }

    function changeDates(newDate: Date){
        let startDate = new Date(newDate)

        if (!multipleState || startDate.toDateString() === prevDate.toDateString()) {
            removeState ? removeDate(startDate) : addDate(startDate)

        }else if (multipleState && startDate > prevDate) {
            while (startDate >= prevDate) {
                
                removeState ? removeDate(startDate) : addDate(startDate)
                startDate = new Date(startDate.setDate(startDate.getDate() - 1))
            }
        }else if (multipleState && startDate < prevDate) {
            while (startDate <= prevDate) {
                removeState ? removeDate(startDate) : addDate(startDate)
                startDate = new Date(startDate.setDate(startDate.getDate() + 1))
            }
        }
        else{
            console.log('wrong')
        }
        setPrevDate(()=> new Date(newDate))
        
    }

    return(<>
        <PanelBody >
            <PanelRow>
                <DatePicker
                    startOfWeek={1}
                    events={dateParam}
                    onChange={(newDate)=> changeDates(new Date(newDate))}
                />
            </PanelRow>
            <PanelRow>
                <ToggleControl
                    label="Select multiple days"
                    checked={multipleState}
                    onChange={(value)=> setMultipleState(() => value)}
                />
            </PanelRow>
            <PanelRow>
                <ToggleControl
                    label="Remove days"
                    checked={removeState}
                    onChange={(value)=> setRemoveState(() => value)}
                />
            </PanelRow>
        </PanelBody>
    </>)
}