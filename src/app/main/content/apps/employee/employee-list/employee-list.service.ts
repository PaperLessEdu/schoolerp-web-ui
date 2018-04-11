import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class EmployeeListService {
    constructor(private http: HttpClient) { }

    getEmployees() {
        return this.http.get('api/employees');
    }
}