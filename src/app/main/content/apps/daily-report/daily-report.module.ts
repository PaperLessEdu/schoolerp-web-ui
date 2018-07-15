import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FuseSharedModule } from '@fuse/shared.module';
import { FuseWidgetModule } from '@fuse/components/widget/widget.module';
import {
  MatCheckboxModule,
  MatIconModule,
  MatFormFieldModule,
  MatButtonModule,
  MatInputModule,
  MatToolbarModule,
  MatDialogModule,
  MatSnackBarModule,
  MatSelectModule,
  MatDatepickerModule
  } from '@angular/material';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

import { SharedModule } from '../shared/shared.module';
import { DailyReportTakerComponent } from './taker/taker.component';
import { TakerService } from './taker/taker.service';

const routes = [
    // {
    //     path: 'checklist',
    //     component: ''
    // },
    {
        path: 'taker',
        component: DailyReportTakerComponent
    },
    // {
    //     path: 'report',
    //     component: ''
    // }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    MatCheckboxModule,
    MatIconModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    MatToolbarModule,
    MatDialogModule,
    MatSnackBarModule,
    MatSelectModule,
    MatDatepickerModule,
    FuseSharedModule,
    FuseWidgetModule,
    NgxDatatableModule,
    SharedModule
  ],
  declarations: [DailyReportTakerComponent],
  providers: [TakerService],
  entryComponents: []
})
export class DailyReportModule { }
