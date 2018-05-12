import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FuseSharedModule } from '@fuse/shared.module';
import { MomentDateModule } from '@angular/material-moment-adapter';

const routes = [
  {
    path: 'dashboard',
    loadChildren: './dashboard/dashboard.module#DashboardModule'
  },
  {
    path: 'employee',
    loadChildren: './employee/employee.module#EmployeeModule'
  },
  {
    path: 'student',
    loadChildren: './student/student.module#StudentModule'
  },
  {
    path: 'attendance',
    loadChildren: './attendance/attendance.module#AttendanceModule'
  },
  {
    path: 'setup',
    loadChildren: './setup/setup.module#SetupModule'
  },
  {
    path: 'holidays',
    loadChildren: './holidays/holidays.module#HolidaysModule'
  },
  {
    path: 'examination',
    loadChildren: './examination/examination.module#ExaminationModule'
  },
  {
    path: 'communication',
    loadChildren: './communication/communication.module#CommunicationModule'
  },
  {
    path: '**',
    redirectTo: 'dashboard'
  },
  {
    path: '',
    redirectTo: 'dashboard'
  }
];

@NgModule({
  imports: [
    FuseSharedModule,
    RouterModule.forChild(routes),
    MomentDateModule
  ],
  declarations: []
})
export class AppsModule { }
