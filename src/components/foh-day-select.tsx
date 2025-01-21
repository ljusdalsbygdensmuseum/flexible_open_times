import { DatePicker } from "@wordpress/components";
import { useState } from '@wordpress/element'

import { Dates } from "./foh-day-select-types";

interface Props {
    dates: Dates[]
}

export function DaySelect({dates}: Props){
    const[ date, setDate] = useState(new Date());

    return(<>
        <DatePicker
            currentDate={date}
            onChange={(newdate)=> setDate( new Date(newdate) )}
        />
    </>)
}