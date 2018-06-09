import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiConst } from '../../shared/constants';

@Injectable()
export class StudentProfileService {

  constructor(private http: HttpClient) { }

  getStudentDetails(id: number) {
    return this.http.get(ApiConst.BASE_URL + 'students/' + id);
  }
}
