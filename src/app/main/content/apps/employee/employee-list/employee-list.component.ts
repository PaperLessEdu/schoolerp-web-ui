import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { fuseAnimations } from '@fuse/animations';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { Router } from '@angular/router'; 

import {EmployeeListService} from './employee-list.service';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss'],
  animations : fuseAnimations
})

export class EmployeeListComponent implements OnInit {
    rows: any[];
    temp: any[];
    loadingIndicator = true;
    reorderable = true;
    selectedEmpl: any[] = [];

    @ViewChild(DatatableComponent) table: DatatableComponent;

    constructor(private emplService: EmployeeListService,
                private router: Router) { }
    
    ngOnInit() {
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
}