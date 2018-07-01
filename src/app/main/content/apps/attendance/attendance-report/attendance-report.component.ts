import { Component, OnInit } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import * as moment from 'moment';
import { cloneDeep } from 'lodash';
import { Router } from '@angular/router';

import { ExportAsPdfService } from '../../shared/services/export-as-pdf.service';
import { AttendanceReportService } from './attendance-report.service';
import { FuseWidgetModule } from '@fuse/components/widget/widget.module';
import { ApiConst } from '../../shared/constants';
import { DateUtilService } from '../../shared/services/date-util.service';

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
  selectedMonth = 0;
  allStundets = [];
  currentMonth = 0;

  constructor(private attendanceReportService: AttendanceReportService,
              private exportAsPdfService: ExportAsPdfService,
              private dateUtilService: DateUtilService,
              private router: Router) { }

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

  // getAcademicYear(): void {
  //   this.attendanceReportService.getAcademicYears().subscribe((years: any) => {
  //     this.currentAcademicYear = years.find(function( obj ) {
  //       return obj.current === true;
  //     });
  //     this.buildAttenDanceReport();
  //   });
  // }

  // buildAttenDanceReport() {
  //   this.allMonths = this.getAllMonths(this.currentAcademicYear.startDate);
  //   this.totalDays = this.getTotalDays(this.currentAcademicYear);
  // }

  getAllMonths(academicYearStartDate) {
    return this.dateUtilService.getMonths(academicYearStartDate, moment().format('YYYY-MM-DD'));
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
    // if selectedMonth == 0
    // then startDate = Academic Year's Start Date and endDate = Today's Date
    // this.dateUtilService.getTotalSchoolDays(academicYear.startDate, moment().format('YYYY-MM-DD'), academicYear.weekendType);
    // if selectedMonth != 0
    // then startDate = Month's Start Date and endDate = Month's End Date
    // this.dateUtilService.getTotalSchoolDays(attendance.startdate, attendance.enddate, academicYear.weekendType);
    // if selectedMonth === Today's Month
    // then StartDate = Month's Start Date and endDate = Today's Date
    // this.dateUtilService.getTotalSchoolDays(attendance.startdate, moment().format('YYYY-MM-DD'), academicYear.weekendType);

    // 1. Fetch All stundents by Std and Div Id
    // 2. Fetch Academic Year Details
    // 3. Get current month
    //    If selected month === current month
    //      then StartDate = Month's Start Date and endDate = Today's Date
    //    If selcted month !== current month
    //      then startDate = Month's Start Date and endDate = Month's End Date
    //    If selected month === 0 (All)
    //      then startDate = Academic Year's Start Date and endDate = Today's Date
    //    Calculate total Working days based on above condition
    // 4. Fetch attendance details by std, div and month
    // 5. Generate Attendance Report

    // const query = { division_id: this.selectedMonth, standard_id: this.selectedStd, month: this.selectedMonth};
    // this.fetchStudentAttendanceDetails(query);

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
    debugger;
    this.attendanceReportService.getStudentAttendanceDetails(query).then((attendance: any) => {
      debugger;
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
        } else {
          element['absentDays'] = 0;
          element['presentDays'] = this.totalDays - element['absentDays'];
          element['totalDays'] = this.totalDays;
        }
      });
      this.attendanceData = me.allStundets;
    });
  }

  // fetchStudentAttendanceDetails(students) {
  //   const me = this;
  //   // const obj = {standard_id: this.selectedStd, division_id: this.selectedDiv, month: this.selectedMonth};
  //   const obj = {standard_id: this.selectedStd, division_id: this.selectedDiv};
  //   this.attendanceReportService.getStudentAttendanceDetails(obj).then((attendance: any) => {
  //     let att = null;
  //     me.allStundets.forEach(element => {
  //       att = null;
  //       att = me.getAttendanceDetailsById(attendance, element.student_id);
  //       if (att) {
  //         element['absentDays'] = att['absentDays'];
  //         element['presentDays'] = this.totalDays - element['absentDays'];
  //         element['totalDays'] = this.totalDays;
  //       } else {
  //         element['absentDays'] = 0;
  //         element['presentDays'] = this.totalDays - element['absentDays'];
  //         element['totalDays'] = this.totalDays;
  //       }
  //     });
  //     this.attendanceData = me.allStundets;
  //   });
  // }

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
    this.exportAsPdfService.exportGridData(columns, temp, 'attendance-report');
  }

  // to display selected student information
  showProfile(student_id: number): void {
    this.router.navigate(['/apps/student/profile/' + student_id]);
  }
}
