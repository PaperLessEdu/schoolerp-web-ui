import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiConst } from '../../shared/constants';

@Injectable()
export class HolidayListService {
    constructor(private http: HttpClient) { }

    getHolidays() {
        return this.http.get(ApiConst.BASE_URL + 'holidays');
    }

    deleteHolidays(holiday) {
        return this.http.delete(ApiConst.BASE_URL + 'holidays/' + holiday.holiday_id);
    }
}
