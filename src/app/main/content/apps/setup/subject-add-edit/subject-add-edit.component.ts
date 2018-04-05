import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MatSnackBar } from '@angular/material';

import { SubjectAddEditService } from './subject-add-edit.service';

@Component({
  selector: 'app-subject-add-edit',
  templateUrl: './subject-add-edit.component.html',
  styleUrls: ['./subject-add-edit.component.scss']
})
export class SubjectAddEditComponent implements OnInit {

  subjectName: string;

  constructor(private snackBar: MatSnackBar,
      private subjectAddEditService: SubjectAddEditService,
      private dialogRef: MatDialogRef<SubjectAddEditService>,
      @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  ngOnInit() { }

  addSubject(): void {
    let data = {
      name: this.subjectName
    };
    this.subjectAddEditService.addSubject(data)
      .then(() => {
          this.dialogRef.close();
          
          //Show the success message
          let msg = 'Subject added successfully';
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
