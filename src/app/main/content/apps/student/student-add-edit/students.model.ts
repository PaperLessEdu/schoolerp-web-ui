import { MatChipInputEvent } from '@angular/material';

export class Student {

    id: string;
    academicYear: string;
    rollNo: number;
    firstName: string;
    middleName: string;
    lastName: string;
    dob: string;
    gender: string;
    bloodGroup: string;
    category: string;
    caste: string;
    religion: string;
    standard: string;
    division: string;
    nationality: string;

    permanentAddress: string;
    correspondenceAddress: string;
    country: string;
    city: string;
    state: string;
    postalCode: string;
    phoneNumber: string;
    doctorName: string;
    doctorPhoneNo: string;
    
    emailId: string;
    
    aadharCardNumber: string;
    birthPlace: string;
    
    previousSchoolName: string;
    fathersName: string;
    mothersName: string;
    qualification: string;
    occupation: string;

    fathersDetails: any = {};
    mothersDetails: any = {};
    guardianDetails: any = {};

    constructor(student?) {
        student = student || {};

        // General Information
        this.id = student.id || '';
        this.academicYear = student.academicYear || '';
        this.rollNo = student.rollNo || '';
        this.firstName = student.firstName || '';
        this.middleName = student.middleName || '';
        this.lastName = student.lastName || '';
        this.dob = student.dob || '';
        this.gender = student.gender || '';
        this.bloodGroup = student.bloodGroup || '';
        this.category = student.category || '';
        this.caste = student.caste || '';
        this.religion = student.religion || '';
        this.standard = student.standard || '';
        this.division = student.division || '';
        this.nationality = student.nationality || '';

        this.permanentAddress = student.permanentAddress || '';
        this.correspondenceAddress = student.correspondenceAddress || '';
        this.country = student.country || '';
        this.city = student.city || '';
        this.state = student.state || '';
        this.postalCode = student.postalCode || '';
        this.phoneNumber = student.phoneNumber || '';
        this.doctorName = student.doctorName || '';
        this.doctorPhoneNo = student.doctorPhoneNo || '';
        
        this.emailId = student.emailId || '';
        
        
        this.aadharCardNumber = student.aadharCardNumber || '';
        this.birthPlace = student.birthPlace || '';
        
        this.previousSchoolName = student.previousSchoolName || '';

        this.fathersName = student.fathersName || '';
        this.mothersName = student.mothersName || '';
        this.qualification = student.qualification || '';
        this.occupation = student.occupation || '';
        this.fathersDetails = student.fathersDetails || {};
        this.mothersDetails = student.mothersDetails || {};
        this.guardianDetails = student.guardianDetails || {};
    }
}
