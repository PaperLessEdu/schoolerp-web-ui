import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { ApiConst } from '../../shared/constants';

@Injectable()
export class EmployeeAddEditService implements Resolve<any> {
    routeParams: any;
    employee: any;
    onEmployeeChanged: BehaviorSubject<any> = new BehaviorSubject({});

    constructor(private http: HttpClient) {}
    
    /**
     * Resolve
     * @param {ActivatedRouteSnapshot} route
     * @param {RouterStateSnapshot} state
     * @returns {Observable<any> | Promise<any> | any}
     */
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any
    {
        this.routeParams = route.params;
        return new Promise((resolve, reject) => {
            Promise.all([
                this.getEmployee()
            ]).then(
                () => {
                    resolve();
                },
                reject
            );
        });
    }

    getEmployee(): Promise<any> {   
        return new Promise((resolve, reject) => {
            if ( this.routeParams.id === 'new' ) {
                this.onEmployeeChanged.next(false);
                resolve(false);
            } else {
                this.http.get(ApiConst.BASE_URL + 'employees/' + this.routeParams.id)
                    .subscribe((response: any) => {
                        this.employee = response;
                        this.onEmployeeChanged.next(this.employee);
                        resolve(response);
                    }, reject);
            }
        });
    }

    updateEmployee(employee) {
        return new Promise((resolve, reject) => {
            this.http.put(ApiConst.BASE_URL + 'employees/' + employee.id, employee)
                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });
    }

    addEmployee(employee) {
        return new Promise((resolve, reject) => {
            this.http.post(ApiConst.BASE_URL + 'employees', employee)
                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });
    }

    getRoles() {
        return this.http.get(ApiConst.BASE_URL + 'roles');
    }
}
