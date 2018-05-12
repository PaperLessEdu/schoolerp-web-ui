import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class LoginService {
    constructor(private http: HttpClient) { }

    userAuthentication(userName, password) {
        const data = 'username=' + userName + '&password=' + password;
        const reqHeader = new HttpHeaders({'Content-Type': 'application/x-www-urlencoded', 'No-Auth': 'True'});
        return this.http.post('http://localhost:3000/token', data, {headers: reqHeader});
    }
}
