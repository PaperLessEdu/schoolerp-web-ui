import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { StudentListComponent } from './student-list/student-list.component';
import { MatIconModule,
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
  MatSortModule} from '@angular/material';
import { FuseSharedModule } from '@fuse/shared.module';
import { FuseWidgetModule } from '@fuse/components';
import { StudentListService } from 'app/main/content/apps/student/student-list/student-list.service';
import { CdkTableModule } from '@angular/cdk/table';

const routes = [
  {
    path: 'list',
    component: StudentListComponent,
    resolve: {
      data: StudentListService
    }
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

    FuseSharedModule, // To add title on card panel
    FuseWidgetModule
  ],
  declarations: [
    StudentListComponent
  ],
  providers: [
    StudentListService
  ]
})
export class StudentModule { }
