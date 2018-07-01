import { Component, OnInit, ViewEncapsulation, OnDestroy } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { Student } from './students.model';
import { Subscription } from 'rxjs/Subscription';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { StudentAddEditService } from './student-add-edit.service';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import * as moment from 'moment';
import { Constants, MY_FORMATS } from 'app/main/content/apps/shared/constants';

@Component({
  selector: 'app-student-add-edit',
  templateUrl: './student-add-edit.component.html',
  styleUrls: ['./student-add-edit.component.scss'],
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
export class StudentAddEditComponent implements OnInit, OnDestroy {

  student = new Student();
  onStudentChanged: Subscription;
  pageType: string;
  standards;
  divisions;
  academicYears;

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

  // get bloodGroup(): FormControl {
  //   return <FormControl>(this.generalInfo && this.generalInfo.get('bloodGroup'));
  // }

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
    this.fetchStandardList();
    this.fetchDivisionList();
    this.fetchAcademicYearList();
  }

  ngOnDestroy() {
    this.onStudentChanged.unsubscribe();
  }

  private subscribeStudentChangeEvent(): void {
    // Subscribe to update product on changes
    this.onStudentChanged =
      this.studentAddEditService.onStudentChanged
        .subscribe(student => {
          // will change this condition as once we get student if from backend
          if (student && student.id) {
            this.student = new Student(student);
            this.pageType = 'edit';
          } else {
            this.pageType = 'new';
            this.student = new Student();
          }
          this.generalInfo = this.generalInfoForm();
          this.contactInfo = this.contactInfoForm();
          this.parentsInfo = this.parentsInfoForm();

          if (this.pageType === 'new') {
            this.setDefaultValue();
          }

          if (this.pageType === 'edit') {
            this.setDataforEdit(student);
          }
        });
  }

  setDataforEdit(student: any): void {
    this.parentsInfo.patchValue({
      fathersDetails: student.fathersDetails,
      mothersDetails: student.mothersDetails,
      guardianDetails: student.guardianDetails
    });
  }

  setDefaultValue(): void {
    this.generalInfo.patchValue({
      nationality: Constants.DEFAULT_NATIONALITY,
      gender: Constants.DEFAULT_GENDER_SELECTION,
      dob: new FormControl(moment())
    });

    this.contactInfo.patchValue({
      country: Constants.DEFAULT_COUNTRY,
      state: Constants.DEFAULT_STATE
    });
  }

  private generalInfoForm(): FormGroup {
    return this.formBuilder.group({
      academicYear: [this.student.academicYear || ''],
      rollNo: [this.student.rollNo || ''],
      firstName: [this.student.firstName || '', Validators.required],
      middleName: [this.student.middleName || ''],
      lastName: [this.student.lastName || '', Validators.required],
      dob: [this.student.dob || '', Validators.required],
      gender: [this.student.gender || '', Validators.required],
      bloodGroup: [this.student.bloodGroup || ''],
      category: [this.student.category || '', Validators.required],
      caste: [this.student.caste || ''],
      religion: [this.student.religion || ''],
      standard: [this.student.standard || '', Validators.required],
      division: [this.student.division || '', Validators.required],
      nationality: [this.student.nationality || '', Validators.required],
      birthPlace: [this.student.birthPlace || '']
    });
  }

  private contactInfoForm(): FormGroup {
    return this.formBuilder.group({
      permanentAddress: [this.student.permanentAddress || '', Validators.required],
      correspondenceAddress: [this.student.correspondenceAddress || '', Validators.required],
      country: [this.student.country || '', Validators.required],
      state: [this.student.state || '', Validators.required],
      city: [this.student.city || '', Validators.required],
      postalCode: [this.student.postalCode || '', [Validators.required, Validators.maxLength(6)]],
      doctorName: [this.student.doctorName || ''],
      doctorPhoneNo: [this.student.doctorPhoneNo || '']
    });
  }

  private parentsInfoForm(): FormGroup {
    return this.formBuilder.group({
      fathersDetails: this.formBuilder.group({
        name: ['', Validators.required],
        birthdate: [''],
        occupation: [''],
        qualification: [''],
        phoneNumber: ['', Validators.required],
        emailId: [''],
        monthlyIncome: ['']
      }),
      mothersDetails: this.formBuilder.group({
        name: ['', Validators.required],
        birthdate: [''],
        occupation: [''],
        qualification: [''],
        phoneNumber: [''],
        emailId: ['']
      }),
      guardianDetails: this.formBuilder.group({
        name: [''],
        occupation: [''],
        qualification: [''],
        phoneNumber: [''],
        emailId: [''],
        relationship: ['']
      }),
    });
  }

  private fetchStandardList(): void {
    this.studentAddEditService.getStandards().subscribe((standards: any) => {
      this.standards = standards;
    });
  }

  private fetchDivisionList(): void {
    this.studentAddEditService.getDivisions().subscribe((divisions: any) => {
      this.divisions = divisions;
    });
  }

  private fetchAcademicYearList(): void {
    this.studentAddEditService.getAcademicYear().subscribe((academicYears: any) => {
      this.academicYears = academicYears;
    });
  }

  addStudent(): void {
    const generalInfo = this.generalInfo.getRawValue();
    const contactInfo = this.contactInfo.getRawValue();
    const parentsInfo = this.parentsInfo.getRawValue();
    const data = { ...generalInfo, ...contactInfo, ...parentsInfo };

    this.studentAddEditService.addStudent('students', data)
      .then(() => {
        // Trigger the subscription with new data
        this.studentAddEditService.onStudentChanged.next(data);
        this.router.navigate(['/apps/student/list']);
        // Show the success message
        const msg = 'Student ' + data.firstName + ' ' + data.lastName + ' added successfully';
        this.snackBar.open(msg, 'OK', {
          verticalPosition: 'top',
          duration: 3000
        });
      });
  }

  updateStudent(): void {
    const generalInfo = this.generalInfo.getRawValue();
    const contactInfo = this.contactInfo.getRawValue();
    const parentsInfo = this.parentsInfo.getRawValue();
    const data = { ...generalInfo, ...contactInfo, ...parentsInfo };

    data.academicYear = 1;
    data.id = this.student.id;
    this.studentAddEditService.updateStudent('students/' + this.student.id, data)
      .then(() => {
        // Trigger the subscription with new data
        this.studentAddEditService.onStudentChanged.next(data);
        this.router.navigate(['/apps/student/list']);
        // Show the success message
        const msg = 'Student ' + data.firstName + ' ' + data.lastName + ' updated successfully';
        this.snackBar.open(msg, 'OK', {
          verticalPosition: 'top',
          duration: 3000
        });
      });
  }
}
