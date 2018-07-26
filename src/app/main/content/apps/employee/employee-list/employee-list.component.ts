import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { fuseAnimations } from '@fuse/animations';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { Router } from '@angular/router';
import { MatDialog, MatSnackBar} from '@angular/material';
import { cloneDeep } from 'lodash';

import { EmployeeListService } from './employee-list.service';
import { ChangeRoleComponent } from '../change-role/change-role.component';
import { ChangeStandardSubjectComponent } from '../change-standard-subject/change-standard-subject.component';
import { ConfirmationDialogComponent } from '../../shared/confirmation-dialog/confirmation-dialog.component';
import { ExportAsPdfService } from '../../shared/services/export-as-pdf.service';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss'],
  animations : fuseAnimations
})

export class EmployeeListComponent implements OnInit {
    rows: any[] = [];
    temp: any[];
    loadingIndicator = false;
    reorderable = true;
    selectedEmpl: any[] = [];

    @ViewChild(DatatableComponent) table: DatatableComponent;

    constructor(private emplService: EmployeeListService,
                private router: Router,
                public dialog: MatDialog,
                public snackBar: MatSnackBar,
                private exportAsPdfService: ExportAsPdfService) { }

    ngOnInit() {
        this.doRefresh();
    }

    doRefresh(): void {
        this.loadingIndicator = true;
        this.emplService.getEmployees().subscribe((empls: any) => {
            this.temp = [...empls];
            this.rows = empls;
            this.loadingIndicator = false;
        }, err => {
            this.rows = [];
            alert("Error in fetching employee list. Please contact system Admin.");
        });
    }

    updateFilter(event): void {
        const val = event.target.value.toLowerCase();

        // filter our data
        const temp = this.temp.filter(function(d) {
            return d.firstName.toLowerCase().indexOf(val) !== -1 ||
                    d.lastName.toLowerCase().indexOf(val) !== -1 ||
                    !val;
        });

        // update the rows
        this.rows = temp;
        // Whenever the filter changes, always go back to the first page
        this.table.offset = 0;
    }

    onSelect(obj): void {
        this.selectedEmpl = obj.selected;
    }

    onEditAction(): void {
        if (this.selectedEmpl && this.selectedEmpl.length === 1) {
            this.router.navigate(['/apps/employee/list/' + this.selectedEmpl[0].id]);
        }
    }

    changeRole(): void {
        const dialogRef = this.dialog.open(ChangeRoleComponent, {
            width: '350px',
            data: {
                selectedEmpl: this.selectedEmpl[0]
            }
        });

        dialogRef.afterClosed().subscribe(response => {
            if (!response) {
                return;
            }
            const actionType: string = response[0];
            switch ( actionType ) {
                case 'save': this.doRefresh(); break;
                case 'close': break;
            }
        });
    }

    showProfile(emplId): void {
        this.router.navigate(['/apps/employee/profile/' + emplId]);
    }

    changeStdSub(): void {
        const dialogRef = this.dialog.open(ChangeStandardSubjectComponent, {
            width: '550px',
            data: {
                selectedEmpl: this.selectedEmpl[0]
            }
        });
    }

    onDeleteAction(): void {
        const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
            width: '350px',
            data: {
                title: 'Confirmation',
                content: 'Are you sure, you want delete this employee?'
            }
        });

        dialogRef.afterClosed().subscribe(response => {
            if (!response) {
                return;
            }
            const actionType: string = response[0];
            switch ( actionType ) {
                case 'yes':
                this.deleteEmployee();
                break;
                case 'no': break;
            }
        });
    }

    deleteEmployee(): void {
        const me = this;
        me.emplService.deleteEmployee(this.selectedEmpl[0]).subscribe((res: any) => {
            me.sendDeleteNotification();
            me.displayNotification('Employee deleted successfully');
            me.doRefresh();
        });
    }

    displayNotification(msg): void {
        this.snackBar.open(msg, 'OK', {
            verticalPosition: 'top',
            duration        : 3000
        });
    }

    exportAsPdf(): void {
        const columns = [
            {title: 'Name', dataKey: 'name'},
            {title: 'Phone Number', dataKey: 'phoneNumber'},
            {title: 'Gender', dataKey: 'gender'},
            {title: 'Blood Group', dataKey: 'bloodGroup'},
            {title: 'Remark/Sign', dataKey: 'other'}
        ];
        const temp = cloneDeep(this.rows);
        temp.map( obj => {
            obj['name'] = obj.lastName + ' ' + obj.firstName + ' ' + obj.middleName;
            obj['other'] = '';
        } );
        this.exportAsPdfService.exportGridData(columns, temp, 'employee-list', 'Employee List');
    }

    sendDeleteNotification() {
        const emailObj = {
            toEmailId: 'ygawade.edu@gmail.com, pkhegade.edu@gmail.com',
            subject: 'Important: Employee deleted',
            body: JSON.stringify(this.selectedEmpl[0])
          };
        this.emplService.sendEmail(emailObj);
    }
}
