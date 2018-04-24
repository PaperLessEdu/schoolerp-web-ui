import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { CommunicationHomeComponent } from './communication-home/communication-home.component';

const routes = [
  {
    path: 'home',
    component: CommunicationHomeComponent
  }
];
@NgModule({
  imports: [
    RouterModule.forChild(routes),
    CommonModule
  ],
  declarations: [CommunicationHomeComponent]
})
export class CommunicationModule { }
