import { NgModule } from '@angular/core';
import { EmployeeModule } from 'app/main/content/apps/employee/employee.module';
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
