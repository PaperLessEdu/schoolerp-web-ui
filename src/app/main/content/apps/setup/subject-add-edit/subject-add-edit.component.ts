import { Component, OnInit, Inject, ViewEncapsulation } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MatSnackBar } from '@angular/material';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { SubjectAddEditService } from './subject-add-edit.service';

@Component({
  selector: 'app-subject-add-edit',
  templateUrl: './subject-add-edit.component.html',
  styleUrls: ['./subject-add-edit.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SubjectAddEditComponent implements OnInit {

  //subjectName: string;
  //subjectAbb: string;

  subjectForm: FormGroup;
  subjectFormErrors: any;

  constructor(private formBuilder: FormBuilder,
              private snackBar: MatSnackBar,
              private subjectAddEditService: SubjectAddEditService,
              public dialogRef: MatDialogRef<SubjectAddEditService>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
    this.subjectFormErrors = {
      name: {},
      abbreviation: {}
    };
  }

  ngOnInit() { 
    this.subjectForm = this.formBuilder.group({
      name: ['', Validators.required],
      abbreviation: ['', Validators.required]
    });  
  }

  addSubject(): void {
    let data = this.subjectForm.getRawValue();
    this.subjectAddEditService.addSubject(data)
      .then(() => {
          this.dialogRef.close(['save',this.subjectForm]);  
          
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
