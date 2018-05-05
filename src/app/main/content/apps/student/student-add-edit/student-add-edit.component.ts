import { Component, OnInit, ViewEncapsulation, OnDestroy } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { Student } from './students.model';
import { Subscription } from 'rxjs/Subscription';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
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

  // getters for form control
  get academicYear(): FormControl {
    return <FormControl>(this.generalInfo && this.generalInfo.get('academicYear'));
  }

  get firstName(): FormControl {
    return <FormControl>(this.generalInfo && this.generalInfo.get('firstName'));
  }

  get lastName(): FormControl {
    return <FormControl>(this.generalInfo && this.generalInfo.get('lastName'));
  }

  get dob(): FormControl {
    return <FormControl>(this.generalInfo && this.generalInfo.get('dob'));
  }

  get bloodGroup(): FormControl {
    return <FormControl>(this.generalInfo && this.generalInfo.get('bloodGroup'));
  }

  get category(): FormControl {
    return <FormControl>(this.generalInfo && this.generalInfo.get('category'));
  }

  get caste(): FormControl {
    return <FormControl>(this.generalInfo && this.generalInfo.get('caste'));
  }

  get religion(): FormControl {
    return <FormControl>(this.generalInfo && this.generalInfo.get('religion'));
  }

  get standard(): FormControl {
    return <FormControl>(this.generalInfo && this.generalInfo.get('standard'));
  }

  get division(): FormControl {
    return <FormControl>(this.generalInfo && this.generalInfo.get('division'));
  }

  get nationality(): FormControl {
    return <FormControl>(this.generalInfo && this.generalInfo.get('nationality'));
  }

  get permanentAddress(): FormControl {
    return <FormControl>(this.contactInfo && this.contactInfo.get('permanentAddress'));
  }

  get correspondenceAddress(): FormControl {
    return <FormControl>(this.contactInfo && this.contactInfo.get('correspondenceAddress'));
  }

  get country(): FormControl {
    return <FormControl>(this.contactInfo && this.contactInfo.get('country'));
  }

  get state(): FormControl {
    return <FormControl>(this.contactInfo && this.contactInfo.get('state'));
  }

  get city(): FormControl {
    return <FormControl>(this.contactInfo && this.contactInfo.get('city'));
  }

  get postalCode(): FormControl {
    return <FormControl>(this.contactInfo && this.contactInfo.get('postalCode'));
  }

  get fathersName(): FormControl {
    return <FormControl>(this.parentsInfo && this.parentsInfo.get('fathersName'));
  }

  get mothersName(): FormControl {
    return <FormControl>(this.parentsInfo && this.parentsInfo.get('mothersName'));
  }

  get qualification(): FormControl {
    return <FormControl>(this.parentsInfo && this.parentsInfo.get('qualification'));
  }

  get occupation(): FormControl {
    return <FormControl>(this.parentsInfo && this.parentsInfo.get('occupation'));
  }

  get phoneNumber(): FormControl {
    return <FormControl>(this.parentsInfo && this.parentsInfo.get('phoneNumber'));
  }

  get emailId(): FormControl {
    return <FormControl>(this.parentsInfo && this.parentsInfo.get('emailId'));
  }

  // Horizontal Stepper
  generalInfo: FormGroup;
  contactInfo: FormGroup;
  parentsInfo: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    public snackBar: MatSnackBar,
    private studentAddEditService: StudentAddEditService
  ) {
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
          this.contactInfo = this.contactInfoForm();
          this.parentsInfo = this.parentsInfoForm();
        });
  }

  private generalInfoForm(): FormGroup {
    return this.formBuilder.group({
      academicYear: [this.student.academicYear || '', Validators.required],
      firstName: [this.student.firstName || '', Validators.required],
      middleName: [this.student.middleName || ''],
      lastName: [this.student.lastName || '', Validators.required],
      dob: [this.student.dob || '', Validators.required],
      gender: [this.student.gender || '', Validators.required],
      bloodGroup: [this.student.bloodGroup || '', Validators.required],
      category: [this.student.category || '', Validators.required],
      caste: [this.student.caste || '', Validators.required],
      religion: [this.student.religion || '', Validators.required],
      standard: [this.student.standard || '', Validators.required],
      division: [this.student.division || '', Validators.required],
      nationality: [this.student.nationality || '', Validators.required]
    });
  }

  private contactInfoForm(): FormGroup {
    return this.formBuilder.group({
      permanentAddress: [this.student.permanentAddress || '', Validators.required],
      correspondenceAddress: [this.student.correspondenceAddress || '', Validators.required],
      country: [this.student.country || '', Validators.required],
      state: [this.student.state || '', Validators.required],
      city: [this.student.city || '', Validators.required],
      postalCode: [this.student.postalCode || '', [Validators.required, Validators.maxLength(6)]]
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
