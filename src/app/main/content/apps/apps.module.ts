import { NgModule } from '@angular/core';
import { EmployeeModule } from 'app/main/content/apps/employee/employee.module';
import { RouterModule } from '@angular/router';
import { FuseSharedModule } from '@fuse/shared.module';
const routes = [
  {
      path      : 'employee',
      loadChildren: './employee/employee.module#EmployeeModule'
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
