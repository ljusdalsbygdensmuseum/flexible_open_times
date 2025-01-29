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
    input: HTMLInputElement
}

export function DaySelect({dates, input}: Props){
    const[ dateParam, setDateParam] = useState(dates)

    const [multipleState, setMultipleState] = useState(false)
    const [removeState, setRemoveState] = useState(false)
    const [prevDate, setPrevDate] = useState(new Date())

    const addDate = (newDate: Date) =>{  
        setDateParam((currentDate)=> {
            input.value = JSON.stringify([...currentDate, {date: new Date(newDate)}])
            return [...currentDate, {date: new Date(newDate)}] 
        })
    }

    const removeDate = (newDate: Date) => {
        setDateParam((dates)=> {
            const newDates = dates.filter((compareItem) => newDate.toDateString() !== new Date(compareItem.date).toDateString())
            input.value = JSON.stringify([...newDates])
            return[...newDates]
        })
        
    }

    const changeDates = (newDate: Date) =>{
        let startDate = new Date(newDate)

        if (!multipleState || startDate.toDateString() === prevDate.toDateString()) {
            removeState ? removeDate(startDate) : addDate(startDate)

        }else if (multipleState && startDate > prevDate) {
            while (startDate >= prevDate) {
                const thisDate = new Date(startDate)
                removeState ? removeDate(thisDate) : addDate(thisDate)
                startDate = new Date(startDate.setDate(startDate.getDate() - 1))
            }
        }else if (multipleState && startDate < prevDate) {
            while (startDate <= prevDate) {
                const thisDate = new Date(startDate)
                removeState ? removeDate(thisDate) : addDate(thisDate)
                startDate = new Date(startDate.setDate(startDate.getDate() + 1))
            }
        }
    
        setPrevDate(()=> new Date(newDate))
        
    }

    return(<>
        <PanelBody title="Dates">
            <PanelRow>
                <DatePicker
                    startOfWeek={1}
                    currentDate={null}
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