import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MatSnackBar } from '@angular/material';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import * as moment from 'moment';

import { Constants, MY_FORMATS } from '../../../shared/constants';
import { AcademicYearAddEditService } from './academic-year-add-edit.service';

@Component({
  selector: 'app-academic-year-add-edit',
  templateUrl: './academic-year-add-edit.component.html',
  styleUrls: ['./academic-year-add-edit.component.scss'],
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
export class AcademicYearAddEditComponent implements OnInit {
  academicYearForm: FormGroup;
  get name() { return this.academicYearForm.get('name'); }
  get startDate() { return this.academicYearForm.get('startDate'); }
  get endDate() { return this.academicYearForm.get('endDate'); }

  constructor(private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private academicYearAddEditService: AcademicYearAddEditService,
    public dialogRef: MatDialogRef<AcademicYearAddEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  ngOnInit() {
    this.academicYearForm = this.formBuilder.group({
        name: new FormControl('', Validators.required),
        startDate: new FormControl('', Validators.required),
        endDate: new FormControl('', Validators.required),
        weekendType: new FormControl('EverySunday', Validators.required),
        current: new FormControl(false, Validators.required)
    });
  }

  addAcademicYear(): void {
    const data = this.academicYearForm.getRawValue();
    data.startDate = data.startDate.format('YYYY-MM-DD');
    data.endDate = data.endDate.format('YYYY-MM-DD');
    this.academicYearAddEditService.addAcademicYear(data)
      .then(() => {
        this.dialogRef.close(['save', this.academicYearForm]);

        // Show the success message
        this.displayNotification('Academic Year added successfully');
      });
  }

  updateAcademicYear(): void {
    const data = this.data.selectedAcademicYear;
    this.academicYearAddEditService.updateAcademicYear(data)
      .then(() => {
        this.dialogRef.close(['save', this.academicYearForm]);

        // Show the success message
        this.displayNotification('Academic Year updated successfully');
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
