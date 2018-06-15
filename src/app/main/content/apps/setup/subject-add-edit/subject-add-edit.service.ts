import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiConst } from '../../shared/constants';

@Injectable()
export class SubjectAddEditService {

    constructor(private http: HttpClient) { }

    addSubject(subject) {
        return new Promise((resolve, reject) => {
            this.http.post(ApiConst.BASE_URL + 'subjects', subject)
                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });
    }

    updateSubject(subject) {
        return new Promise((resolve, reject) => {
            this.http.put(ApiConst.BASE_URL + 'subjects/' + subject.subject_id, subject)
                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });
    }
}
