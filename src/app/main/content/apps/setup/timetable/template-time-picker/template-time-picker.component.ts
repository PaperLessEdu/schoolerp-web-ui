import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-template-time-picker',
  templateUrl: './template-time-picker.component.html',
  styleUrls: ['./template-time-picker.component.scss']
})
export class TemplateTimePickerComponent implements OnInit {

  timePickerForm: FormGroup;
  timePickerFormErrors: any;

  constructor(private formBuilder: FormBuilder,
              public dialogRef: MatDialogRef<TemplateTimePickerComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) { 
    this.timePickerFormErrors = { 
      startTime: {},
      endTime: {}
    };
  }

  ngOnInit() { 
    this.timePickerForm = this.formBuilder.group({
      name: [''],
      startTime: ['', Validators.required],
      endTime: ['', Validators.required]
    });  
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  addSlot(): void {
    this.dialogRef.close(['save',this.timePickerForm]); 
  }
}
