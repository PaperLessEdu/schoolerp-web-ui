import { Component, OnInit, ViewChild } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { MatSnackBar } from '@angular/material';

import { CommunicationHomeService } from './communication-home.service';

@Component({
  selector: 'app-communication-home',
  templateUrl: './communication-home.component.html',
  styleUrls: ['./communication-home.component.scss'],
  animations : fuseAnimations
})
export class CommunicationHomeComponent implements OnInit {
  rows: any[];
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
  selectedType = 'byEmail';
  selectedStdRecipient: any[] = [];

  composeEmailForm: FormGroup;
  composeTextMsgForm: FormGroup;
  selected = [];

  mailSubject = '';
  mailBody = '';
  msgBody = '';
  
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
        this.rows = empls;
        this.loadingIndicator = false;
    });
  }

  fetchStudentDetails(): void {
    this.communicationHomeService.getStudents().subscribe((students: any) => {
        this.selected = [...students];
        this.temp = [...students];
        this.rows = students;
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
      this.fetchStudentDetails();
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
    if (this.selected.length === 0) {
      this.displayToastMsg('Please select at least one recipient.');
      return;
    }
    if (this.selectedRecipient === 'employees') {
      const toEmailIds = this.getEmployeeEmailIds();
      const emailObj = {
        toEmailId: toEmailIds,
        subject: this.mailSubject,
        body: this.mailBody
      };
      this.communicationHomeService.sendEmail(emailObj)
        .then((res) => {
          // reset subject and body
          this.mailSubject = '';
          this.mailBody = '';

          this.displayToastMsg('Your message has been sent.');
        });
    } else {

    }
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
  getStudentEmailIds() {

  }

  sendMessage() {
    if (this.selected.length === 0) {
      this.displayToastMsg('Please select at least one recipient.');
      return;
    }
    let mobileNos = null;
    const msgObj = { };
    if (this.selectedRecipient === 'employees') { 
      mobileNos = this.getEmployeeMobileNumbers();
      // obj['phonenumber'] = this.getEmployeeMobileNumbers();
      msgObj['phonenumber'] = '7620676545';
    } else {
      // for stundent's parents 
    }
    msgObj['body'] = this.msgBody;
    this.communicationHomeService.sendEmail(msgObj)
      .then((res) => {
        this.msgBody = '';
        this.displayToastMsg('Your message has been sent.');
      });
  }

  /**
   * This method will return employee email Ids csv of selected employees
   */
  getEmployeeMobileNumbers() {
    const mobileNos = this.selected.map((obj) => obj.phoneNumber);
    return mobileNos.join(',');
  }

  displayToastMsg(msg) {
    this.snackBar.open(msg, 'OK', {
      verticalPosition: 'top',
      duration: 3000
    });
  }
}
