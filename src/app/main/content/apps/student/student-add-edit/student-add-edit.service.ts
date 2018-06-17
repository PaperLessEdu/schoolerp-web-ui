import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ApiConst } from '../../shared/constants';
import { Observable } from 'rxjs/Observable';


@Injectable()
export class StudentAddEditService {
  routeParams: any;
  student: any;
  onStudentChanged: BehaviorSubject<any> = new BehaviorSubject({});

  constructor(private http: HttpClient) { }

  /**
   * Resolve
   * @param {ActivatedRouteSnapshot} route
   * @param {RouterStateSnapshot} state
   * @returns {Observable<any> | Promise<any> | any}
   */
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
    this.routeParams = route.params;
    return new Promise((resolve, reject) => {
      Promise.all([
        this.getStudent()
      ]).then(
        () => {
          resolve();
        },
        reject
        );
    });
  }

  getStudent(): Promise<any> {
    return new Promise((resolve, reject) => {
      if (this.routeParams.id === 'new') {
        this.onStudentChanged.next(false);
        resolve(false);
      } else {
        this.http.get(ApiConst.BASE_URL + 'students/' + this.routeParams.id)
          .subscribe((response: any) => {
            this.student = response;
            this.onStudentChanged.next(this.student);
            resolve(response);
          }, reject);
      }
    });
  }

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
