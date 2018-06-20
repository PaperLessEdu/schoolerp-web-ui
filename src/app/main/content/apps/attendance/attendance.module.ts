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

import { AttendanceTakerComponent } from './attendance-taker/attendance-taker.component';
import { AttendanceTakerService } from './attendance-taker/attendance-taker.service';
import { AttendanceReportComponent } from './attendance-report/attendance-report.component';
import { AttendanceReportService } from './attendance-report/attendance-report.service';
import { ExportAsPdfService } from '../shared/services/export-as-pdf.service';
import { DateUtilService } from '../shared/services/date-util.service';

const routes = [
  {
    path: 'taker',
    component: AttendanceTakerComponent
  },
  {
    path: 'report',
    component: AttendanceReportComponent
  }
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
    NgxDatatableModule
  ],
  declarations: [AttendanceTakerComponent, AttendanceReportComponent],
  providers: [
    AttendanceTakerService,
    AttendanceReportService,
    ExportAsPdfService,
    DateUtilService
  ]
})
export class AttendanceModule { }
