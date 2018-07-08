import { Component, OnInit } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DateAdapter, MAT_DATE_LOCALE, MAT_DATE_FORMATS } from '@angular/material';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { MY_FORMATS } from 'app/main/content/apps/shared/constants';
import { FeeStructureAddEditService } from './fee-structure-add-edit.service';

@Component({
    selector: 'app-fee-structure-add-edit',
    templateUrl: './fee-structure-add-edit.component.html',
    styleUrls: ['./fee-structure-add-edit.component.scss'],
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
export class FeeStructureAddEditComponent implements OnInit {

    standardList = [];
    selectedStd = [];
    academicYears = [];
    feeStructureObj: any;

    constructor(private feeStructureAddEditService: FeeStructureAddEditService) {
        this.init();
    }

    ngOnInit() {
        this.getStandards();
        this.getAcademicYears();
    }

    init(): void {
        this.feeStructureObj = {
            academicYearId: null
        };
    }

    getStandards(): void {
        this.feeStructureAddEditService.getStandards().subscribe((standards: any) => {
            this.standardList = standards;
        });
    }

    getAcademicYears(): void {
        this.feeStructureAddEditService.getAcademicYear().subscribe((academicYears: any) => {
            this.academicYears = academicYears;
        });
    }

    toggleStd(std: string): void {
        const index = this.selectedStd.indexOf(std);
        if (index === -1) {
            this.selectedStd.push(std);
        } else {
            this.selectedStd.splice(index, 1);
        }
    }
}
