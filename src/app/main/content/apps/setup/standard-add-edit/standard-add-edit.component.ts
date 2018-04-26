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
              public dialogRef: MatDialogRef<StandardAddEditComponent>,
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
          this.displayNotification('Standard added successfully');
      });
  }

  updateDivision(): void {
    let data = this.data.selectedDivision;
    this.standardAddEditService.updateStandard(data)
      .then(() => {
        this.dialogRef.close(['save', this.standardForm]);  
          
        //Show the success message
        this.displayNotification('Standard updated successfully');
      });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  displayNotification(msg): void {
    this.snackBar.open(msg, 'OK', {
        verticalPosition: 'top',
        duration        : 3000
    });
  }
}