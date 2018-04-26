import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FuseSharedModule } from '@fuse/shared.module';
import { FuseWidgetModule } from '@fuse/components/widget/widget.module';
import { 
  MatCheckboxModule,
  MatIconModule
  } from '@angular/material';

import { AttendanceTakerComponent } from './attendance-taker/attendance-taker.component';
import { AttendanceTakerService } from './attendance-taker/attendance-taker.service';


const routes = [
  {
    path: 'taker',
    component: AttendanceTakerComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    MatCheckboxModule,
    MatIconModule,
    FuseSharedModule,
    FuseWidgetModule
  ],
  declarations: [AttendanceTakerComponent]
})
export class AttendanceModule { }
