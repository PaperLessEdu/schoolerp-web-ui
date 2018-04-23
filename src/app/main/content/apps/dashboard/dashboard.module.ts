import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { 
  MatIconModule,
  MatCardModule
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
    FuseSharedModule,
    FuseWidgetModule
  ],
  declarations: [DashboardHomeComponent]
})
export class DashboardModule { }
