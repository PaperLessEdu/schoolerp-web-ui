import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class StudentListService implements Resolve<any> {
    studentList: any[];
    onStudentChanged: BehaviorSubject<any> = new BehaviorSubject({});

    constructor(private http: HttpClient) { }

    /**
     * Resolve
     * @param {ActivatedRouteSnapshot} route
     * @param {RouterStateSnapshot} state
     * @returns {Observable<any> | Promise<any> | any}
     */
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
        return new Promise((resolve, reject) => {
            Promise.all([
                this.getStudentList()
            ]).then(
                () => {
                    resolve();
                },
                reject
            );
        });
    }

    getStudentList(): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http.get('api/students')
                .subscribe((response: any) => {
                    this.studentList = response;
                    this.onStudentChanged.next(this.studentList);
                    resolve(response);
                }, reject);
        });
    }
}
