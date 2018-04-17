import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class HolidayAddEditService {

    constructor(private http: HttpClient) { }

    addHoliday(holiday) {
        return new Promise((resolve, reject) => {
            this.http.post('api/holidays', holiday)
                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });
    }

    updateHoliday(holiday) {
        return new Promise((resolve, reject) => {
            this.http.put('api/holidays/'+holiday.id, holiday)
                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });
    }
}