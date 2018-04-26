import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MatSnackBar } from '@angular/material';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { HolidayAddEditService } from './holiday-add-edit.service';

@Component({
  selector: 'app-holiday-add-edit',
  templateUrl: './holiday-add-edit.component.html',
  styleUrls: ['./holiday-add-edit.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class HolidayAddEditComponent implements OnInit {

  holidayForm: FormGroup;
  holidayFormErrors: any;

  constructor(private formBuilder: FormBuilder,
              private snackBar: MatSnackBar,
              private holidayAddEditService: HolidayAddEditService,
              public dialogRef: MatDialogRef<HolidayAddEditComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) { 
      this.holidayFormErrors = {
        date: {},
        name: {}
      };  
    }

  ngOnInit() {
    this.holidayForm = this.formBuilder.group({
      date: ['', Validators.required],
      name: ['', Validators.required]
    });
  }

  addHoliday(): void {
    let data = this.holidayForm.getRawValue();
    this.holidayAddEditService.addHoliday(data)
      .then(() => {
        this.dialogRef.close(['save',this.holidayForm]);  
          
        //Show the success message
        let msg = 'Holiday added successfully';
        this.snackBar.open(msg, 'OK', {
            verticalPosition: 'top',
            duration        : 3000
        });
      });
  }

  updateHoliday(): void {
    let data = this.data.selectedHoliday;
    this.holidayAddEditService.updateHoliday(data)
      .then(() => {
        this.dialogRef.close(['save',this.holidayForm]);  
          
        //Show the success message
        let msg = 'Holiday updated successfully';
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
