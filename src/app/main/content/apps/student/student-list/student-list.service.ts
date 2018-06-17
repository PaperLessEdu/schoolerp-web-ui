import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { ApiConst } from 'app/main/content/apps/shared/constants';

@Injectable()
export class StudentListService {

    constructor(private http: HttpClient) { }

    getStandards() {
        return this.http.get(ApiConst.BASE_URL + 'standards');
    }

    getDivisions() {
        return this.http.get(ApiConst.BASE_URL + 'divisions');
    }

    getStudentList(stdId: number, divisionId: number) {
        const standardId = stdId ? stdId : '';
        const divId = divisionId ? divisionId : '';
        return this.http.get(ApiConst.BASE_URL + 'students?' + 'standardId=' + standardId + '&divisionId=' + divId);
    }

    deleteStudent(studentId: number) {
        return this.http.delete(ApiConst.BASE_URL + 'students/' + studentId);
    }
}
