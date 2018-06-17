import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { StudentListService } from 'app/main/content/apps/student/student-list/student-list.service';
import { Observable } from 'rxjs/Observable';
import { DataSource } from '@angular/cdk/collections';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { MatPaginator, MatSort, MatDialog, MatSnackBar } from '@angular/material';
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
import { ConfirmationDialogComponent } from 'app/main/content/apps/shared/confirmation-dialog/confirmation-dialog.component';
import { ExportAsPdfService } from 'app/main/content/apps/shared/services/export-as-pdf.service';

@Component({
    selector: 'app-student-list',
    templateUrl: './student-list.component.html',
    styleUrls: ['./student-list.component.scss'],
    animations: fuseAnimations
})
export class StudentListComponent implements OnInit {
    rows: any[];
    studentList: any[] = [];
    temp: any[];
    loadingIndicator = true;
    reorderable = true;
    selectedStudent: any[] = [];
    standards;
    divisions;
    division;
    std;

    @ViewChild(DatatableComponent) table: DatatableComponent;

    constructor(
        private studentListService: StudentListService,
        private router: Router,
        public dialog: MatDialog,
        public snackBar: MatSnackBar,
        private exportAsPdfService: ExportAsPdfService
    ) { }

    ngOnInit() {
        this.fetchStudentList(null, null);
        this.fetchStandardList();
        this.fetchDivisionList();
    }

    private fetchStandardList(): void {
        this.studentListService.getStandards().subscribe((standards: any) => {
            this.standards = standards;
        });
    }

    private fetchDivisionList(): void {
        this.studentListService.getDivisions().subscribe((divisions: any) => {
            this.divisions = divisions;
        });
    }

    fetchStudentList(stdId: number, divisionId: number): void {
        this.loadingIndicator = true;
        this.studentListService.getStudentList(stdId, divisionId).subscribe((students: any) => {
            this.temp = [...students];
            this.rows = students;
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

    // to display selected student information
    showProfile(student_id: number): void {
        this.router.navigate(['/apps/student/profile/' + student_id]);
    }

    onSelect(obj): void {
        this.selectedStudent = obj.selected;
    }

    onEditAction(): void {
        if (this.selectedStudent && this.selectedStudent.length === 1) {
            this.router.navigate(['/apps/student/list/' + this.selectedStudent[0].student_id]);
        }
    }

    onDeleteAction(): void {
        const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
            width: '350px',
            data: {
                title: 'Confirmation',
                content: 'Are you sure, you want delete this student?'
            }
        });

        dialogRef.afterClosed().subscribe(response => {
            if (!response) {
                return;
            }
            const actionType: string = response[0];
            switch (actionType) {
                case 'yes':
                    this.deleteStudent();
                    break;
                case 'no': break;
            }
        });
    }

    deleteStudent(): void {
        const self = this;
        self.studentListService.deleteStudent(this.selectedStudent[0].student_id).subscribe((res: any) => {
            self.displayNotification('Employee deleted successfully');
            self.fetchStudentList(this.std, this.division);
        });
    }

    displayNotification(msg): void {
        this.snackBar.open(msg, 'OK', {
            verticalPosition: 'top',
            duration: 3000
        });
    }

    applyFilter(): void {
        this.fetchStudentList(this.std, this.division);
    }

    exportAsPdf(): void {
        const columns = [
            {title: 'Name', dataKey: 'name'},
            {title: 'Gender', dataKey: 'gender'},
            {title: 'Blood Group', dataKey: 'bloodGroup'},
            {title: 'Father\'s Phone Number', dataKey: 'father.phoneNumber'},
            {title: 'Father\'s Email Id', dataKey: 'father.emailId'}
        ];
        const temp = cloneDeep(this.rows);
        temp.map( obj => obj['name'] = obj.firstName + ' ' + obj.lastName );
        this.exportAsPdfService.exportGridData(columns, temp, 'student-list');
    }
}
