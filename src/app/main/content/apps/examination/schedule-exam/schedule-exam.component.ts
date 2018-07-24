import { Component, OnInit } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ScheduleExamService } from './schedule-exam.service';
import { DateAdapter, MAT_DATE_LOCALE, MAT_DATE_FORMATS } from '@angular/material';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { MY_FORMATS } from 'app/main/content/apps/shared/constants';

@Component({
    selector: 'app-schedule-exam',
    templateUrl: './schedule-exam.component.html',
    styleUrls: ['./schedule-exam.component.scss'],
    animations: fuseAnimations,
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
export class ScheduleExamComponent implements OnInit {

    distribution = [];
    examSchedule = [];
    examObj: any;
    standardList: any;
    subjectList: any;
    examName;
    selectedStd = [];
    academicYears; // academic year list fetched from backend
    academicYearId = null; // ngModel value
    standardId; // Selected standardId

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
            examType: null,
            scoreType: null,
            marksOutOf: null,
            passingMarks: null
        };
    }

    ngOnInit() {
        this.getStandards();
        this.getSubjects();
        this.fetchAcademicYearList();
    }

    private getStandards(): void {
        this.scheduleExamService.getStandards().subscribe((standards: any) => {
            this.standardList = standards;
        });
    }

    private getSubjects(): void {
        this.scheduleExamService.getSubjects().subscribe((subjects: any) => {
            this.subjectList = subjects;
        });
    }

    private fetchAcademicYearList(): void {
        this.scheduleExamService.getAcademicYear().subscribe((academicYears: any) => {
            this.academicYears = academicYears;
        });
    }

    insertRowInTemplate(): void {
        const examScheduleObj = {
            subjectId: null,
            distribution: [
                {
                    date: null,
                    startTime: null,
                    endTime: null,
                    examType: null,
                    scoreType: null,
                    marksOutOf: null,
                    passingMarks: null
                }
            ]
        };

        this.examSchedule.push(examScheduleObj);
    }

    addSubjectDistribution(index: number): void {
        this.examSchedule[index].distribution.push({
            date: null,
            startTime: null,
            endTime: null,
            examType: null,
            scoreType: null,
            marksOutOf: null,
            passingMarks: null
        });
    }

    removeSubjectDistribution(examIndex: number, distIndex: number): void {
        this.examSchedule[examIndex].distribution.splice(distIndex, 1);
    }

    deleteRowInTemplate(index: number): void {
        // this.scheduleExamTemplate.splice(index, 1);
    }

    getStandardName(standardId: number): void {
        const standardObj = this.standardList.find(function (obj) { return obj.standard_id === standardId; });
        return standardObj.name;
    }

    getAcademicYear(academicYearId: number): void {
        const academicYearObj = this.academicYears.find(function (obj) { return obj.academicYearId === academicYearId; });
        return academicYearObj.name;
    }

    tConvert(time): string {
        // Check correct time format and split into components
        time = time.toString().match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];

        if (time.length > 1) { // If time format correct
            time = time.slice(1);  // Remove full string match value
            time[5] = +time[0] < 12 ? ' AM' : ' PM'; // Set AM/PM
            time[0] = +time[0] % 12 || 12; // Adjust hours
        }
        return time.join(''); // return adjusted time or original string
    }

    toggleStd(std: string): void {
        const index = this.selectedStd.indexOf(std);
        if (index === -1) {
            this.selectedStd.push(std);
        }
        else {
            this.selectedStd.splice(index, 1);
        }
    }
}
