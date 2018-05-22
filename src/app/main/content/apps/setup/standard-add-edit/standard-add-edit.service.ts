import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiConst } from '../../shared/constants';
@Injectable()
export class StandardAddEditService {

    constructor(private http: HttpClient) { }

    addStandard(standard) {
        return new Promise((resolve, reject) => {
            this.http.post(ApiConst.BASE_URL + 'standards', standard)
                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });
    }

    updateStandard(standard) {
        return new Promise((resolve, reject) => {
            this.http.put(ApiConst.BASE_URL + 'standards/' + standard.standard_id, standard)
                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });
    }
}