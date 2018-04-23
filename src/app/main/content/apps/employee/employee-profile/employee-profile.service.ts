import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class EmployeeProfileService  {
    constructor(private http: HttpClient) { }
    
    getEmployeeDetails(id) {
        return this.http.get('api/employees/'+id);
    }
}