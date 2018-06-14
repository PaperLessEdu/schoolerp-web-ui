import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { StudentListService } from './student-list.service';
import { Observable } from 'rxjs/Observable';
import { DataSource } from '@angular/cdk/collections';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { MatPaginator, MatSort } from '@angular/material';
import { FuseUtils } from '@fuse/utils';
import { Router } from '@angular/router';
import { cloneDeep } from 'lodash';

import 'rxjs/add/operator/startWith';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/observable/fromEvent';
import { DatatableComponent } from '@swimlane/ngx-datatable';
declare let jsPDF;

@Component({
    selector: 'app-student-list',
    templateUrl: './student-list.component.html',
    styleUrls: ['./student-list.component.scss'],
    animations: fuseAnimations
})
export class StudentListComponent implements OnInit {
    studentList: any[];
    temp: any[];
    loadingIndicator = true;
    reorderable = true;

    @ViewChild(DatatableComponent) table: DatatableComponent;

    constructor(
        private studentListService: StudentListService,
        private router: Router
    ) { }

    ngOnInit() {
        this.fetchStudentList();
    }

    fetchStudentList(): void {
        this.loadingIndicator = true;
        this.studentListService.getStudentList().subscribe((students: any) => {
            this.temp = [...students];
            this.studentList = [...students];
            this.loadingIndicator = false;
        });
    }

    updateFilter(event): void {
        const val = event.target.value.toLowerCase();

        // filter our data
        const temp = this.temp.filter(function (d) {
            return d.firstName.toLowerCase().indexOf(val) !== -1 ||
                d.lastName.toLowerCase().indexOf(val) !== -1 ||
                !val;
        });

        // update the rows
        this.studentList = temp;
        // Whenever the filter changes, always go back to the first page
        this.table.offset = 0;
    }

    showProfile(student_id: number): void {
        this.router.navigate(['/apps/student/profile/' + student_id]);
    }

    buildDocument() {
        const temp = cloneDeep(this.studentList);
        temp.map( obj => obj['name'] = obj.firstName + ' ' + obj.lastName );
        const columns = [
            {title: 'Name', dataKey: 'name'},
            {title: 'Gender', dataKey: 'gender'},
            {title: 'Blood Group', dataKey: 'bloodGroup'}
        ];
        // Only pt supported (not mm or in)
        const doc = new jsPDF('p', 'pt');
        doc.autoTable(columns, temp, {
            // Styling
            theme: 'striped', // 'striped', 'grid' or 'plain'
            styles: {},
            headerStyles: {},
            bodyStyles: {},
            alternateRowStyles: {},
            columnStyles: {},
            // Properties
            startY: false, // false (indicates margin top value) or a number
            margin: 40, // a number, array or object
            pageBreak: 'auto', // 'auto', 'avoid' or 'always'
            tableWidth: 'auto', // 'auto', 'wrap' or a number,
            showHeader: 'everyPage' // 'everyPage', 'firstPage', 'never',
            tableLineColor: 200, // number, array (see color section below)
            tableLineWidth: 0,
            // Hooks
            createdHeaderCell: function (cell, data) {},
            createdCell: function (cell, data) {},
            drawHeaderRow: function (row, data) {},
            drawRow: function (row, data) {},
            drawHeaderCell: function (cell, data) {},
            drawCell: function (cell, data) {},
            addPageContent: function (data) {}
         });
        doc.save('table.pdf');
    }
}
