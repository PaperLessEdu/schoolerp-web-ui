import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiConst } from '../../shared/constants';

@Injectable()
export class CommunicationHomeService {
    constructor(private http: HttpClient) { }

    getStandards() {
        return this.http.get(ApiConst.BASE_URL + 'standards');
    }

    getDivisions() {
        return this.http.get(ApiConst.BASE_URL + 'divisions');
    }

    getEmployees() {
        return this.http.get(ApiConst.BASE_URL + 'employees');
    }

    getStudents(url) {
        return this.http.get(url);
    }

    sendEmail(emailObj) {
        return new Promise((resolve, reject) => {
            this.http.post(ApiConst.BASE_URL + 'notification/sendEmail', emailObj)
                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });
    }

    sendSms(smsObj) {
        return new Promise((resolve, reject) => {
            this.http.post(ApiConst.BASE_URL + 'notification/sendSms', smsObj)
                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });
    }
}
