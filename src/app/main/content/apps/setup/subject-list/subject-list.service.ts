import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiConst } from '../../shared/constants';
@Injectable()
export class SubjectListService {
    constructor(private http: HttpClient) { }

    getSubjects() {
        return this.http.get(ApiConst.BASE_URL + 'subjects');
    }

    deleteSubject(subject) {
        return this.http.delete(ApiConst.BASE_URL + 'subjects/' + subject.subject_id);
    }
}
