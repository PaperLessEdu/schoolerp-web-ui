import { Component, OnInit, ViewChild } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { MatSnackBar } from '@angular/material';
import { ApiConst } from '../../shared/constants';
import { cloneDeep } from 'lodash';

import { CommunicationHomeService } from './communication-home.service';

@Component({
  selector: 'app-communication-home',
  templateUrl: './communication-home.component.html',
  styleUrls: ['./communication-home.component.scss'],
  animations : fuseAnimations
})
export class CommunicationHomeComponent implements OnInit {
  list: any[];
  originalList: any[];
  temp: any[];
  loadingIndicator = true;
  reorderable = true;
  selectedEmpl: any[] = [];

  @ViewChild(DatatableComponent) table: DatatableComponent;

  standards: any[] = [];
  divisions: any[] = [];
  selectedRecipient = '';
  selectedStd = '0';
  selectedDiv = '0';
  selectedType = 'byTextMessage';
  selectedStdRecipient: any[] = [];

  composeEmailForm: FormGroup;
  composeTextMsgForm: FormGroup;
  selected = [];

  mailSubject = '';
  mailBody = '';
  msgBody = '';

  stundentsAPI = ApiConst.BASE_URL + 'students';
  showDivs = false;
  disabledSendAct = false;
  showLoadingMsg = false;
  loadingMsg = '';
  selectedEmplType = 'all';

  constructor(private communicationHomeService: CommunicationHomeService,
              public snackBar: MatSnackBar,
              private formBuilder: FormBuilder) {
    this.composeEmailForm = this.createComposeEmailForm();
    this.composeTextMsgForm = this.createComposeMessageForm();
  }

  ngOnInit() {
    this.getStandards();
    this.getDivisions();
  }

  fetchEmployeesDetails(): void {
    this.communicationHomeService.getEmployees().subscribe((empls: any) => {
        this.selected = [...empls];
        this.temp = [...empls];
        this.list = empls;
        this.originalList = cloneDeep(this.list);
        this.loadingIndicator = false;
    });
  }

  fetchStudentDetails(url): void {
    this.communicationHomeService.getStudents(url).subscribe((students: any) => {
        this.selected = [...students];
        this.temp = [...students];
        this.list = students;
        this.loadingIndicator = false;
    });
  }

  getStandards(): void {
    this.communicationHomeService.getStandards().subscribe((stds: any) => {
      this.standards = stds;
    });
  }

  getDivisions(): void {
    this.communicationHomeService.getDivisions().subscribe((divs: any) => {
      this.divisions = divs;
    });
  }

  onChangeRecipients(event): void {
    this.selectedRecipient = event.value;
    if (event.value === 'students') {
      this.fetchStudentDetails(this.stundentsAPI);
    } else {
      this.fetchEmployeesDetails();
    }
  }

  onChange(event): void {
    if (event.checked) {
      this.selectedStdRecipient.push(event.source.value);
    } else {
      const index = this.selectedStdRecipient.indexOf(event.source.value);
      this.selectedStdRecipient.splice(index, 1);
    }
  }

  createComposeEmailForm() {
      return this.formBuilder.group({
          from   : {
              value   : ['team@cloudscripts.com'],
              disabled: [true]
          },
          subject: ['', Validators.required],
          message: ['', Validators.required]
      });
  }

  createComposeMessageForm() {
    return this.formBuilder.group({
        message: ['', Validators.required]
    });
  }

  onSelect({ selected }) {
    this.selected.splice(0, this.selected.length);
    this.selected.push(...selected);
  }

  sendEmail() {
    let toEmailIds = '';
    if (this.selected.length === 0) {
      this.displayToastMsg('Please select at least one recipient.');
      return;
    }
    if (this.selectedRecipient === 'employees') {
      toEmailIds = this.getEmployeeEmailIds();
    } else {
      toEmailIds = this.getParentsEmailIds();
    }
    const emailObj = {
      toEmailId: toEmailIds,
      subject: this.mailSubject,
      body: this.mailBody
    };

    this.disabledSendAct = true;
    this.showLoadingMsg = true;
    this.loadingMsg = 'Please wait, we are sending your email. It will take sometime.';

    this.communicationHomeService.sendEmail(emailObj)
      .then((res) => {
        // reset subject and body
        this.mailSubject = '';
        this.mailBody = '';
        this.disabledSendAct = false;
        this.showLoadingMsg = false;
        this.loadingMsg = '';

        this.displayToastMsg('Your message has been sent.');
      });
  }

  /**
   * This method will return employee email Ids csv of selected employees
   */
  getEmployeeEmailIds() {
    const emailIds = this.selected.map((obj) => obj.emailId);
    return emailIds.join(',');
  }

