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

    getStudentAttendanceDetails(url) {
        return this.http.get(url);
    }

    getAcademicYears() {
        return this.http.get(ApiConst.BASE_URL + 'academicyear');
    }
}
