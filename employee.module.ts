import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { RouterModule } from '@angular/router';
import { FuseSharedModule } from '@fuse/shared.module';

const routes = [
  {
    path: 'list',
    component: EmployeeListComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    FuseSharedModule
  ],
  declarations: [EmployeeListComponent]
})
export class EmployeeModule { }
