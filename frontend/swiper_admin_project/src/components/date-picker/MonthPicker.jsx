import dayjs from 'dayjs';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import 'dayjs/locale/ko';
import {Nows} from "../../utils/date-time.jsx";

function MonthPicker(){
    return(
        <div>
            <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ko">
                <DemoContainer components={['DateCalendar', 'DateCalendar', 'DateCalendar']}>
                    <DemoItem>
                        <DateCalendar
                            defaultValue={dayjs(Nows)}
                            views={['month', 'year']}
                            openTo="month"
                        />
                    </DemoItem>
                </DemoContainer>
            </LocalizationProvider>
        </div>
    )
}
export default MonthPicker;