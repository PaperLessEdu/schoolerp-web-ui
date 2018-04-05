import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class StandardAddEditService {

    constructor(private http: HttpClient) { }

    addStandard(standard) {
        return new Promise((resolve, reject) => {
            this.http.post('api/standards', standard)
                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });
    }
}