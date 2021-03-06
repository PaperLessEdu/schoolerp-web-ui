import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiConst } from 'app/main/content/apps/shared/constants';

@Injectable()
export class FeeStructureAddEditService {

  constructor(private http: HttpClient) { }

  getStandards() {
    return this.http.get(ApiConst.BASE_URL + ApiConst.STANDARDS);
  }

  getAcademicYear() {
    return this .http.get(ApiConst.BASE_URL + ApiConst.ACADEMIC_YEAR);
  }
}
