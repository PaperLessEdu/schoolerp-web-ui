import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiConst } from '../../shared/constants';
@Injectable()
export class AttendanceReportService {
    constructor(private http: HttpClient) { }

    getStandards() {
        return this.http.get(ApiConst.BASE_URL + 'standards');
    }

    getDivisions() {
        return this.http.get(ApiConst.BASE_URL + 'divisions');
    }

    getStudentAttendanceDetails(obj) {
        return new Promise((resolve, reject) => {
            this.http.post(ApiConst.BASE_URL + 'attendance/report', obj)
                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });
    }

    getAcademicYears() {
        return this.http.get(ApiConst.BASE_URL + 'academicyear');
    }
}
