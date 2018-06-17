import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatGridListModule, MatIconModule, MatToolbarModule, MatInputModule, MatDialogModule, MatButtonModule } from '@angular/material';
import { FuseSharedModule } from '@fuse/shared.module';

import { TemplateListComponent } from './template-list/template-list.component';
import { TemplateAddEditComponent } from './template-add-edit/template-add-edit.component';
import { TemplateTimePickerComponent } from './template-time-picker/template-time-picker.component';

const routes = [
  {
    path: 'templates/list',
    component: TemplateListComponent
  },
  {
    path: 'templates/new',
    component: TemplateAddEditComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    MatGridListModule,
    MatIconModule,
    MatToolbarModule,
    MatInputModule,
    MatDialogModule,
    MatButtonModule,

    FuseSharedModule
  ],
  declarations: [
    TemplateListComponent,
    TemplateAddEditComponent,
    TemplateTimePickerComponent
  ],
  entryComponents: [
    TemplateTimePickerComponent
  ]
})
export class TimetableModule { }
