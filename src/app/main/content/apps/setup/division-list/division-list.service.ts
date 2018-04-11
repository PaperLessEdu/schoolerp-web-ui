import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class DivisionListService {
    constructor(private http: HttpClient) { }

    getDivisions() {
        return this.http.get('api/divisions');
    }
}