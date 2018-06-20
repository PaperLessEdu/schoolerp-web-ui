import { Component, OnInit } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { MY_FORMATS } from '../../shared/constants';
import { AttendanceTakerService } from './attendance-taker.service';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { ApiConst } from '../../shared/constants';
import { MatSnackBar } from '@angular/material';
import * as moment from 'moment';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
@Component({
  selector: 'app-attendance-taker',
  templateUrl: './attendance-taker.component.html',
  styleUrls: ['./attendance-taker.component.scss'],
  animations : fuseAnimations,
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
export class AttendanceTakerComponent implements OnInit {
  standards: any[] = [];
  divisions: any[] = [];
  studentList: any[] = [];

  startDate = new Date();
  selectedDate = new Date();
  selectedStd = '0';
  selectedDiv = '0';
  selected = [];
  loadingIndicator = true;
  reorderable = true;

  constructor( public snackBar: MatSnackBar,
               private attendanceTakerService: AttendanceTakerService) { }

  ngOnInit() {
    this.getStandards();
    this.getDivisions();
  }

  getStandards(): void {
    this.attendanceTakerService.getStandards().subscribe((stds: any) => {
      this.standards = stds;
    });
  }

  getDivisions(): void {
    this.attendanceTakerService.getDivisions().subscribe((divs: any) => {
      this.divisions = divs;
    });
  }

  onChangeStd(event): void {
    this.selectedStd = event.value;
  }

  onChangeDiv(event): void {
    this.selectedDiv = event.value;
  }

  // fetchStundets() {
  //   this.selectedDate = moment(this.selectedDate).format('YYYY-MM-DD');
  //   const url = ApiConst.BASE_URL + 'students?standardId=' + this.selectedStd + '&divisionId=' + this.selectedDiv;
  //   this.attendanceTakerService.getStudents(url).subscribe((students: any) => {
  //       this.studentList = [...students];
  //       this.loadingIndicator = false;
  //   });
  // }

  back() {
    this.studentList = [];
  }

  submitAttendance() {
    const absentStudentIds = [];
    this.selected.forEach((student) => {
      absentStudentIds.push(student.student_id);
    });
    const obj = {
      date: moment(this.selectedDate).format('YYYY-MM-DD'),
      is_present: false,
      standard: this.selectedStd,
      division: this.selectedDiv,
      studentIds: absentStudentIds
    };
    this.attendanceTakerService.postAttendance(obj).then((res) => {
      this.studentList = [];
      this.snackBar.open('Attendance updated successfully', 'OK', {
        verticalPosition: 'top',
        duration        : 3000
      });
    });
  }
}
