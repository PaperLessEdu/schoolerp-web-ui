import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ChangeRoleService {
    constructor(private http: HttpClient) { }

    getRoles() {
        return this.http.get('api/roles');
    }
}