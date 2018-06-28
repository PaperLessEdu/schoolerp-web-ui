import { Component, OnInit } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { MY_FORMATS } from '../../shared/constants';
import { AttendanceTakerService } from './attendance-taker.service';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { ApiConst } from '../../shared/constants';
import { MatSnackBar, MatDialog } from '@angular/material';
import * as moment from 'moment';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { ConfirmationDialogComponent } from '../../shared/confirmation-dialog/confirmation-dialog.component';
import { CommunicationService } from '../../shared/services/communication.service';
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

  constructor( private communicationService: CommunicationService,
               public dialog: MatDialog,
               public snackBar: MatSnackBar,
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

  fetchStundets() {
    // this.selectedDate = moment(this.selectedDate).format('YYYY-MM-DD');
    const url = ApiConst.BASE_URL + 'students?standardId=' + this.selectedStd + '&divisionId=' + this.selectedDiv;
    this.attendanceTakerService.getStudents(url).subscribe((students: any) => {
        this.studentList = [...students];
        this.loadingIndicator = false;
    });
  }

  back() {
    this.studentList = [];
  }

  submitAttendance() {
    const absentStudentIds = [];
    const parentsPhNos = [];
    this.selected.forEach((student) => {
      parentsPhNos.push(student.father.phoneNumber);
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
      this.snackBar.open('Attendance updated successfully', 'OK', {
        verticalPosition: 'top',
        duration        : 3000
      });

      this.openSendSMSDialog(parentsPhNos);
    });
  }

  openSendSMSDialog(parentsPhNos): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
        width: '350px',
        data: {
            title: 'Confirmation',
            content: 'You want to send message to the parents of absent stundents?'
        }
    });

    dialogRef.afterClosed().subscribe(response => {
        this.studentList = [];
        if (!response) {
            return;
        }
        const actionType: string = response[0];
        switch ( actionType ) {
            case 'yes': this.sendSms(parentsPhNos.join(','));
              break;
            case 'no': break;
        }
    });
  }

  sendSms(phoneNumbers) {
    console.log(phoneNumbers);
    const msgObj = {
      phonenumber: phoneNumbers,
      body: 'Your child is absent today. Please contact class teacher.'
     };
    this.communicationService.sendSms(msgObj).then((res) => {
      this.snackBar.open('Message send successfully.', 'OK', {
        verticalPosition: 'top',
        duration        : 3000
      });
    });
  }
}
