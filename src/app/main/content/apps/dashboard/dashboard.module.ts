import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import {
  MatIconModule,
  MatCardModule,
  MatListModule,
  MatSidenavModule
  } from '@angular/material';
import { FuseSharedModule } from '@fuse/shared.module';
import { FuseWidgetModule } from '@fuse/components/widget/widget.module';
import { DashboardHomeComponent } from './dashboard-home/dashboard-home.component';

const routes = [
  {
    path: 'home',
    component: DashboardHomeComponent
  },
  {
    path: '',
    redirectTo: 'home'
  }
];
@NgModule({
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    MatIconModule,
    MatCardModule,
    MatListModule,
    MatSidenavModule,
    FuseSharedModule,
    FuseWidgetModule
  ],
  declarations: [DashboardHomeComponent]
})
export class DashboardModule { }
