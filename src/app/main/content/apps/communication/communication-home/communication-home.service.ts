import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class CommunicationHomeService {
    constructor(private http: HttpClient) { }

    getStandards() {
        return this.http.get('api/standards');
    }

    getDivisions() {
        return this.http.get('api/divisions');
    }
}