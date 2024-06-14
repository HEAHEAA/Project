import dayjs from 'dayjs';
import 'dayjs/locale/ko';
import isBetweenPlugin from 'dayjs/plugin/isBetween';
import {styled} from '@mui/material/styles';
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import {DateCalendar} from '@mui/x-date-pickers/DateCalendar';
import {PickersDay} from '@mui/x-date-pickers/PickersDay';
import {useContext} from "react";
import {DateContext} from "../../context/config/DateContext.jsx";

dayjs.extend(isBetweenPlugin);
dayjs.locale('ko');

const CustomPickersDay = styled(PickersDay, {
    shouldForwardProp: (prop) => prop !== 'isSelected' && prop !== 'isHovered',
})(({theme, isSelected, isHovered, day}) => ({
    borderRadius: 0,
    ...(isSelected && {
        // backgroundColor: theme.palette.primary.main,
        '&:hover, &:focus': {
            backgroundColor: theme.palette.primary.main,
        },
    }),
    ...(isHovered && {
        backgroundColor: theme.palette.primary[theme.palette.mode],
        '&:hover, &:focus': {
            backgroundColor: theme.palette.primary[theme.palette.mode],
        },
    }),
    ...(day.day() === 0 && {
        borderTopLeftRadius: '50%',
        borderBottomLeftRadius: '50%',
    }),
    ...(day.day() === 6 && {
        borderTopRightRadius: '50%',
        borderBottomRightRadius: '50%',
    }),
}));

const isInSameWeek = (dayA, dayB) => {
    if (dayB == null) {
        return false;
    }

    return dayA.isSame(dayB, 'week');
};

function Day(props) {
    const {day, selectedDay, hoveredDay, ...other} = props;
    return (
        <CustomPickersDay
            {...other}
            day={day}
            sx={{px: 1.5}}
            disableMargin
            selected={false}
            isSelected={isInSameWeek(day, selectedDay)}
            isHovered={isInSameWeek(day, hoveredDay)}
        />
    );
}

function WeekPicker() {
    const {value, setValue,hoveredDay, setHoveredDay} = useContext(DateContext);
    return (
        <div className="date-picker">
            <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ko">
                <DateCalendar
                    value={value}
                    onChange={(newValue) => setValue(newValue)}
                    showDaysOutsideCurrentMonth
                    displayWeekNumber
                    slots={{day: Day}}
                    slotProps={{
                        day: (ownerState) => ({
                            selectedDay: value,
                            hoveredDay,
                            onPointerEnter: () => setHoveredDay(ownerState.day),
                            onPointerLeave: () => setHoveredDay(null),
                        }),
                    }}
                />
            </LocalizationProvider>
        </div>
    )
}

export default WeekPicker;
