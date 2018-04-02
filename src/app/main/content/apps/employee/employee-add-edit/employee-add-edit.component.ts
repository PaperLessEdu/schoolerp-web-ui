import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';

import 'rxjs/add/operator/startWith';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/observable/fromEvent';
import { Subscription } from 'rxjs/Subscription';

import { fuseAnimations } from '@fuse/animations';
import { FuseUtils } from '@fuse/utils';

@Component({
  selector: 'app-employee-add-edit',
  templateUrl: './employee-add-edit.component.html',
  styleUrls: ['./employee-add-edit.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations   : fuseAnimations
})
export class EmployeeAddEditComponent implements OnInit {

  form: FormGroup;
  formErrors: any;

  // Horizontal Stepper
  horizontalStepperStep1: FormGroup;
  horizontalStepperStep2: FormGroup;
  horizontalStepperStep3: FormGroup;
  horizontalStepperStep1Errors: any;
  horizontalStepperStep2Errors: any;
  horizontalStepperStep3Errors: any;

  constructor(private formBuilder: FormBuilder) {
    // Reactive form errors  
    // Horizontal Stepper form error
    this.horizontalStepperStep1Errors = {
        firstName: {},
        middleName: {},
        lastName : {},
        address: {},
        city: {},
        state: {},
        postalCode: {},
        
        emailId: {},
        phoneNumber: {},

        gender: {},
        dob: {},
        bloodGroup: {},
        
        maritalStatus: {}
    };

    this.horizontalStepperStep2Errors = {
      qualification: {},
      occupation: {},
      dateOfJoining : {},
      joinedAs: {}
    };

    this.horizontalStepperStep3Errors = {
        panCardNumber: {},
        aadharCardNumber: {},
        bankName: {},
        bankAccountNumber: {},
        bankIFSCCode: {}
    };  
  }

  ngOnInit() {
    // Reactive Form  
    // Horizontal Stepper form steps
    this.horizontalStepperStep1 = this.formBuilder.group({
        firstName: ['', Validators.required],
        middleName: [''],
        lastName : ['', Validators.required],
        address: ['', Validators.required],
        city      : ['', Validators.required],
        state     : ['', Validators.required],
        postalCode: ['', [Validators.required, Validators.maxLength(6)]],
        emailId: ['', [Validators.email]],
        phoneNumber: ['', [Validators.required, Validators.maxLength(10)]],
        gender: ['', Validators.required],
        dob: ['', Validators.required],
        bloodGroup: [''],
        maritalStatus: ['', Validators.required]
    });

    this.horizontalStepperStep2 = this.formBuilder.group({
        qualification: ['', Validators.required],
        occupation: ['', Validators.required],
        dateOfJoining: ['', Validators.required],
        joinedAs: ['', Validators.required]
    });

    this.horizontalStepperStep3 = this.formBuilder.group({
      panCardNumber: ['', Validators.required],
      aadharCardNumber: [''],
      bankName: ['', Validators.required],
      bankAccountNumber: ['', Validators.required],
      bankIFSCCode: ['', Validators.required]
    });

    this.horizontalStepperStep1.valueChanges.subscribe(() => {
        this.onFormValuesChanged();
    });

    this.horizontalStepperStep2.valueChanges.subscribe(() => {
        this.onFormValuesChanged();
    });

    this.horizontalStepperStep3.valueChanges.subscribe(() => {
        this.onFormValuesChanged();
    });
  }

  onFormValuesChanged() {
      
  }

  finishHorizontalStepper() {
      alert('You have finished the horizontal stepper!');
  }
}
