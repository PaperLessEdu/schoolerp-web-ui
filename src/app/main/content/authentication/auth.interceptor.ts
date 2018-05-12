import { HttpInterceptor, HttpRequest, HttpHandler, HttpUserEvent, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
// import { Router } from '@angular/Router';
import 'rxjs/add/operator/do';
import { debug } from 'util';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    // constructor(private router: Router) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (req.headers.get('No-Auth') === 'True') {
            return next.handle(req.clone());
        }

        if (localStorage.getItem('userToken') !== null) {
            const clonedReq = req.clone({
                setHeaders: {
                    'Authorization': 'Bearer ' + localStorage.getItem('userToken')
                }
            });

            return next.handle(clonedReq);
        } else {
            // this.router.navigate(['/auth/login']);
        }
    }
}
