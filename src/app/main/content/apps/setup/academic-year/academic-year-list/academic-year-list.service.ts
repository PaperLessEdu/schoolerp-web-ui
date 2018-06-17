import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiConst } from '../../../shared/constants';

@Injectable()
export class AcademicYearListService {
    constructor(private http: HttpClient) { }

    getAcademicYears() {
        return this.http.get(ApiConst.BASE_URL + 'academicyears');
    }

    deleteAcademicYear(obj) {
        return this.http.delete(ApiConst.BASE_URL + 'academicyears/' + obj.id);
    }
}
