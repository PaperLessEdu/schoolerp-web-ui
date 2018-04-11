import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class SubjectListService {
    constructor(private http: HttpClient) { }

    getSubjects() {
        return this.http.get('api/subjects');
    }
}