  /**
   * This method will return student's father, mother, guardian email Ids csv of selected students
   */
  getParentsEmailIds() {
    console.log(this.selectedStdRecipient);
    let emailIds = '';
    for (let i = 0 ; i < this.selectedStdRecipient.length ; i++) {
      const type = this.selectedStdRecipient[i];
      if (type === 'father') {
        const ids = this.selected.map((obj) => obj['father'].emailId);
        emailIds += ids.join(',');
      } else if (type === 'mother') {
        const ids = this.selected.map((obj) => obj['mother'].emailId);
        emailIds += ids.join(',');
      } else {
        const ids = this.selected.map((obj) => obj['guardian'].emailId);
        emailIds += ids.join(',');
      }
    }
    return emailIds;
  }

  sendMessage() {
    if (this.selected.length === 0) {
      this.displayToastMsg('Please select at least one recipient.');
      return;
    }
    // let mobileNos = null;
    const msgObj = { };
    if (this.selectedRecipient === 'employees') {
      msgObj['phonenumber'] = this.getEmployeePhoneNumbers();
    } else {
      // for stundent's parents
      msgObj['phonenumber'] = this.getParentsPhoneNumbers();
    }
    msgObj['body'] = this.msgBody;
    this.disabledSendAct = true;
    this.showLoadingMsg = true;
    this.loadingMsg = 'Please wait, we are sending your message. It will take sometime.';
    this.communicationHomeService.sendSms(msgObj)
      .then((res) => {
        this.disabledSendAct = false;
        this.showLoadingMsg = false;
        this.loadingMsg = '';
        this.msgBody = '';
        this.displayToastMsg('Your message has been sent.');
      });
  }

  /**
   * This method will return employee email Ids csv of selected employees
   */
  getEmployeePhoneNumbers() {
    // const mobileNos = this.selected.map((obj) => obj.phoneNumber);
    const mobileNos = [];
    this.selected.forEach((obj) => {
      if (obj.phoneNumber.length === 10) {
        mobileNos.push(obj.phoneNumber);
      }
    });
    return mobileNos.join(',');
  }

  /**
   * This method will return student's father, mother, guardian email Ids csv of selected students
   */
  getParentsPhoneNumbers() {
    console.log(this.selectedStdRecipient);
    let mobileNos = '';
    for (let i = 0 ; i < this.selectedStdRecipient.length ; i++) {
      const type = this.selectedStdRecipient[i];
      // if (type === 'father') {
      //   const ids = this.selected.map((obj) => obj['father'].phoneNumber);
      //   mobileNos += ids.join(',');
      // } else if (type === 'mother') {
      //   const ids = this.selected.map((obj) => obj['mother'].phoneNumber);
      //   mobileNos += ids.join(',');
      // } else {
      //   const ids = this.selected.map((obj) => obj['guardian'].phoneNumber);
      //   mobileNos += ids.join(',');
      // }

      if (type === 'father') {
        const ids = [];
        this.selected.forEach((obj) => {
          if(obj['father'].phoneNumber.length === 10) {
            ids.push(obj['father'].phoneNumber);
          }
        });
        mobileNos += ids.join(',');
      } else if (type === 'mother') {
        const ids = [];
        this.selected.forEach((obj) => {
          if(obj['mother'].phoneNumber.length === 10) {
            ids.push(obj['mother'].phoneNumber);
          }
        });
        mobileNos += ids.join(',');
      } else {
        const ids = [];
        this.selected.forEach((obj) => {
          if(obj['guardian'].phoneNumber.length === 10) {
            ids.push(obj['guardian'].phoneNumber);
          }
        });
        mobileNos += ids.join(',');
      }
    }
    return mobileNos;
  }

  displayToastMsg(msg) {
    this.snackBar.open(msg, 'OK', {
      verticalPosition: 'top',
      duration: 3000
    });
  }

  onChangeStd(event): void {
    let url = '';
    this.selectedStd = event.value;
    if (event.value === '0') {
      // if user selects All Standards then hide divisions dropdown
      this.showDivs = false;
      url = this.stundentsAPI;
    } else {
      this.showDivs = true;
      url = this.stundentsAPI + '?standardId=' + this.selectedStd;

      if (this.selectedDiv !== '0') {
        url += '&divisionId=' + this.selectedDiv;
      }
    }
    this.fetchStudentDetails(url);
  }

  onChangeDiv(event): void {
    this.selectedDiv = event.value;
    const url = this.stundentsAPI + '?standardId=' + this.selectedStd + '&divisionId=' + this.selectedDiv;
    this.fetchStudentDetails(url);
  }

  onChangeEmplType(event): void {
    this.list = cloneDeep(this.originalList);
    this.selectedEmplType = event.value;

    if (this.selectedEmplType === 'all') {
      this.selected = [...this.list];
      return;
    }
    this.list = this.list.filter((item) => {
      if (this.selectedEmplType === item.employeeType) {
        return item;
      }
    });
    this.selected = [...this.list];
  }
}
