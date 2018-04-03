import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class EmployeeListService implements Resolve<any> {
    employees: any[];
    constructor(private http: HttpClient) { }
    
    onEmployeesChanged: BehaviorSubject<any> = new BehaviorSubject({});

    /**
     * Resolve
     * @param {ActivatedRouteSnapshot} route
     * @param {RouterStateSnapshot} state
     * @returns {Observable<any> | Promise<any> | any}
     */
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
        return new Promise((resolve, reject) => {
            Promise.all([
                this.getEmployees()
            ]).then(
                () => {
                    resolve();
                },
                reject
            );
        });
    }

    getEmployees(): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http.get('api/employees')
                .subscribe((response: any) => {
                    this.employees = response;
                    this.onEmployeesChanged.next(this.employees);
                    resolve(response);
                }, reject);
        });
    }
}
