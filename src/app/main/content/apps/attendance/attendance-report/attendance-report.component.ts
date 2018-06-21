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

  getAcademicYear(): void {
    this.attendanceReportService.getAcademicYears().subscribe((years: any) => {
      this.currentAcademicYear = years.find(function( obj ) {
        return obj.current === true;
      });
      this.buildAttenDanceReport();
    });
  }

  buildAttenDanceReport() {
    this.totalDays = this.getTotalDays(this.currentAcademicYear);
  }

  getTotalDays(academicYear) {
    return this.dateUtilService.getTotalSchoolDays(
      academicYear.startDate,
      moment().format('YYYY-MM-DD'),
      academicYear.weekendType);
  }

  onChangeStd(event): void {
    this.selectedStd = event.value;
  }

  onChangeDiv(event): void {
    this.selectedDiv = event.value;
  }

  fetchStudentAttendanceDetails() {
    const obj = { standard_id: this.selectedStd, division_id: this.selectedDiv};
    this.attendanceReportService.getStudentAttendanceDetails(obj).then((attendance: any) => {
      attendance.forEach(element => {
        element['totalDays'] = this.totalDays;
        element['presentDays'] = this.totalDays - element['absentDays'];
      });
      this.attendanceData = attendance;
    });
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
