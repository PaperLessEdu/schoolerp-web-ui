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
    getTotalSchoolDays(startDate, endDate, weekendType) {
        let totalDays = 0;
        const saturdayClosed = weekendType === 'EverySaturdayEverySunday' ? true : false;
        const sDate = new Date(startDate);
        const eDate = new Date(endDate);
        const todayDate = new Date();

        const momentSdate = moment(startDate);
        const momentTodayDate = moment(endDate);
        totalDays = momentTodayDate.diff(momentSdate, 'days') + 2;

        const sundaysCount = this.getDaysBetweenDates(sDate, todayDate, 'sun').length;

        // if school closed on saturdays also then minus saturdays also from total days
        if (saturdayClosed) {
            const saturdaysCount = this.getDaysBetweenDates(sDate, todayDate, 'sat').length;
            totalDays = totalDays - saturdaysCount;
        }

        // minus sundays from totaldays
        totalDays = totalDays - sundaysCount;
        return totalDays;
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
