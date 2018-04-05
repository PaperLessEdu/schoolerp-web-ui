import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-standard-add',
  templateUrl: './standard-add.component.html',
  styleUrls: ['./standard-add.component.scss']
})
export class StandardAddComponent {

  constructor(public dialogRef: MatDialogRef<StandardAddComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
