import { 
    DatePicker,
    PanelBody,
    PanelRow,
    ToggleControl
} from "@wordpress/components";
import { useState } from '@wordpress/element'

import { Dates } from "./foh-day-select-types"

interface Props {
    dates: Dates[]
}

export function DaySelect({dates}: Props){
    const[ date, setDate] = useState(new Date())

    const [functionState, setFunctionState] = useState(false)
    const [removeState, setRemoveState] = useState(false)

    return(<>
        <PanelBody >
            <PanelRow>
                <DatePicker
                    startOfWeek={1}
                    onChange={(newdate)=> setDate( new Date(newdate) )}
                />
            </PanelRow>
            <PanelRow>
                <ToggleControl
                    label="Select multiple days"
                    checked={functionState}
                    onChange={(value)=> setFunctionState(value)}
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