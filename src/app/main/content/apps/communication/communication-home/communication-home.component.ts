import { Component, OnInit, ViewChild } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DatatableComponent } from '@swimlane/ngx-datatable';

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
  selectedRecipient: string = '';
  selectedStd: string = '0';
  selectedDiv: string = '0';
  selectedType: string = 'byEmail';
  selectedStdRecipient: any[] = [];

  composeForm: FormGroup;
  selected = [];
  
  constructor(private communicationHomeService: CommunicationHomeService,
              private formBuilder: FormBuilder) { 
    this.composeForm = this.createComposeForm();
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
      let index = this.selectedStdRecipient.indexOf(event.source.value);
      this.selectedStdRecipient.splice(index, 1);
    }
  }

  createComposeForm() {
      return this.formBuilder.group({
          from   : {
              value   : ['team@cloudscripts.com'],
              disabled: [true]
          },
          subject: [''],
          message: ['']
      });
  }

  onSelect({ selected }) {
    this.selected.splice(0, this.selected.length);
    this.selected.push(...selected);
  }
}
