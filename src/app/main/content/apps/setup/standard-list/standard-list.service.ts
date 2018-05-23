import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiConst } from '../../shared/constants';

@Injectable()
export class StandardListService {
    constructor(private http: HttpClient) { }

    getStandards() {
        return this.http.get(ApiConst.BASE_URL + 'standards');
    }

    deleteStandard(standard) {
        return this.http.delete(ApiConst.BASE_URL + 'standards/' + standard.standard_id);
    }
}
