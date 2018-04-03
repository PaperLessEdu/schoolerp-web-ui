import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { StudentListComponent } from './student-list/student-list.component';
import { MatIconModule,
  MatButtonModule,
  MatCardModule } from '@angular/material';
import { FuseSharedModule } from '@fuse/shared.module';
import { FuseWidgetModule } from '@fuse/components';

const routes = [
  {
    path: 'list',
    component: StudentListComponent
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

    MatIconModule,
    MatButtonModule,
    MatCardModule,

    FuseSharedModule, // To add title on card panel
    FuseWidgetModule
  ],
  declarations: [
    StudentListComponent
  ]
})
export class StudentModule { }
