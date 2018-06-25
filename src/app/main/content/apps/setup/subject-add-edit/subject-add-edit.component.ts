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
  subjectForm: FormGroup;

  get name() { return this.subjectForm.get('name'); }

  constructor(private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private subjectAddEditService: SubjectAddEditService,
    public dialogRef: MatDialogRef<SubjectAddEditService>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  ngOnInit() {
    this.subjectForm = this.formBuilder.group({
      name: new FormControl('', Validators.required),
    });
  }

  addSubject(): void {
    const data = this.subjectForm.getRawValue();
    this.subjectAddEditService.addSubject(data)
      .then(() => {
        this.dialogRef.close(['save', this.subjectForm]);
        // Show the success message
        this.displayNotification('Subject added successfully');
      });
  }

  updateSubject(): void {
    const data = this.data.selectedSubject;
    this.subjectAddEditService.updateSubject(data)
      .then(() => {
        this.dialogRef.close(['save', this.subjectForm]);

        // Show the success message
        this.displayNotification('Subject updated successfully');
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
