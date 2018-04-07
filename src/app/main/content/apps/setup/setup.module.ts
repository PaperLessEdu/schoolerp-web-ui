import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CdkTableModule } from '@angular/cdk/table';
import { MatSnackBarModule, MatButtonModule, MatIconModule, MatInputModule, MatPaginatorModule, MatSortModule, MatTableModule, MatDialogModule, MatToolbarModule } from '@angular/material';
import { AgmCoreModule } from '@agm/core';

import { FuseSharedModule } from '@fuse/shared.module';

import { StandardListComponent } from './standard-list/standard-list.component';
import { StandardAddEditComponent } from './standard-add-edit/standard-add-edit.component';
import { StandardListService } from './standard-list/standard-list.service';
import { StandardAddEditService } from './standard-add-edit/standard-add-edit.service';
import { SubjectListComponent } from './subject-list/subject-list.component';
import { SubjectAddEditComponent } from './subject-add-edit/subject-add-edit.component';
import { SubjectListService } from './subject-list/subject-list.service';
import { SubjectAddEditService } from './subject-add-edit/subject-add-edit.service';
import { DivisionListComponent } from './division-list/division-list.component';
import { DivisionAddEditComponent } from './division-add-edit/division-add-edit.component';
import { DivisionListService } from './division-list/division-list.service';
import { DivisionAddEditService } from './division-add-edit/division-add-edit.service';

const routes = [
  {
    path: 'standards',
    component: StandardListComponent,
    resolve  : {
        data: StandardListService
    }
  },
  {
    path: 'subjects',
    component: SubjectListComponent,
    resolve  : {
        data: SubjectListService
    }
  },
  {
    path: 'divisions',
    component: DivisionListComponent,
    resolve  : {
        data: DivisionListService
    }
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    
    CdkTableModule,

    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatPaginatorModule,
    MatSortModule,
    MatTableModule,
    MatDialogModule,
    MatSnackBarModule,
    MatToolbarModule,

    FuseSharedModule
  ],
  declarations: [
    StandardListComponent, StandardAddEditComponent, SubjectListComponent, SubjectAddEditComponent, DivisionListComponent, DivisionAddEditComponent
  ],
  providers: [
    StandardListService,
    StandardAddEditService,
    SubjectListService,
    SubjectAddEditService,
    DivisionListService,
    DivisionAddEditService
  ],
  entryComponents: [
    StandardAddEditComponent, 
    SubjectAddEditComponent,
    DivisionAddEditComponent
  ]
})
export class SetupModule { }
