import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

import { 
  MatCheckboxModule,
  MatIconModule,
  MatFormFieldModule,
  MatButtonModule,
  MatInputModule,
  MatToolbarModule,
  MatDialogModule,
  MatSnackBarModule,
  MatStepperModule,
  MatSelectModule,
  MatTableModule,
  MatDatepickerModule,
  MatListModule,
  MatRadioModule
  } from '@angular/material';
import { FuseSharedModule } from '@fuse/shared.module';
import { SharedModule } from './../shared/shared.module';

import { ExaminationListComponent } from './examination-list/examination-list.component';
import { ScheduleExamComponent } from './schedule-exam/schedule-exam.component';
import { ScheduleExamService } from 'app/main/content/apps/examination/schedule-exam/schedule-exam.service';
import { ExaminationListService } from 'app/main/content/apps/examination/examination-list/examination-list.service';

const routes = [
  {
    path: 'list',
    component: ExaminationListComponent
  },
  {
    path: 'new',
    component: ScheduleExamComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    MatIconModule,
    MatFormFieldModule,
    MatCheckboxModule,
    NgxDatatableModule,
    MatButtonModule,
    MatInputModule,
    MatToolbarModule,
    MatDialogModule,
    MatSnackBarModule,
    FuseSharedModule,
    SharedModule,
    MatSelectModule,
    MatTableModule,
    MatDatepickerModule,
    MatListModule,
    MatRadioModule,
    MatStepperModule
  ],
  declarations: [
    ExaminationListComponent,
    ScheduleExamComponent
  ],
  providers: [
    ScheduleExamService,
    ExaminationListService
  ]
})
export class ExaminationModule { }
