import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiConst } from 'app/main/content/apps/shared/constants';

@Injectable()
export class ExaminationListService {

  constructor(private http: HttpClient) { }

  getExamList() {
    return this.http.get(ApiConst.BASE_URL + ApiConst.EXAMINATION);
  }
}
