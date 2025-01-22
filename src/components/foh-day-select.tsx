import { 
    DatePicker,
    PanelBody,
    PanelRow,
    ToggleControl
} from "@wordpress/components";
import { useState } from '@wordpress/element'

interface Props {
    dates: Date[]
}

export function DaySelect({dates}: Props){
    const[ date, setDate] = useState(dates)

    const [multipleState, setMultipleState] = useState(false)
    const [removeState, setRemoveState] = useState(false)
    const [prevDate, setPrevDate] = useState(new Date())

    function addDate(date: Date) {
        console.log('add')
    }

    function removeDate(date: Date){
        console.log('remove')
    }

    function changeDates(newDate: Date){
        let startDate = new Date(newDate)
        if (!multipleState || startDate === prevDate) {
            removeState ? removeDate(startDate) : addDate(startDate)

        }else if (multipleState && startDate > prevDate) {
            while (startDate >= prevDate) {
                console.log(startDate)
                removeState ? removeDate(startDate) : addDate(startDate)
                startDate = new Date(startDate.setDate(startDate.getDate() - 1))
            }
        }else if (multipleState && startDate < prevDate) {
            while (startDate <= prevDate) {
                console.log(startDate)
                removeState ? removeDate(startDate) : addDate(startDate)
                startDate = new Date(startDate.setDate(startDate.getDate() + 1))
            }
        }
        setPrevDate(newDate)
    }

    return(<>
        <PanelBody >
            <PanelRow>
                <DatePicker
                    startOfWeek={1}
                    onChange={(newDate)=> changeDates(new Date(newDate))}
                />
            </PanelRow>
            <PanelRow>
                <ToggleControl
                    label="Select multiple days"
                    checked={multipleState}
                    onChange={(value)=> setMultipleState(value)}
                />
            </PanelRow>
            <PanelRow>
                <ToggleControl
                    label="Remove days"
                    checked={removeState}
                    onChange={(value)=> setRemoveState(value)}
                />
            </PanelRow>
        </PanelBody>
    </>)
}