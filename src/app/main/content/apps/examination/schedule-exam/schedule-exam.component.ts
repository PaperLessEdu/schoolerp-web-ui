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
            subjectId: null,
            date: null,
            startTime: null,
            endTime: null,
            marksOutOf: null,
            scoreType: null,
            passingMarks: null
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

    getSubjectName(subjectId: number): void {
        const subjectObj = this.subjectList.find(function (obj) { return obj.id === subjectId; });
        return subjectObj.name;
    }

    tConvert (time): string {
        // Check correct time format and split into components
        time = time.toString ().match (/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];
     
         if (time.length > 1) { // If time format correct
           time = time.slice (1);  // Remove full string match value
           time[5] = +time[0] < 12 ? ' AM' : ' PM'; // Set AM/PM
           time[0] = +time[0] % 12 || 12; // Adjust hours
         }
         return time.join (''); // return adjusted time or original string
    }
}
