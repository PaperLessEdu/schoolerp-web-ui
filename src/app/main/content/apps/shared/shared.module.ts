import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule, MatIconModule, MatDialogModule, MatToolbarModule } from '@angular/material';

import { FuseSharedModule } from '@fuse/shared.module';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule, 
    MatIconModule, 
    MatDialogModule,
    MatToolbarModule,
    FuseSharedModule
  ],
  declarations: [ConfirmationDialogComponent],
  entryComponents: [ConfirmationDialogComponent]
})
export class SharedModule { }
