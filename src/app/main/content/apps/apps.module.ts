import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FuseSharedModule } from '@fuse/shared.module';

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
  }
];

@NgModule({
  imports: [
    FuseSharedModule,
    RouterModule.forChild(routes)
  ],
  declarations: []
})
export class AppsModule { }
