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
  MatMenuModule,
  MatDialogModule,
  MatToolbarModule,
  MatRadioModule} from '@angular/material';
import { AgmCoreModule } from '@agm/core';

import { FuseSharedModule } from '@fuse/shared.module';
import { FuseWidgetModule } from '@fuse/components/widget/widget.module';

import { NgxDatatableModule } from '@swimlane/ngx-datatable';

import { SharedModule } from '../shared/shared.module';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { EmployeeAddEditComponent } from './employee-add-edit/employee-add-edit.component';
import { EmployeeListService } from './employee-list/employee-list.service';
import { EmployeeAddEditService } from './employee-add-edit/employee-add-edit.service';
import { ChangeRoleComponent } from './change-role/change-role.component';
import { ChangeRoleService } from './change-role/change-role.service';
import { EmployeeProfileComponent } from './employee-profile/employee-profile.component';
import { EmployeeProfileService } from './employee-profile/employee-profile.service';
import { ChangeStandardSubjectComponent } from './change-standard-subject/change-standard-subject.component';
import { ChangeStandardSubjectService } from './change-standard-subject/change-standard-subject.service';
import { AuthGuard } from 'app/main/content/authentication/auth.guard';

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
      },
      canActivate: [AuthGuard]
  }, {
      path     : 'profile/:id',
      component: EmployeeProfileComponent
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
    MatRadioModule,
    MatDialogModule,
    MatToolbarModule,

    AgmCoreModule.forRoot({
        apiKey: 'AIzaSyD81ecsCj4yYpcXSLFcYU97PvRsE_X8Bx8'
    }),

    FuseSharedModule,
    FuseWidgetModule,

    NgxDatatableModule,
    SharedModule
  ],
  declarations: [
    EmployeeListComponent,
    EmployeeAddEditComponent,
    ChangeRoleComponent,
    EmployeeProfileComponent,
    ChangeStandardSubjectComponent
  ],
  providers: [
    EmployeeListService,
    EmployeeAddEditService,
    ChangeRoleService,
    EmployeeProfileService,
    ChangeStandardSubjectService
  ],
  entryComponents: [
    ChangeRoleComponent,
    ChangeStandardSubjectComponent
  ]
})
export class EmployeeModule { }
