import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiConst } from '../../../shared/constants';

@Injectable()
export class AcademicYearAddEditService {

    constructor(private http: HttpClient) { }

    addAcademicYear(obj) {
        return new Promise((resolve, reject) => {
            this.http.post(ApiConst.BASE_URL + 'academicyear', obj)
                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });
    }

    updateAcademicYear(obj) {
        return new Promise((resolve, reject) => {
            this.http.put(ApiConst.BASE_URL + 'academicyear/' + obj.id, obj)
                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });
    }
}
