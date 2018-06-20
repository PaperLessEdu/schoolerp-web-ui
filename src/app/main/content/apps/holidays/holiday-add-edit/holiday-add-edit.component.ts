import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MatSnackBar } from '@angular/material';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { HolidayAddEditService } from './holiday-add-edit.service';
import { MY_FORMATS } from '../../shared/constants';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import * as moment from 'moment';

@Component({
  selector: 'app-holiday-add-edit',
  templateUrl: './holiday-add-edit.component.html',
  styleUrls: ['./holiday-add-edit.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE]
    },
    {
      provide: MAT_DATE_FORMATS,
      useValue: MY_FORMATS
    }
  ]
})
export class HolidayAddEditComponent implements OnInit {

  holidayForm: FormGroup;

  get date() { return this.holidayForm.get('date'); }

  get name() { return this.holidayForm.get('name'); }

  constructor(private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private holidayAddEditService: HolidayAddEditService,
    public dialogRef: MatDialogRef<HolidayAddEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  ngOnInit() {
    this.holidayForm = this.formBuilder.group({
      date: new FormControl(moment(this.data.selectedHoliday.date) || '', Validators.required),
      name: new FormControl(this.data.selectedHoliday.name || '', Validators.required)
    });
  }

  addHoliday(): void {
    const data = this.holidayForm.getRawValue();
    this.holidayAddEditService.addHoliday(data)
      .then(() => {
        this.dialogRef.close(['save', this.holidayForm]);

        // Show the success message
        const msg = 'Holiday added successfully';
        this.snackBar.open(msg, 'OK', {
          verticalPosition: 'top',
          duration: 3000
        });
      });
  }

  updateHoliday(): void {
    const data = this.holidayForm.getRawValue();
    this.holidayAddEditService.updateHoliday(this.data.selectedHoliday.holiday_id, data)
      .then(() => {
        this.dialogRef.close(['save', this.holidayForm]);

        // Show the success message
        const msg = 'Holiday updated successfully';
        this.snackBar.open(msg, 'OK', {
          verticalPosition: 'top',
          duration: 3000
        });
      });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
