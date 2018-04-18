import { MatChipInputEvent } from '@angular/material';

export class Employee {

    id: string;
    firstName: string;
    middleName: string;
    lastName: string;
    dob;
    permanentAddress;
    correspondenceAddress;
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
    alternatePhoneNumber;
    nationality;
    country;

    constructor(employee?) {
        employee = employee || {};

        // General Information
        this.id = employee.id || '';
        this.firstName = employee.firstName || '';
        this.middleName = employee.middleName || '';
        this.lastName = employee.lastName || '';
        this.dateOfJoining = employee.dateOfJoining || '';
        this.nationality = employee.nationality || '';
        this.dob = employee.dob || '';
        this.gender = employee.gender || '';
        this.maritalStatus = employee.maritalStatus || '';
        this.bloodGroup = employee.bloodGroup || '';
        this.aadharCardNumber = employee.aadharCardNumber || '';

        // Contact Details
        this.country = employee.country || '';
        this.state = employee.state || '';
        this.city = employee.city || '';
        this.permanentAddress = employee.permanentAddress || '';
        this.correspondenceAddress = employee.correspondenceAddress || '';
        this.postalCode = employee.postalCode || '';
        this.emailId = employee.emailId || '';
        this.phoneNumber = employee.phoneNumber || '';
        this.alternatePhoneNumber = employee.alternatePhoneNumber || '';

        // Occupation Details
        this.qualification = employee.qualification || '';
        this.occupation = employee.occupation || '';
        this.jobType = employee.jobType || '';
        this.employeeType = employee.employeeType || '';
    }
}
