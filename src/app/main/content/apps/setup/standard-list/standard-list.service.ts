import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class StandardListService {
    private serviceUrl = 'api/standards';
    
    standards: any[];
    onStandardsChanged: BehaviorSubject<any> = new BehaviorSubject({});

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
                this.getStandards()
            ]).then(
                () => {
                    resolve();
                },
                reject
            );
        });
    }

    getStandards(): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http.get(this.serviceUrl)
                .subscribe((response: any) => {
                    this.standards = response;
                    this.onStandardsChanged.next(this.standards);
                    resolve(response);
                }, reject);
        });
    }
}