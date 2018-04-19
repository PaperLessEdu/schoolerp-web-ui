import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class RoleListService {
    constructor(private http: HttpClient) { }

    getRoles() {
        return this.http.get('api/roles');
    }

    deleteRole(role) {
        return this.http.delete('api/roles/'+role.id);
    }
}