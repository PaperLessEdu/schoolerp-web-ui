import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router'; 
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
import { Employee } from './employee.model';
import { EmployeeAddEditService } from './employee-add-edit.service';

@Component({
  selector: 'app-employee-add-edit',
  templateUrl: './employee-add-edit.component.html',
  styleUrls: ['./employee-add-edit.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations   : fuseAnimations
})
export class EmployeeAddEditComponent implements OnInit, OnDestroy {

    employee = new Employee();
    onEmployeeChanged: Subscription;
    pageType: string;
    
    form: FormGroup;
    formErrors: any;

    // Horizontal Stepper
    horizontalStepperStep1: FormGroup;
    horizontalStepperStep2: FormGroup;
    horizontalStepperStep3: FormGroup;

    horizontalStepperStep1Errors: any;
    horizontalStepperStep2Errors: any;
    horizontalStepperStep3Errors: any;

    constructor(private formBuilder: FormBuilder,
                private router: Router,
                public snackBar: MatSnackBar,
                private employeeAddEditService: EmployeeAddEditService) {
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
            jobType: {}
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
        // this.horizontalStepperStep1.valueChanges.subscribe(() => {
        //     this.onFormValuesChanged();
        // });

        // this.horizontalStepperStep2.valueChanges.subscribe(() => {
        //     this.onFormValuesChanged();
        // });

        // this.horizontalStepperStep3.valueChanges.subscribe(() => {
        //     this.onFormValuesChanged();
        // });

        // Subscribe to update product on changes
        this.onEmployeeChanged =
        this.employeeAddEditService.onEmployeeChanged
            .subscribe(employee => {
                debugger;
                if (employee && employee.id) {
                    this.employee = new Employee(employee);
                    this.pageType = 'edit';
                } else {
                    this.pageType = 'new';
                    this.employee = new Employee();
                }
                this.horizontalStepperStep1 = this.horizontalStepperStep1Form();
                this.horizontalStepperStep2 = this.horizontalStepperStep2Form();
                this.horizontalStepperStep3 = this.horizontalStepperStep3Form();
            });
    }

    horizontalStepperStep1Form() {
        return this.formBuilder.group({
            id: [this.employee.id || ''],
            firstName: [this.employee.firstName || '', Validators.required],
            middleName: [this.employee.middleName || ''],
            lastName : [this.employee.lastName || '', Validators.required],
            address: [this.employee.address || '', Validators.required],
            city: [this.employee.city || '', Validators.required],
            state : [this.employee.state || '', Validators.required],
            postalCode: [this.employee.postalCode || '', [Validators.required, Validators.maxLength(6)]],
            emailId: [this.employee.emailId || '', [Validators.email]],
            phoneNumber: [this.employee.phoneNumber || '', [Validators.required, Validators.maxLength(10)]],
            gender: [this.employee.gender || '', Validators.required],
            dob: [this.employee.dob || '', Validators.required],
            bloodGroup: [this.employee.bloodGroup || ''],
            maritalStatus: [this.employee.maritalStatus || '', Validators.required]
        });
    }

    horizontalStepperStep2Form() {
        return this.formBuilder.group({
            qualification: [this.employee.qualification || '', Validators.required],
            occupation: [this.employee.occupation || '', Validators.required],
            dateOfJoining: [this.employee.dateOfJoining || '', Validators.required],
            jobType: [this.employee.jobType || '', Validators.required]
        });
    }

    horizontalStepperStep3Form() {
        return this.formBuilder.group({
            panCardNumber: [this.employee.panCardNumber || '', Validators.required],
            aadharCardNumber: [this.employee.aadharCardNumber || ''],
            bankName: [this.employee.bankName || '', Validators.required],
            bankAccountNumber: [this.employee.bankAccountNumber || '', Validators.required],
            bankIFSCCode: [this.employee.bankIFSCCode || '', Validators.required]
        });
    }

    ngOnDestroy() {
        this.onEmployeeChanged.unsubscribe();
    }

    onFormValuesChanged() { }

    finishHorizontalStepper() {
        //alert('You have finished the horizontal stepper!');
        if (this.pageType === 'edit') {
            this.saveEmployee();
        } else {
            this.addEmployee();
        }
    }

    addEmployee() {
        const step1Data = this.horizontalStepperStep1.getRawValue();
        const step2Data = this.horizontalStepperStep2.getRawValue();
        const step3Data = this.horizontalStepperStep3.getRawValue();
        const data = {...step1Data, ...step2Data, ...step3Data};

        this.employeeAddEditService.addEmployee(data)
        .then(() => {
            // Trigger the subscription with new data
            this.employeeAddEditService.onEmployeeChanged.next(data);
            this.router.navigate(['/apps/employee/list']);
            //Show the success message
            let msg = 'Employee '+data.firstName+' '+data.lastName+' added successfully';
            this.snackBar.open(msg, 'OK', {
                verticalPosition: 'top',
                duration        : 2000
            });
        });
    }

    saveEmployee() {
        const step1Data = this.horizontalStepperStep1.getRawValue();
        const step2Data = this.horizontalStepperStep2.getRawValue();
        const step3Data = this.horizontalStepperStep3.getRawValue();
        const data = {...step1Data, ...step2Data, ...step3Data};

        this.employeeAddEditService.updateEmployee(data)
        .then(() => {
            // Trigger the subscription with new data
            this.employeeAddEditService.onEmployeeChanged.next(data);
            this.router.navigate(['/apps/employee/list']);
            //Show the success message
            let msg = 'Employee '+data.firstName+' '+data.lastName+' updated successfully';
            this.snackBar.open(msg, 'OK', {
                verticalPosition: 'top',
                duration        : 2000
            });
        });
    }
}
