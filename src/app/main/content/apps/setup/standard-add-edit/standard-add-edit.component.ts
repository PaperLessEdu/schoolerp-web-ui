import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MatSnackBar } from '@angular/material';

import { StandardAddEditService } from './standard-add-edit.service';

@Component({
  selector: 'app-standard-add',
  templateUrl: './standard-add-edit.component.html',
  styleUrls: ['./standard-add-edit.component.scss']
})
export class StandardAddEditComponent {

  standardName: string;

  constructor(private snackBar: MatSnackBar,
              private standardAddEditService: StandardAddEditService,
              private dialogRef: MatDialogRef<StandardAddEditComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  addStandard(): void {
    let data = {
      name: this.standardName
    };
    this.standardAddEditService.addStandard(data)
      .then(() => {
          this.dialogRef.close();
          
          //Show the success message
          let msg = 'Standard added successfully';
          this.snackBar.open(msg, 'OK', {
              verticalPosition: 'top',
              duration        : 3000
          });
      });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
