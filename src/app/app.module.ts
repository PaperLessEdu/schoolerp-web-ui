import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import 'hammerjs';

import { FuseModule } from '@fuse/fuse.module';
import { FuseSharedModule } from '@fuse/shared.module';

import { fuseConfig } from './fuse-config';

import { AppComponent } from './app.component';
import { FuseMainModule } from './main/main.module';
import { FuseSampleModule } from './main/content/sample/sample.module';
import { AuthGuard } from 'app/main/content/authentication/auth.guard';
import { AuthInterceptor } from 'app/main/content/authentication/auth.interceptor';
import {LocationStrategy, HashLocationStrategy} from '@angular/common';

const appRoutes: Routes = [
    {
        path: 'apps',
        loadChildren: './main/content/apps/apps.module#AppsModule',
        canActivate: [AuthGuard]
    },
    {
        path: 'auth',
        loadChildren: './main/content/authentication/authentication.module#AuthenticationModule'
    },
    {
        path: '',
        redirectTo: 'apps',
        pathMatch: 'full'
    }
];

@NgModule({
    declarations: [
        AppComponent
    ],
    imports     : [
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        RouterModule.forRoot(appRoutes),
        TranslateModule.forRoot(),

        // Fuse Main and Shared modules
        FuseModule.forRoot(fuseConfig),
        FuseSharedModule,
        FuseMainModule,
        FuseSampleModule
    ],
    bootstrap   : [
        AppComponent
    ],
    providers: [
        AuthGuard,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthInterceptor,
            multi: true
        },
        { provide: LocationStrategy, 
            useClass: HashLocationStrategy
        }
    ]
})
export class AppModule
{
}
