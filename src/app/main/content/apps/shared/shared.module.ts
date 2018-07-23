import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule, MatIconModule, MatDialogModule, MatToolbarModule } from '@angular/material';

import { FuseSharedModule } from '@fuse/shared.module';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';
import { ExportAsPdfService } from './services/export-as-pdf.service';
import { DateUtilService } from './services/date-util.service';
import { CommunicationService } from './services/communication.service';
import { UtilsService } from './services/utils.service';

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
  entryComponents: [ConfirmationDialogComponent],
  providers: [ExportAsPdfService, DateUtilService, CommunicationService, UtilsService]
})
export class SharedModule { }
