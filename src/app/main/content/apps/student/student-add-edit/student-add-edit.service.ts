import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { HttpClient } from '@angular/common/http';
import { ApiConst } from '../../shared/constants';


@Injectable()
export class StudentAddEditService {

  student: any;
  onStudentChanged: BehaviorSubject<any> = new BehaviorSubject({});

  constructor(private http: HttpClient) { }

  getStandards() {
    return this.http.get(ApiConst.BASE_URL + 'standards');
  }

  getDivisions() {
    return this.http.get(ApiConst.BASE_URL + 'divisions');
  }

  addStudent(student) {
    return new Promise((resolve, reject) => {
      this.http.post(ApiConst.BASE_URL + ApiConst.STUDENTS, student)
        .subscribe((response: any) => {
          resolve(response);
        }, reject);
    });
  }
}
