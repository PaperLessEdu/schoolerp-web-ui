import { Component, OnInit } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { MY_FORMATS } from '../../shared/constants';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { ApiConst } from '../../shared/constants';
import { MatSnackBar, MatDialog } from '@angular/material';
import * as moment from 'moment';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { ConfirmationDialogComponent } from '../../shared/confirmation-dialog/confirmation-dialog.component';
import { CommunicationService } from '../../shared/services/communication.service';

import { TakerService } from './taker.service';

@Component({
  selector: 'app-dailyreport-taker',
  templateUrl: './taker.component.html',
  styleUrls: ['./taker.component.scss'],
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
export class DailyReportTakerComponent implements OnInit {

  standards: any[] = [];
  divisions: any[] = [];
  subjects: any[] = [];
  studentList: any[] = [];

  startDate = new Date();
  selectedDate = new Date();
  selectedStd = '0';
  selectedDiv = '0';
  selectedChecklist = '0';
  selected = [];
  loadingIndicator = true;
  reorderable = true;
  disableSubmit = false;

  constructor(private takerService: TakerService) {
    this.getStandards();
    this.getDivisions();
    this.getSubjects();
  }

  ngOnInit() {

  }

  getStandards(): void {
    this.takerService.getStandards().subscribe((stds: any) => {
      this.standards = stds;
    });
  }

  getDivisions(): void {
    this.takerService.getDivisions().subscribe((divs: any) => {
      this.divisions = divs;
    });
  }

  getSubjects(): void {
    this.takerService.getSubjects().subscribe((subjects: any) => {
      this.subjects = subjects;
    });
  }

  onChangeStd(event): void {
    this.selectedStd = event.value;
  }

  onChangeDiv(event): void {
    this.selectedDiv = event.value;
  }

  onChangeChecklist(event): void {
    this.selectedChecklist = event.value;
  }

  fetchStundets() {
    const url = ApiConst.BASE_URL + 'students?standardId=' + this.selectedStd + '&divisionId=' + this.selectedDiv;
    this.takerService.getStudents(url).subscribe((students: any) => {
        this.studentList = [...students];
        this.loadingIndicator = false;
    });
  }

  back() {
    this.studentList = [];
  }
}
