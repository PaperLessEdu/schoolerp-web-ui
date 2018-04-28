import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { 
  MatCheckboxModule,
  MatIconModule,
  MatFormFieldModule,
  MatButtonModule,
  MatInputModule,
  MatToolbarModule,
  MatDialogModule,
  MatSnackBarModule,
  MatSelectModule
  } from '@angular/material';
import { FuseSharedModule } from '@fuse/shared.module';
import { FuseWidgetModule } from '@fuse/components/widget/widget.module';

import { CommunicationHomeComponent } from './communication-home/communication-home.component';
import { CommunicationHomeService } from './communication-home/communication-home.service';

const routes = [
  {
    path: 'home',
    component: CommunicationHomeComponent
  }
];
@NgModule({
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    MatCheckboxModule,
    MatIconModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    MatToolbarModule,
    MatDialogModule,
    MatSnackBarModule,
    MatSelectModule,
    
    FuseWidgetModule,
    FuseSharedModule
  ],
  declarations: [CommunicationHomeComponent],
  providers: [CommunicationHomeService]
})
export class CommunicationModule { }
