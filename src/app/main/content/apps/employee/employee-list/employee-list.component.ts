import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { fuseAnimations } from '@fuse/animations';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { Router } from '@angular/router';
import { MatDialog, MatSnackBar} from '@angular/material';

import { EmployeeListService } from './employee-list.service';
import { ChangeRoleComponent } from '../change-role/change-role.component';
import { ChangeStandardSubjectComponent } from '../change-standard-subject/change-standard-subject.component';
import { ConfirmationDialogComponent } from '../../shared/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss'],
  animations : fuseAnimations
})

export class EmployeeListComponent implements OnInit {
    rows: any[];
    temp: any[];
    loadingIndicator = false;
    reorderable = true;
    selectedEmpl: any[] = [];

    @ViewChild(DatatableComponent) table: DatatableComponent;

    constructor(private emplService: EmployeeListService,
                private router: Router,
                public dialog: MatDialog,
                public snackBar: MatSnackBar) { }

    ngOnInit() {
        this.doRefresh();
    }

    doRefresh(): void {
        this.loadingIndicator = true;
        this.emplService.getEmployees().subscribe((empls: any) => {
            this.temp = [...empls];
            this.rows = empls;
            this.loadingIndicator = false;
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
}
