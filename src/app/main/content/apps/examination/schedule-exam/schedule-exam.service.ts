import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiConst } from 'app/main/content/apps/shared/constants';

@Injectable()
export class ScheduleExamService {

  constructor(private http: HttpClient) { }

  getStandards() {
    return this.http.get(ApiConst.BASE_URL + ApiConst.STANDARDS);
  }

  getSubjects() {
    return this.http.get(ApiConst.BASE_URL + ApiConst.SUBJECTS);
  }

  getAcademicYear() {
    return this.http.get(ApiConst.BASE_URL + ApiConst.ACADEMIC_YEAR);
  }

  createExam(obj) {
    return new Promise((resolve, reject) => {
      this.http.post(ApiConst.BASE_URL + ApiConst.EXAMINATION, obj)
        .subscribe((response: any) => {
          resolve(response);
        }, reject);
    });
  }
}
