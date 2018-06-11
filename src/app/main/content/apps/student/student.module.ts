import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { StudentListComponent } from './student-list/student-list.component';
import {
  MatIconModule,
  MatButtonModule,
  MatCardModule,
  MatChipsModule,
  MatFormFieldModule,
  MatInputModule,
  MatPaginatorModule,
  MatSelectModule,
  MatRippleModule,
  MatSnackBarModule,
  MatDatepickerModule,
  MatDividerModule,
  MatStepperModule,
  MatTabsModule,
  MatTableModule,
  MatSortModule,
  MatRadioModule,
  MatMenuModule,
  MatExpansionModule
} from '@angular/material';
import { FuseSharedModule } from '@fuse/shared.module';
import { FuseWidgetModule } from '@fuse/components';
import { StudentListService } from 'app/main/content/apps/student/student-list/student-list.service';
import { CdkTableModule } from '@angular/cdk/table';
import { StudentAddEditComponent } from './student-add-edit/student-add-edit.component';
import { StudentAddEditService } from './student-add-edit/student-add-edit.service';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { StudentProfileComponent } from './student-profile/student-profile.component';
import { StudentProfileService } from 'app/main/content/apps/student/student-profile/student-profile.service';

const routes = [
  {
    path: 'list',
    component: StudentListComponent
  },
  {
    path: 'new',
    component: StudentAddEditComponent
  },
  {
    path: 'profile/:id',
    component: StudentProfileComponent
  },
  {
    path: '**',
    redirectTo: 'list'
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    CdkTableModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatChipsModule,
    MatFormFieldModule,
    MatInputModule,
    MatPaginatorModule,
    MatRippleModule,
    MatSelectModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatStepperModule,
    MatDividerModule,
    MatDatepickerModule,
    MatSnackBarModule,
    MatRadioModule,
    MatMenuModule,
    NgxDatatableModule,
    MatExpansionModule,

    FuseSharedModule, // To add title on card panel
    FuseWidgetModule
  ],
  declarations: [
    StudentListComponent,
    StudentAddEditComponent,
    StudentProfileComponent
  ],
  providers: [
    StudentListService,
    StudentAddEditService,
    StudentProfileService
  ]
})
export class StudentModule { }
