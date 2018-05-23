import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiConst } from '../../shared/constants';

@Injectable()
export class DivisionListService {
    constructor(private http: HttpClient) { }

    getDivisions() {
        return this.http.get(ApiConst.BASE_URL + 'divisions');
    }

    deleteDivision(division) {
        return this.http.delete(ApiConst.BASE_URL + 'divisions/' + division.division_id);
    }
}
