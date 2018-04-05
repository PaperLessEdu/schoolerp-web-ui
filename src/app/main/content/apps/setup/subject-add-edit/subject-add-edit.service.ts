import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class SubjectAddEditService {

    constructor(private http: HttpClient) { }

    addSubject(subject) {
        return new Promise((resolve, reject) => {
            this.http.post('api/subjects', subject)
                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });
    }
}