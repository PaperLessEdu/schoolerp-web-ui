import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiConst } from '../../shared/constants';

@Injectable()
export class EmployeeProfileService  {
    constructor(private http: HttpClient) { }
    
    getEmployeeDetails(id) {
        return this.http.get(ApiConst.BASE_URL + 'employees/' + id);
    }
}
