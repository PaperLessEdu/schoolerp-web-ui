import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MatSnackBar } from '@angular/material';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { DivisionAddEditService } from './division-add-edit.service';

@Component({
  selector: 'app-division-add-edit',
  templateUrl: './division-add-edit.component.html',
  styleUrls: ['./division-add-edit.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DivisionAddEditComponent implements OnInit {

  divisionForm: FormGroup;
  divisionFormErrors: any;

  constructor(private formBuilder: FormBuilder,
              private snackBar: MatSnackBar,
              private divisionAddEditService: DivisionAddEditService,
              public dialogRef: MatDialogRef<DivisionAddEditComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
    this.divisionFormErrors = {
      name: {}
    };
  }

  ngOnInit() {
    this.divisionForm = this.formBuilder.group({
      name: ['', Validators.required]
    });  
  }

  addDivision(): void {
    let data = this.divisionForm.getRawValue();
    this.divisionAddEditService.addDivision(data)
      .then(() => {
        this.dialogRef.close(['save', this.divisionForm]);  
          
        //Show the success message
        this.displayNotification('Division added successfully');
      });
  }

  updateDivision(): void {
    let data = this.data.selectedDivision;
    this.divisionAddEditService.updateDivision(data)
      .then(() => {
        this.dialogRef.close(['save', this.divisionForm]);  
          
        //Show the success message
        this.displayNotification('Division updated successfully');
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
