import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FuseSharedModule } from '@fuse/shared.module';

const routes = [
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
