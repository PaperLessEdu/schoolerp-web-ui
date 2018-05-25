import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiConst } from '../../shared/constants';

@Injectable()
export class HolidayAddEditService {

    constructor(private http: HttpClient) { }

    addHoliday(holiday) {
        return new Promise((resolve, reject) => {
            this.http.post(ApiConst.BASE_URL + 'holidays', holiday)
                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });
    }

    updateHoliday(holiday) {
        return new Promise((resolve, reject) => {
            this.http.put(ApiConst.BASE_URL + 'holidays/' + holiday.holiday_id, holiday)
                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });
    }
}