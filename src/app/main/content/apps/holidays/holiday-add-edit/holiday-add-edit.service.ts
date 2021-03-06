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

    updateHoliday(holidayId: number, data: any) {
        return new Promise((resolve, reject) => {
            this.http.put(ApiConst.BASE_URL + 'holidays/' + holidayId, data)
                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });
    }
}