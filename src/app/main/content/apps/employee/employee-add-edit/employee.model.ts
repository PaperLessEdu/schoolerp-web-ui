import { MatChipInputEvent } from '@angular/material';

export class Employee {

    id: string;
    firstName: string;
    middleName: string;
    lastName: string;
    dob;
    address;
    city;
    state;
    postalCode;
    phoneNumber;
    emailId;
    gender;
    maritalStatus;
    bloodGroup;
    aadharCardNumber;
    panCardNumber;
    qualification;
    occupation;
    jobType;
    employeeType;
    dateOfJoining;
    bankName;
    bankAccountNumber;
    bankIFSCCode;

    constructor(employee?) {
        employee = employee || {};
        this.id = employee.id || '';
        this.firstName = employee.firstName || '';
        this.middleName = employee.middleName || '';
        this.lastName = employee.lastName || '';
        this.dob = employee.dob || '';
        this.address = employee.address || '';
        this.city = employee.city || '';
        this.state = employee.state || '';
        this.postalCode = employee.postalCode || '';
        this.phoneNumber = employee.phoneNumber || '';
        this.emailId = employee.emailId || '';
        this.gender = employee.gender || '';
        this.maritalStatus = employee.maritalStatus || '';
        this.bloodGroup = employee.bloodGroup || '';
        this.aadharCardNumber = employee.aadharCardNumber || '';
        this.panCardNumber = employee.panCardNumber || '';
        this.qualification = employee.qualification || '';
        this.occupation = employee.occupation || '';
        this.jobType = employee.jobType || '';
        this.employeeType = employee.employeeType || '';
        this.dateOfJoining = employee.dateOfJoining || '';
        this.bankName = employee.bankName || '';
        this.bankAccountNumber = employee.bankAccountNumber || '';
        this.bankIFSCCode =  employee.bankIFSCCode || '';
    }
}