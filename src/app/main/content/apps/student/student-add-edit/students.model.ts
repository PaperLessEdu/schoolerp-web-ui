import { MatChipInputEvent } from '@angular/material';

export class Student {

    id: string;
    academicYear: string;
    name: string;
    dob: string;
    permanentAddress: string;
    correspondenceAddress: string;
    country: string;
    city: string;
    state: string;
    postalCode: string;
    phoneNumber: string;
    category: string;
    caste: string;
    religion: string;
    emailId: string;
    gender: string;
    bloodGroup: string;
    aadharCardNumber: string;
    birthPlace: string;
    nationality: string;
    previousSchoolName: string;
    standard: string;
    fathersName: string;
    mothersName: string;
    qualification: string;
    occupation: string;

    constructor(student?) {
        student = student || {};
        this.id = student.id || '';
        this.name = student.name || '';
        this.dob = student.dob || '';
        this.permanentAddress = student.address || '';
        this.correspondenceAddress = student.correspondenceAddress || '';
        this.country = student.country || '';
        this.city = student.city || '';
        this.state = student.state || '';
        this.postalCode = student.postalCode || '';
        this.phoneNumber = student.phoneNumber || '';
        this.category = student.category || '';
        this.caste = student.caste || '';
        this.religion = student.religion || '';
        this.emailId = student.emailId || '';
        this.gender = student.gender || '';
        this.bloodGroup = student.bloodGroup || '';
        this.aadharCardNumber = student.aadharCardNumber || '';
        this.birthPlace = student.birthPlace || '';
        this.nationality = student.nationality || '';
        this.previousSchoolName = student.previousSchoolName || '';
        this.standard = student.standard || '';
        this.fathersName = student.fathersName || '';
        this.mothersName = student.mothersName || '';
        this.qualification = student.qualification || '';
        this.occupation = student.occupation || '';
    }
}
