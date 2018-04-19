import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
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
    animations: fuseAnimations
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

    // getters for form control
    get firstName(): FormControl {
        return <FormControl>(this.horizontalStepperStep1 && this.horizontalStepperStep1.get('firstName'));
    }

    get lastName(): FormControl {
        return <FormControl>(this.horizontalStepperStep1 && this.horizontalStepperStep1.get('lastName'));
    }

    get dob(): FormControl {
        return <FormControl>(this.horizontalStepperStep1 && this.horizontalStepperStep1.get('dob'));
    }

    get bloodGroup(): FormControl {
        return <FormControl>(this.horizontalStepperStep1 && this.horizontalStepperStep1.get('bloodGroup'));
    }
    
    constructor(private formBuilder: FormBuilder,
        private router: Router,
        public snackBar: MatSnackBar,
        private employeeAddEditService: EmployeeAddEditService) {
        // Reactive form errors  
        // Horizontal Stepper form error
        this.horizontalStepperStep1Errors = {
            middleName: {},
            lastName: {},
            dob: {},
            gender: {},
            maritalStatus: {},
            nationality: {},
            bloodGroup: {},
            aadharCardNumber: {},
            dateOfJoining: {}
        };

        this.horizontalStepperStep2Errors = {
            country: {},
            state: {},
            city: {},
            permanentAddress: {},
            correspondenceAddress: {},
            postalCode: {},
            emailId: {},
            phoneNumber: {},
            alternatePhoneNumber: {}
        };

        this.horizontalStepperStep3Errors = {
            qualification: {},
            occupation: {},
            jobType: {},
            employeeType: {}
        };
    }

    ngOnInit() {
        // Subscribe to update product on changes
        this.onEmployeeChanged =
            this.employeeAddEditService.onEmployeeChanged
                .subscribe(employee => {
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
                    this.setDefaultValue();
                });
    }

    horizontalStepperStep1Form() {
        return this.formBuilder.group({
            id: [this.employee.id || ''],
            firstName: [this.employee.firstName || '', Validators.required],
            middleName: [this.employee.middleName || ''],
            lastName: [this.employee.lastName || '', Validators.required],
            nationality: [this.employee.nationality || '', Validators.required],
            dateOfJoining: [this.employee.dateOfJoining || '', Validators.required],
            gender: [this.employee.gender || '', Validators.required],
            dob: [this.employee.dob || '', Validators.required],
            bloodGroup: [this.employee.bloodGroup || ''],
            maritalStatus: [this.employee.maritalStatus || '', Validators.required],
            aadharCardNumber: [this.employee.aadharCardNumber || '', Validators.required]
        });
    }

    horizontalStepperStep2Form() {
        return this.formBuilder.group({
            country: [this.employee.country || '', Validators.required],
            state: [this.employee.state || '', Validators.required],
            city: [this.employee.city || '', Validators.required],
            permanentAddress: [this.employee.permanentAddress || '', Validators.required],
            correspondenceAddress: [this.employee.correspondenceAddress || '', Validators.required],
            postalCode: [this.employee.postalCode || '', [Validators.required, Validators.maxLength(6)]],
            emailId: [this.employee.emailId || '', Validators.required],
            phoneNumber: [this.employee.phoneNumber || '', Validators.required],
            alternatePhoneNumber: [this.employee.alternatePhoneNumber || '', Validators.required]
        });
    }

    horizontalStepperStep3Form() {
        return this.formBuilder.group({
            qualification: [this.employee.qualification || '', Validators.required],
            occupation: [this.employee.occupation || '', Validators.required],
            jobType: [this.employee.jobType || '', Validators.required],
            employeeType: [this.employee.employeeType || '', Validators.required]
        });
    }

    setDefaultValue(): void {
        this.horizontalStepperStep1.patchValue({
            nationality: 'Indian',
            gender: 'Male',
            maritalStatus: 'Unmarried'
        });

        this.horizontalStepperStep2.patchValue({
            country: 'India',
            state: 'Maharashtra'
        });
    }

    ngOnDestroy() {
        this.onEmployeeChanged.unsubscribe();
    }

    finishHorizontalStepper() {
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
        const data = { ...step1Data, ...step2Data, ...step3Data };

        this.employeeAddEditService.addEmployee(data)
            .then(() => {
                // Trigger the subscription with new data
                this.employeeAddEditService.onEmployeeChanged.next(data);
                this.router.navigate(['/apps/employee/list']);
                // Show the success message
                let msg = 'Employee ' + data.firstName + ' ' + data.lastName + ' added successfully';
                this.snackBar.open(msg, 'OK', {
                    verticalPosition: 'top',
                    duration: 3000
                });
            });
    }

    saveEmployee() {
        const step1Data = this.horizontalStepperStep1.getRawValue();
        const step2Data = this.horizontalStepperStep2.getRawValue();
        const step3Data = this.horizontalStepperStep3.getRawValue();
        const data = { ...step1Data, ...step2Data, ...step3Data };

        this.employeeAddEditService.updateEmployee(data)
            .then(() => {
                // Trigger the subscription with new data
                this.employeeAddEditService.onEmployeeChanged.next(data);
                this.router.navigate(['/apps/employee/list']);
                // Show the success message
                let msg = 'Employee ' + data.firstName + ' ' + data.lastName + ' updated successfully';
                this.snackBar.open(msg, 'OK', {
                    verticalPosition: 'top',
                    duration: 3000
                });
            });
    }
}
