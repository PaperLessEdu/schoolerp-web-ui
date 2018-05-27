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

  get name(){ return this.standardForm.get('name'); }

  constructor(private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private standardAddEditService: StandardAddEditService,
    public dialogRef: MatDialogRef<StandardAddEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  ngOnInit() {
    this.standardForm = this.formBuilder.group({
      name: new FormControl('', Validators.required)
    });
  }

  addStandard(): void {
    const data = this.standardForm.getRawValue();
    this.standardAddEditService.addStandard(data)
      .then(() => {
        this.dialogRef.close(['save', this.standardForm]);

        // Show the success message
        this.displayNotification('Standard added successfully');
      });
  }

  updateStandard(): void {
    const data = this.data.selectedStd;
    this.standardAddEditService.updateStandard(data)
      .then(() => {
        this.dialogRef.close(['save', this.standardForm]);

        // Show the success message
        this.displayNotification('Standard updated successfully');
      });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  displayNotification(msg): void {
    this.snackBar.open(msg, 'OK', {
      verticalPosition: 'top',
      duration: 3000
    });
  }
}