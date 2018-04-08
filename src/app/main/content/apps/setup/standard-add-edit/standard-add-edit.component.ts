import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MatSnackBar } from '@angular/material';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { StandardAddEditService } from './standard-add-edit.service';

@Component({
  selector: 'app-standard-add',
  templateUrl: './standard-add-edit.component.html',
  styleUrls: ['./standard-add-edit.component.scss']
})
export class StandardAddEditComponent implements OnInit {

  standardForm: FormGroup;
  standardFormErrors: any;

  constructor(private formBuilder: FormBuilder,
              private snackBar: MatSnackBar,
              private standardAddEditService: StandardAddEditService,
              private dialogRef: MatDialogRef<StandardAddEditComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
    this.standardFormErrors = {
      name: {}
    };
  }

  ngOnInit() {
    this.standardForm = this.formBuilder.group({
      name: ['', Validators.required]
    });  
  }

  addStandard(): void {
    let data = this.standardForm.getRawValue();
    this.standardAddEditService.addStandard(data)
      .then(() => {
        this.dialogRef.close(['save',this.standardForm]); 
          
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
