import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class DivisionListService {
    private serviceUrl = 'api/divisions';
    
    divisions: any[];
    onDivisionsChanged: BehaviorSubject<any> = new BehaviorSubject({});

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
                this.getDivisions()
            ]).then(
                () => {
                    resolve();
                },
                reject
            );
        });
    }

    getDivisions(): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http.get(this.serviceUrl)
                .subscribe((response: any) => {
                    this.divisions = response;
                    this.onDivisionsChanged.next(this.divisions);
                    resolve(response);
                }, reject);
        });
    }
}