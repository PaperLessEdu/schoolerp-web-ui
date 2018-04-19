import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule, MatCheckboxModule, MatSnackBarModule, MatIconModule, MatToolbarModule, MatInputModule, MatDialogModule, MatButtonModule } from '@angular/material';
import { FuseSharedModule } from '@fuse/shared.module';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

import { SharedModule } from './../../shared/shared.module';
import { RoleListService } from './role-list/role-list.service';
import { RoleListComponent } from './role-list/role-list.component';
import { RoleAddEditComponent } from './role-add-edit/role-add-edit.component';
import { RoleAddEditService } from './role-add-edit/role-add-edit.service';

const routes = [
  {
    path: 'list',
    component: RoleListComponent
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
    
    FuseSharedModule,
    SharedModule
  ],
  declarations: [ 
    RoleListComponent, 
    RoleAddEditComponent 
  ],
  providers: [ 
    RoleListService ,
    RoleAddEditService
  ],
  entryComponents: [
    RoleAddEditComponent
  ]
})
export class RoleModule { }
