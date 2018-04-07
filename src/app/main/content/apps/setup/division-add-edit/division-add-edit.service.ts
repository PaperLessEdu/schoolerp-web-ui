import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class DivisionAddEditService {

    constructor(private http: HttpClient) { }

    addDivision(division) {
        return new Promise((resolve, reject) => {
            this.http.post('api/divisions', division)
                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });
    }
}