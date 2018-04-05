import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { FuseSharedModule } from '@fuse/shared.module';

import { FuseContentComponent } from 'app/main/content/content.component';
import { MatNativeDateModule } from '@angular/material';

@NgModule({
    declarations: [
        FuseContentComponent
    ],
    imports     : [
        RouterModule,
        MatNativeDateModule,
        FuseSharedModule
    ],
    exports: [
        FuseContentComponent
    ]
})
export class FuseContentModule
{
}
