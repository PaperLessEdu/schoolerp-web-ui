import { Injectable } from '@angular/core';
import * as moment from 'moment';

@Injectable()
export class DateUtilService {

    getDaysBetweenDates(start, end, dayName) {
        const result = [];
        const days = {sun: 0, mon: 1, tue: 2, wed: 3, thu: 4, fri: 5, sat: 6 };
        const day = days[dayName.toLowerCase().substr(0, 3)];
        // Copy start date
        const current = new Date(start);
        // Shift to next of required days
        current.setDate(current.getDate() + (day - current.getDay() + 7) % 7);
        // While less than end date, add dates to result array
        while (current < end) {
            result.push(new Date(+current));
            current.setDate(current.getDate() + 7);
        }
        return result;
    }

    // startDate is school start days
    // endDate can be today's date
    getTotalSchoolDays(startDate, endDate, saturdayClosed) {
        const saturdaysCount = this.getDaysBetweenDates(new Date(2018, 5, 16), new Date(2018, 5, 30), 'sat').length;
        const sundayssCount = this.getDaysBetweenDates(new Date(2018, 5, 16), new Date(2018, 5, 30), 'sun').length;

        // if school closed on saturdays also then minus saturdays also from total days
        if (saturdayClosed) {
            return (startDate.diff(endDate, 'days') - saturdaysCount);
        } else {
            return startDate.diff(endDate, 'days');
        }
    }

    /**
     * console.log(moment().format('D'), moment().format('M'), moment().format('YYYY'));
     * const date = moment(moment(new Date()).format('YYYY/MM/DD'));
     * const todayDate = moment(date, 'YYYY/MM/DD');
     *
     * const schoolStarteDate = moment('2018-06-01', 'YYYY/MM/DD');
     *
     * school closed on Satudays and Sundays
     * console.log(this.getTotalSchoolDays(todayDate, schoolStarteDate, true));
     *
     * school closed on Sundays
     * console.log(this.getTotalSchoolDays(todayDate, schoolStarteDate, false));
     */
}
