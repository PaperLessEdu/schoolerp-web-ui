import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatIconModule, MatToolbarModule, MatInputModule, MatDialogModule, MatButtonModule } from '@angular/material';
import { FuseSharedModule } from '@fuse/shared.module';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

import { AcademicYearListComponent } from './academic-year-list/academic-year-list.component';
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

      FuseSharedModule,
      NgxDatatableModule
    ],
    declarations: [
      AcademicYearListComponent
    ],
    entryComponents: [
    ]
  })
  export class AcademicYearModule { }
