import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { ApiConst } from 'app/main/content/apps/shared/constants';

@Injectable()
export class StudentListService {

    constructor(private http: HttpClient) { }

    getStudentList() {
        return this.http.get(ApiConst.BASE_URL + 'students');
    }
}
