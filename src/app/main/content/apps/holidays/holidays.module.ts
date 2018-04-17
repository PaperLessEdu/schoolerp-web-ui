import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { 
  MatCheckboxModule,
  MatIconModule,
  MatFormFieldModule,
  MatButtonModule,
  MatInputModule
  } from '@angular/material';
import { FuseSharedModule } from '@fuse/shared.module';
import { FuseWidgetModule } from '@fuse/components/widget/widget.module';

import { HolidayListComponent } from './holiday-list/holiday-list.component';
import { HolidayListService } from './holiday-list/holiday-list.service';


const routes = [
  {
    path: 'list',
    component: HolidayListComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    MatIconModule,
    MatFormFieldModule,
    MatCheckboxModule,
    NgxDatatableModule,
    MatButtonModule,
    MatInputModule,
    FuseSharedModule,
    FuseWidgetModule
  ],
  declarations: [
    HolidayListComponent
  ],
  providers: [
    HolidayListService
  ]
})
export class HolidaysModule { }
