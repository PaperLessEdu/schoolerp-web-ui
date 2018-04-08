import { Component, OnInit, ViewEncapsulation, OnDestroy } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { Student } from './students.model';
import { Subscription } from 'rxjs/Subscription';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { StudentAddEditService } from './student-add-edit.service';

@Component({
  selector: 'app-student-add-edit',
  templateUrl: './student-add-edit.component.html',
  styleUrls: ['./student-add-edit.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})
export class StudentAddEditComponent implements OnInit, OnDestroy {

  student = new Student();
  onStudentChanged: Subscription;
  pageType: string;

  form: FormGroup;
  formErrors: any;

  // Horizontal Stepper
  generalInfo: FormGroup;
  parentsInfo: FormGroup;
  // horizontalStepperStep3: FormGroup;

  generalInfoErrors: any;
  parentsInfoErrors: any;
  // horizontalStepperStep3Errors: any;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    public snackBar: MatSnackBar,
    private studentAddEditService: StudentAddEditService
  ) {
    this.init();
  }

  private init(): void {
    this.initFormErrors();
  }

  private initFormErrors(): void {
    // Reactive form errors  
    // Horizontal Stepper form error
    this.generalInfoErrors = {
      academicYear: {},
      name: {},
      dob: {},
      permanentAddress: {},
      correspondenceAddress: {},
      country: {},
      city: {},
      state: {},
      postalCode: {},
      category: {},
      caste: {},
      religion: {},
      gender: {},
      bloodGroup: {},
    };

    this.parentsInfoErrors = {
      fathersName: {},
      mothersName: {},
      qualification: {},
      occupation: {},
      phoneNumber: {},
      emailId: {},
    };
  }

  ngOnInit() {
    this.subscribeStudentChangeEvent();
  }

  ngOnDestroy() {
    this.onStudentChanged.unsubscribe();
  }

  private subscribeStudentChangeEvent(): void {
    // Subscribe to update product on changes
    this.onStudentChanged =
      this.studentAddEditService.onStudentChanged
        .subscribe(student => {
          this.generalInfo = this.generalInfoForm();
          this.parentsInfo = this.parentsInfoForm();
          // this.horizontalStepperStep3 = this.horizontalStepperStep3Form();
        });
  }

  private generalInfoForm(): FormGroup {
    return this.formBuilder.group({
      academicYear: [this.student.academicYear || '', Validators.required],
      dob: [this.student.dob || '', Validators.required],
      name: [this.student.name || '', Validators.required],
      permanentAddress: [this.student.permanentAddress || '', Validators.required],
      correspondenceAddress: [this.student.correspondenceAddress || '', Validators.required],
      country: [this.student.country || '', Validators.required],
      state: [this.student.state || '', Validators.required],
      city: [this.student.city || '', Validators.required],
      postalCode: [this.student.postalCode || '', [Validators.required, Validators.maxLength(6)]],
      category: [this.student.category || '', Validators.required],
      caste: [this.student.caste || '', Validators.required],
      religion: [this.student.religion || '', Validators.required],
      gender: [this.student.gender || '', Validators.required],
      bloodGroup: [this.student.bloodGroup || '']
    });
  }

  private parentsInfoForm(): FormGroup {
    return this.formBuilder.group({
      fathersName: [this.student.fathersName || '', Validators.required],
      mothersName: [this.student.mothersName || '', Validators.required],
      qualification: [this.student.qualification || '', Validators.required],
      occupation: [this.student.occupation || '', Validators.required],
      phoneNumber: [this.student.phoneNumber || '', Validators.required],
      emailId: [this.student.emailId || '', Validators.required],
    });
  }
}
