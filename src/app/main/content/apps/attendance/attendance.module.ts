import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { AttendaceTakerComponent } from './attendace-taker/attendace-taker.component';

const routes = [
  {
    path: 'taker',
    component: AttendaceTakerComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    CommonModule
  ],
  declarations: [AttendaceTakerComponent]
})
export class AttendanceModule { }
