import { Component, OnInit } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ScheduleExamService } from './schedule-exam.service';

@Component({
    selector: 'app-schedule-exam',
    templateUrl: './schedule-exam.component.html',
    styleUrls: ['./schedule-exam.component.scss'],
    animations: fuseAnimations
})
export class ScheduleExamComponent implements OnInit {

    displayedColumns = ['subject', 'date', 'time', 'marks'];
    scheduleExamTemplate = [];

    examObj: any;

    standardList: any;
    subjectList: any;
    standard;


    constructor(
        private formBuilder: FormBuilder,
        private scheduleExamService: ScheduleExamService,
    ) {
        this.init();
    }

    init(): void {
        this.examObj = {
            subjectName: null,
            date: null,
            time: null,
            marksOutOf: null
        };
    }

    ngOnInit() {
        this.getStandards();
        this.getSubjects();
    }

    getStandards(): void {
        this.scheduleExamService.getStandards().subscribe((standards: any) => {
            this.standardList = standards;
        });
    }

    getSubjects(): void {
        this.scheduleExamService.getSubjects().subscribe((subjects: any) => {
            this.subjectList = subjects;
        });
    }

    insertRowInTemplate(examObj: any): void {
        this.scheduleExamTemplate.push(examObj);
        this.examObj = {
            subjectName: '',
            date: '',
            time: '',
            marksOutOf: ''
        };
    }

    deleteRowInTemplate(index: number): void {
        this.scheduleExamTemplate.splice(index, 1);
    }
}
