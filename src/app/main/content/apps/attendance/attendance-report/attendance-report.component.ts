import { Component, OnInit } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import * as moment from 'moment';

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
  loadingIndicator = false;
  reorderable = true;

  constructor(private attendanceReportService: AttendanceReportService,
              private exportAsPdfService: ExportAsPdfService,
              private dateUtilService: DateUtilService ) { }

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
    const totalDays = this.getTotalDays(this.currentAcademicYear);
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
    const url = ApiConst.BASE_URL
                + 'attendance?standardId=' + this.selectedStd
                + '&divisionId=' + this.selectedDiv;

    this.attendanceData = [
      {
        name: 'Yuvraj Gawade',
        totalDays: 60,
        absentDays: 4,
        presentDays: 54
      }
    ];
    // this.attendanceReportService.getStudentAttendanceDetails(url).subscribe((attendance: any) => {

    // });
  }

  exportAsPdf() {
    const columns = [
      {title: 'Name', dataKey: 'name'},
      {title: 'Total Days', dataKey: 'totalDays'},
      {title: 'Absent Days', dataKey: 'absentDays'},
      {title: 'Present Days', dataKey: 'presentDays'}
    ];
    this.exportAsPdfService.exportGridData(columns, this.attendanceData, 'attendance-report');
  }
}
