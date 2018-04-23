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
    scheduleExamTemplate = [
        {
            subject: null,
            date: null,
            time: null,
            marksOutOf: null
        },
        {
            subject: null,
            date: null,
            time: null,
            marksOutOf: null
        }
    ];

    standardList: any;
    subjectList: any;
    standard;
    academicYear = {};

    constructor(
        private formBuilder: FormBuilder,
        private scheduleExamService: ScheduleExamService,
    ) {

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

    insertRowInTemplate(): void {
        this.scheduleExamTemplate.push(
            {
                subject: null,
                date: null,
                time: null,
                marksOutOf: null
            }
        );
    }

    deleteRowInTemplate(index: number): void {
        console.log("$$$$" + index);
        this.scheduleExamTemplate.splice(index, 1);
    }
}
