import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiConst } from '../../shared/constants';

@Injectable()
export class TakerService {
    constructor(private http: HttpClient) { }

    getStandards() {
        return this.http.get(ApiConst.BASE_URL + 'standards');
    }

    getDivisions() {
        return this.http.get(ApiConst.BASE_URL + 'divisions');
    }

    getSubjects() {
        return this.http.get(ApiConst.BASE_URL + 'subjects');
    }

    getStudents(url) {
        return this.http.get(url);
    }

    // postAttendance(data) {
    //     return new Promise((resolve, reject) => {
    //         this.http.post(ApiConst.BASE_URL + 'attendance', data)
    //             .subscribe((response: any) => {
    //                 resolve(response);
    //             }, reject);
    //     });
    // }
}
