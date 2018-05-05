import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import  * as constants from '../../shared/constants';

@Injectable()
export class EmployeeListService {
    constructor(private http: HttpClient) { }

    getEmployees() {
        return this.http.get(constants.BACKEND_URL + 'employees');
    }
}
