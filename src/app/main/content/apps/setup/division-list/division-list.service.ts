import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class DivisionListService {
    constructor(private http: HttpClient) { }

    getDivisions() {
        return this.http.get('api/divisions');
    }

    deleteDivision(division) {
        return this.http.delete('api/divisions/'+division.id);
    }
}