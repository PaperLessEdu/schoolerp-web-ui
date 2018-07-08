import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatStepperModule, MatFormFieldModule, MatCheckboxModule,
         MatSnackBarModule, MatIconModule, MatToolbarModule, MatInputModule,
         MatDialogModule, MatButtonModule, MatSelectModule } from '@angular/material';
import { FuseSharedModule } from '@fuse/shared.module';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

import { FeeStructureAddEditService } from './fee-structure-add-edit/fee-structure-add-edit.service';
import { FeeStructureListComponent } from './fee-structure-list/fee-structure-list.component';
import { FeeStructureAddEditComponent } from './fee-structure-add-edit/fee-structure-add-edit.component';
import { SharedModule } from './../../shared/shared.module';

const routes = [
  {
    path: 'list',
    component: FeeStructureListComponent
  },
  {
    path     : 'list/:id',
    component: FeeStructureAddEditComponent
  },
  {
    path: 'new',
    component: FeeStructureAddEditComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    MatIconModule,
    MatButtonModule,
    NgxDatatableModule,
    MatCheckboxModule,
    MatSnackBarModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    MatToolbarModule,
    MatStepperModule,
    MatSelectModule,

    FuseSharedModule,
    SharedModule
  ],
  declarations: [
    FeeStructureListComponent,
    FeeStructureAddEditComponent
  ],
  providers: [
    FeeStructureAddEditService
  ],
  entryComponents: [
  ]
})
export class FeeStructureModule { }
