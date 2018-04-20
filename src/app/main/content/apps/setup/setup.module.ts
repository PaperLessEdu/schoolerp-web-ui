import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatMenuModule, MatCheckboxModule, MatSnackBarModule, MatButtonModule, MatIconModule, MatInputModule, MatDialogModule, MatToolbarModule } from '@angular/material';
import { FuseSharedModule } from '@fuse/shared.module';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

import { SharedModule } from '../shared/shared.module';
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
    component: StandardListComponent
  },
  {
    path: 'subjects',
    component: SubjectListComponent
  },
  {
    path: 'divisions',
    component: DivisionListComponent
  },
  {
    path: 'timetable',
    loadChildren: './timetable/timetable.module#TimetableModule'
  },
  {
    path: 'roles',
    loadChildren: './role/role.module#RoleModule'
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),

    MatCheckboxModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatDialogModule,
    MatSnackBarModule,
    MatToolbarModule,
    MatMenuModule,

    FuseSharedModule,
    NgxDatatableModule,
    SharedModule
  ],
  declarations: [
    StandardListComponent, 
    StandardAddEditComponent, 
    SubjectListComponent, 
    SubjectAddEditComponent, 
    DivisionListComponent, 
    DivisionAddEditComponent
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
