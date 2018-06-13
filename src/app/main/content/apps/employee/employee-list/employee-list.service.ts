import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiConst } from '../../shared/constants';

@Injectable()
export class EmployeeListService {
    constructor(private http: HttpClient) { }

    getEmployees() {
        return this.http.get(ApiConst.BASE_URL + 'employees');
    }

    deleteEmployee(empl) {
        return this.http.delete(ApiConst.BASE_URL + 'employees/' + empl.id);
    }
}
