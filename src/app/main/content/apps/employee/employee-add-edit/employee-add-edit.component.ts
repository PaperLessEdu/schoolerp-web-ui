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
import { Constants, MY_FORMATS } from '../../shared/constants';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import * as moment from 'moment';

@Component({
    selector: 'app-employee-add-edit',
    templateUrl: './employee-add-edit.component.html',
    styleUrls: ['./employee-add-edit.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations,
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
export class EmployeeAddEditComponent implements OnInit, OnDestroy {

    employee = new Employee();
    onEmployeeChanged: Subscription;
    pageType: string;
    roles: any[] = [];

    form: FormGroup;
    formErrors: any;

    // Horizontal Stepper
    horizontalStepperStep1: FormGroup;
    horizontalStepperStep2: FormGroup;
    horizontalStepperStep3: FormGroup;

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

    get dateOfJoining(): FormControl {
        return <FormControl>(this.horizontalStepperStep1 && this.horizontalStepperStep1.get('dateOfJoining'));
    }

    get nationality(): FormControl {
        return <FormControl>(this.horizontalStepperStep1 && this.horizontalStepperStep1.get('nationality'));
    }

    // get roleId(): FormControl {
    //     return <FormControl>(this.horizontalStepperStep1 && this.horizontalStepperStep1.get('roleId'));
    // }

    get aadharCardNumber() { return this.horizontalStepperStep1.get('aadharCardNumber'); }

    get permanentAddress() { return this.horizontalStepperStep2.get('permanentAddress'); }

    get correspondenceAddress() { return this.horizontalStepperStep2.get('correspondenceAddress'); }

    get country() { return this.horizontalStepperStep2.get('country'); }

    get state() { return this.horizontalStepperStep2.get('state'); }

    get city() { return this.horizontalStepperStep2.get('city'); }

    get postalCode() { return this.horizontalStepperStep2.get('postalCode'); }

    get phoneNumber() { return this.horizontalStepperStep2.get('phoneNumber'); }

    get alternatePhoneNumber() { return this.horizontalStepperStep2.get('alternatePhoneNumber'); }

    get emailId() { return this.horizontalStepperStep2.get('emailId'); }

    get qualification() { return this.horizontalStepperStep3.get('qualification'); }

    get occupation() { return this.horizontalStepperStep3.get('occupation'); }

    get jobType() { return this.horizontalStepperStep3.get('jobType'); }

    get employeeType() { return this.horizontalStepperStep3.get('employeeType'); }

    constructor(private formBuilder: FormBuilder,
        private router: Router,
        public snackBar: MatSnackBar,
        private employeeAddEditService: EmployeeAddEditService) {
    }

    ngOnInit() {
        // Subscribe to update employee on changes
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

                    if (this.pageType === 'new') {
                        this.setDefaultValue();
                    }
                    
                    // Country is not coming from backend, Added UI Fix.
                    // Need to fix this in backend. Once country added in backend we will delete this code.
                    this.horizontalStepperStep2.patchValue({
                        country: Constants.DEFAULT_COUNTRY
                    });
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
            maritalStatus: new FormControl(this.employee.maritalStatus), // [this.employee.maritalStatus || '', Validators.required],
            // roleId: [this.employee.roleId || '', Validators.required],
            aadharCardNumber: new FormControl(this.employee.aadharCardNumber || '', [
                Validators.required
            ]),
        });
    }

    horizontalStepperStep2Form() {
        return this.formBuilder.group({
            country: new FormControl(this.employee.country || '', Validators.required),
            state: new FormControl(this.employee.state || '', Validators.required),
            city: new FormControl(this.employee.city || '', Validators.required),
            permanentAddress: new FormControl(this.employee.permanentAddress || '', Validators.required),
            correspondenceAddress: new FormControl(this.employee.correspondenceAddress || '', Validators.required),
            postalCode: new FormControl(this.employee.postalCode || '', [Validators.required]),
            emailId: new FormControl(this.employee.emailId || '', Validators.required),
            phoneNumber: new FormControl(this.employee.phoneNumber || '', Validators.required),
            alternatePhoneNumber: new FormControl(this.employee.alternatePhoneNumber || '', Validators.required)
        });
    }

    horizontalStepperStep3Form() {
        return this.formBuilder.group({
            qualification: new FormControl(this.employee.qualification || '', Validators.required),
            occupation: new FormControl(this.employee.occupation || '', Validators.required),
            jobType: new FormControl(this.employee.jobType || '', Validators.required),
            employeeType: new FormControl(this.employee.employeeType || '', Validators.required)
        });
    }

    setDefaultValue(): void {
        this.horizontalStepperStep1.patchValue({
            nationality: Constants.DEFAULT_NATIONALITY,
            gender: Constants.DEFAULT_GENDER_SELECTION,
            maritalStatus: Constants.DEFAULT_MARITAL_STATUS_SELECTION,
            dateOfJoining: new FormControl(moment()),
            dob: new FormControl(moment())
        });

        this.horizontalStepperStep2.patchValue({
            country: Constants.DEFAULT_COUNTRY,
            state: Constants.DEFAULT_STATE
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
        
        // for 1st release we are giving Admin roles to all the employees
        data.roleId = 1;
        this.employeeAddEditService.addEmployee(data)
            .then(() => {
                // Trigger the subscription with new data
                this.employeeAddEditService.onEmployeeChanged.next(data);
                this.router.navigate(['/apps/employee/list']);
                // Show the success message
                const msg = 'Employee ' + data.firstName + ' ' + data.lastName + ' added successfully';
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
        // for 1st release we are giving Admin roles to all the employees
        data.roleId = 1;
        
        this.employeeAddEditService.updateEmployee(data)
            .then(() => {
                // Trigger the subscription with new data
                this.employeeAddEditService.onEmployeeChanged.next(data);
                this.router.navigate(['/apps/employee/list']);
                // Show the success message
                const msg = 'Employee ' + data.firstName + ' ' + data.lastName + ' updated successfully';
                this.snackBar.open(msg, 'OK', {
                    verticalPosition: 'top',
                    duration: 3000
                });
            });
    }
}
