import { Injectable } from '@angular/core';
import * as moment from 'moment';

@Injectable()
export class DateUtilService {
    monthsMap = {
        Jan: 1,
        Feb: 2,
        Mar: 3,
        Apr: 4,
        May: 5,
        Jun: 6,
        Jul: 7,
        Aug: 8,
        Sept: 9,
        Oct: 10,
        Nov: 11,
        Dec: 12
    };
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
        if (momentSdate.isSame(momentTodayDate)) {
            totalDays = 1;
        } else {
            totalDays = momentTodayDate.diff(momentSdate, 'days') + 2;
        }

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

    getCurrentMonth() {
        return this.monthsMap[moment().format('MMM')];
    }

    getMonthDateRange(year, month) {
        // month in moment is 0 based, so 9 is actually october, subtract 1 to compensate
        // array is 'year', 'month', 'day', etc
        const startDate = moment([year, month - 1]);

        // Clone the value before .endOf()
        const endDate = moment(startDate).endOf('month');

        // just for demonstration:
        console.log(startDate.format('YYYY-MM-DD'));
        console.log(endDate.format('YYYY-MM-DD'));

        return { startDate: startDate.format('YYYY-MM-DD'), endDate: endDate.format('YYYY-MM-DD') };
    }

    getMonths(startDate, endDate) {
        let momentSdate = moment(startDate);
        const momentEdate = moment(endDate);
        const allMonths = [];
        while (momentSdate.isSameOrBefore(momentEdate)) {
            const obj = {};
            obj['name'] = momentSdate.format('MMM');
            obj['id'] = this.monthsMap[momentSdate.format('MMM')];
            allMonths.push(obj);
            momentSdate = momentSdate.add(1, 'month');
        }
        return allMonths;
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
