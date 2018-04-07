import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MatSnackBar } from '@angular/material';
import { DivisionAddEditService } from './division-add-edit.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

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
              private dialogRef: MatDialogRef<DivisionAddEditComponent>,
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
        this.dialogRef.close(['save',this.divisionForm]);  
        //this.dialogRef.close();
          
        //Show the success message
        let msg = 'Division added successfully';
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
