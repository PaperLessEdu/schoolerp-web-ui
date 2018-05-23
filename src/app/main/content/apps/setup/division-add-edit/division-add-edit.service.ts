import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiConst } from '../../shared/constants';

@Injectable()
export class DivisionAddEditService {

    constructor(private http: HttpClient) { }

    addDivision(division) {
        return new Promise((resolve, reject) => {
            this.http.post(ApiConst.BASE_URL + 'divisions', division)
                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });
    }

    updateDivision(division) {
        return new Promise((resolve, reject) => {
            this.http.put(ApiConst.BASE_URL + 'divisions/' + division.division_id, division)
                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });
    }
}
