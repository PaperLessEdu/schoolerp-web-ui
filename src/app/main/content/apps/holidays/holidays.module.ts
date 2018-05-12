import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { 
  MatCheckboxModule,
  MatIconModule,
  MatFormFieldModule,
  MatButtonModule,
  MatInputModule,
  MatToolbarModule,
  MatDialogModule,
  MatSnackBarModule
  } from '@angular/material';
import { FuseSharedModule } from '@fuse/shared.module';
import { FuseWidgetModule } from '@fuse/components/widget/widget.module';
import { SharedModule } from './../shared/shared.module';

import { HolidayListComponent } from './holiday-list/holiday-list.component';
import { HolidayListService } from './holiday-list/holiday-list.service';
import { HolidayAddEditComponent } from './holiday-add-edit/holiday-add-edit.component';
import { HolidayAddEditService } from './holiday-add-edit/holiday-add-edit.service';

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
    MatToolbarModule,
    MatDialogModule,
    MatSnackBarModule,
    FuseSharedModule,
    FuseWidgetModule,
    SharedModule
  ],
  declarations: [
    HolidayListComponent,
    HolidayAddEditComponent
  ],
  providers: [
    HolidayListService,
    HolidayAddEditService
  ],
  entryComponents: [
    HolidayAddEditComponent
  ]
})
export class HolidaysModule {  }
