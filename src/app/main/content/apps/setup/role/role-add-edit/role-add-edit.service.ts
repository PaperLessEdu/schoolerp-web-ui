import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class RoleAddEditService {

    constructor(private http: HttpClient) { }

    addRole(role) {
        return new Promise((resolve, reject) => {
            this.http.post('api/roles', role)
                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });
    }

    updateRole(role) {
        return new Promise((resolve, reject) => {
            this.http.put('api/roles/'+role.id, role)
                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });
    }
}