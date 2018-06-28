import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiConst } from '../../shared/constants';

@Injectable()
export class CommunicationService {
    constructor(private http: HttpClient) { }

    sendSms(smsObj) {
        return new Promise((resolve, reject) => {
            this.http.post(ApiConst.BASE_URL + 'notification/sendSms', smsObj)
                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });
    }
}
