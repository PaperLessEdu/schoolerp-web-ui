import { Component, OnInit } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { DatatableComponent } from '@swimlane/ngx-datatable';

import { AttendanceReportService } from './attendance-report.service';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { ApiConst } from '../../shared/constants';
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
  selectedStd = '0';
  selectedDiv = '0';
  loadingIndicator = false;
  reorderable = true;

  constructor(private attendanceReportService: AttendanceReportService) { }

  ngOnInit() {
    this.getStandards();
    this.getDivisions();
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
}
