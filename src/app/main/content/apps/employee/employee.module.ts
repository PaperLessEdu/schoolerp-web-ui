import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { 
  MatCheckboxModule,
  MatButtonModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatSelectModule,
  MatStepperModule,
  MatDividerModule,
  MatDatepickerModule,
  MatSnackBarModule, 
  MatMenuModule } from '@angular/material';
import { AgmCoreModule } from '@agm/core';

import { FuseSharedModule } from '@fuse/shared.module';
import { FuseWidgetModule } from '@fuse/components/widget/widget.module';

import { NgxDatatableModule } from '@swimlane/ngx-datatable';

import { EmployeeListComponent } from './employee-list/employee-list.component';
import { EmployeeAddEditComponent } from './employee-add-edit/employee-add-edit.component';
import { EmployeeListService } from './employee-list/employee-list.service';
import { EmployeeAddEditService } from './employee-add-edit/employee-add-edit.service';

const routes = [
  {
    path: 'list',
    component: EmployeeListComponent
  }, {
    path: 'new',
    component: EmployeeAddEditComponent
  }, {
      path     : 'list/:id',
      component: EmployeeAddEditComponent,
      resolve  : {
          data: EmployeeAddEditService
      }
  }, {
    path: '**',
    redirectTo: 'list'
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),

    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatSelectModule,
    MatStepperModule,
    MatDividerModule,
    MatDatepickerModule,
    MatSnackBarModule,
    MatCheckboxModule,
    MatMenuModule,

    AgmCoreModule.forRoot({
        apiKey: 'AIzaSyD81ecsCj4yYpcXSLFcYU97PvRsE_X8Bx8'
    }),

    FuseSharedModule,
    FuseWidgetModule,

    NgxDatatableModule
  ],
  declarations: [
    EmployeeListComponent,
    EmployeeAddEditComponent
  ],
  providers: [
    EmployeeListService,
    EmployeeAddEditService
  ]
})
export class EmployeeModule { }
