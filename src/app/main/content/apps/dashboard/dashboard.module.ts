import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DashboardHomeComponent } from './dashboard-home/dashboard-home.component';

const routes = [
  {
    path: 'home',
    component: DashboardHomeComponent
  }
];
@NgModule({
  imports: [
    RouterModule.forChild(routes),
    CommonModule
  ],
  declarations: [DashboardHomeComponent]
})
export class DashboardModule { }
