import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatCheckboxModule, MatRadioModule, MatDatepickerModule, MatIconModule, MatToolbarModule, MatInputModule, MatDialogModule, MatButtonModule } from '@angular/material';
import { FuseSharedModule } from '@fuse/shared.module';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

import { AcademicYearListComponent } from './academic-year-list/academic-year-list.component';
import { AcademicYearListService } from './academic-year-list/academic-year-list.service';
import { AcademicYearAddEditComponent } from './academic-year-add-edit/academic-year-add-edit.component';
import { AcademicYearAddEditService } from './academic-year-add-edit/academic-year-add-edit.service';

const routes = [
  {
    path: 'list',
    component: AcademicYearListComponent
  }
];

@NgModule({
    imports: [
      RouterModule.forChild(routes),
      CommonModule,
      MatIconModule,
      MatToolbarModule,
      MatInputModule,
      MatDialogModule,
      MatButtonModule,
      MatDatepickerModule,
      MatRadioModule,
      MatCheckboxModule,

      FuseSharedModule,
      NgxDatatableModule
    ],
    declarations: [
      AcademicYearListComponent,
      AcademicYearAddEditComponent
    ],
    providers: [
      AcademicYearListService,
      AcademicYearAddEditService
    ],
    entryComponents: [
      AcademicYearAddEditComponent
    ]
  })
  export class AcademicYearModule { }
