import { Component, OnInit } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import * as moment from 'moment';
import { cloneDeep } from 'lodash';
import { Router } from '@angular/router';
import { MatDialog, MatSnackBar } from '@angular/material';

import { ExportAsPdfService } from '../../shared/services/export-as-pdf.service';
import { AttendanceReportService } from './attendance-report.service';
import { FuseWidgetModule } from '@fuse/components/widget/widget.module';
import { ApiConst } from '../../shared/constants';
import { DateUtilService } from '../../shared/services/date-util.service';
import { AttendanceDetailsComponent } from '../attendance-details/attendance-details.component';

@Component({
  selector: 'app-attendance-report',
  templateUrl: './attendance-report.component.html',
  styleUrls: ['./attendance-report.component.scss'],
  animations : fuseAnimations
})
export class AttendanceReportComponent implements OnInit {
  attendanceData: any[] = [];
  standards: any[] = [];
  divisions: any[] = [];
  currentAcademicYear = null;
  selectedStd = '0';
  selectedDiv = '0';
  totalDays = 0;
  loadingIndicator = false;
  reorderable = true;
  allMonths = [];
  selectedMonth = -1;
  allStundets = [];
  currentMonth = 0;

  constructor(private attendanceReportService: AttendanceReportService,
              private exportAsPdfService: ExportAsPdfService,
              private dateUtilService: DateUtilService,
              private router: Router,
              public dialog: MatDialog) { }

  ngOnInit() {
    this.getStandards();
    this.getDivisions();
    this.getAcademicYear();
  }

  getStandards(): void {
    this.attendanceReportService.getStandards().subscribe((stds: any) => {
      this.standards = stds;
    });
  }

  getDivisions(): void {
    this.attendanceReportService.getDivisions().subscribe((divs: any) => {
      this.divisions = divs;
    });
  }

  getAllMonths(academicYearStartDate) {
    return this.dateUtilService.getMonths(moment(academicYearStartDate).format('YYYY-MM-DD'), moment().format('YYYY-MM-DD'));
  }

  getTotalDays(startDate, endDate, weekendType) {
    return this.dateUtilService.getTotalSchoolDays(
      startDate,
      endDate,
      weekendType);
  }

  onChangeStd(event): void {
    this.selectedStd = event.value;
  }

  onChangeDiv(event): void {
    this.selectedDiv = event.value;
  }

  onChangeMonth(event): void {
    this.selectedMonth = parseInt(event.value);
    // this.fetchStudents();
  }

  go() {
    this.fetchStudents();
  }

  fetchStudents(): void {
    // fetch students by selected std and div
    this.attendanceReportService.getStudentList(this.selectedStd, this.selectedDiv).subscribe((students: any) => {
      this.allStundets = students;
      // fetch attendance details by selected std, div and month
      this.fetchStudentAttendanceDetails(students);
    });
  }

  getAcademicYear(): void {
    this.attendanceReportService.getAcademicYears().subscribe((years: any) => {
      this.currentAcademicYear = years.find(function( obj ) {
        return obj.current === true;
      });
      this.allMonths = this.getAllMonths(this.currentAcademicYear.startDate);
      this.currentMonth = this.dateUtilService.getCurrentMonth();
    });
  }

  fetchStudentAttendanceDetails(students): void {
    const me = this;
    let startDate = null, endDate = null;
    const query = {division_id: this.selectedDiv, standard_id: this.selectedStd, month: this.selectedMonth};
    this.attendanceReportService.getStudentAttendanceDetails(query).then((attendance: any) => {
      // depending on the selection of month get starDate and endDate
      if (this.selectedMonth === this.currentMonth) {
        startDate = this.dateUtilService.getMonthDateRange(moment().format('YYYY'), this.selectedMonth).startDate;
        endDate = moment().format('YYYY-MM-DD'); // today's date
      } else if (this.selectedMonth !== this.currentMonth && this.selectedMonth !== 0) {
        startDate = this.dateUtilService.getMonthDateRange(moment().format('YYYY'), this.selectedMonth).startDate;
        endDate = this.dateUtilService.getMonthDateRange(moment().format('YYYY'), this.selectedMonth).endDate;
      } else {
        startDate = this.currentAcademicYear.startDate;
        endDate = moment().format('YYYY-MM-DD');
      }
      // get Total working days from startDate, endDate and weekendType
      this.totalDays = this.getTotalDays(startDate, endDate, this.currentAcademicYear.weekendType);
      let att = null;
      me.allStundets.forEach(element => {
        att = null;
        att = me.getAttendanceDetailsById(attendance, element.student_id);
        if (att) {
          element['absentDays'] = att['absentDays'];
          element['presentDays'] = this.totalDays - element['absentDays'];
          element['totalDays'] = this.totalDays;
          element['absentDaysDetails'] = att['date'];
          element['percentage'] = 100 - (att['absentDays'] * 100 / element['totalDays']);
        } else {
          element['absentDays'] = 0;
          element['presentDays'] = this.totalDays - element['absentDays'];
          element['totalDays'] = this.totalDays;
          element['absentDaysDetails'] = null;
          element['percentage'] = 100;
        }
      });
      this.attendanceData = me.allStundets;
    });
  }

  getAttendanceDetailsById(attendance, stundetId) {
    return attendance.find( x => x.student_id === stundetId );
  }

  exportAsPdf() {
    const columns = [
      {title: 'Name', dataKey: 'name'},
      {title: 'Total Days', dataKey: 'totalDays'},
      {title: 'Absent Days', dataKey: 'absentDays'},
      {title: 'Present Days', dataKey: 'presentDays'}
    ];
    const temp = cloneDeep(this.attendanceData);
    temp.map( obj => obj['name'] = obj.firstName + ' ' + obj.lastName );
    this.exportAsPdfService.exportGridData(columns, temp, 'attendance-report', 'Attendance Report');
  }

  // to display selected student information
  showProfile(student_id: number): void {
    this.router.navigate(['/apps/student/profile/' + student_id]);
  }

  showAttendanceDetails(attendanceDetails) {
    this.openDialog(attendanceDetails);
  }

  openDialog(attendanceDetails): void {
    const dialogRef = this.dialog.open(AttendanceDetailsComponent, {
      width: '350px',
      data: {
        attendanceDetails: attendanceDetails
      }
    });

    dialogRef.afterClosed().subscribe(response => {
      if (!response) {
          return;
      }
      const actionType: string = response[0];
      switch ( actionType ) {
        case 'close': break;
      }
    });
  }
}
