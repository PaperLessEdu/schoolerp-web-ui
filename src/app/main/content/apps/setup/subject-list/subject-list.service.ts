import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class SubjectListService {
    private serviceUrl = 'api/subjects';

    subjects: any[];
    onSubjectsChanged: BehaviorSubject<any> = new BehaviorSubject({});

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
                this.getSubjects()
            ]).then(
                () => {
                    resolve();
                },
                reject
            );
        });
    }

    getSubjects(): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http.get(this.serviceUrl)
                .subscribe((response: any) => {
                    this.subjects = response;
                    this.onSubjectsChanged.next(this.subjects);
                    resolve(response);
                }, reject);
        });
    }
}