import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class HolidayListService {
    constructor(private http: HttpClient) { }

    getHolidays() {
        return this.http.get('api/holidays');
    }
}