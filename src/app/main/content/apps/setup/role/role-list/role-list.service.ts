import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiConst } from '../../../shared/constants';

@Injectable()
export class RoleListService {
    constructor(private http: HttpClient) { }

    getRoles() {
        return this.http.get(ApiConst.BASE_URL + 'userRoles');
    }

    deleteRole(role) {
        return this.http.delete('api/roles/' + role.id);
    }
}
