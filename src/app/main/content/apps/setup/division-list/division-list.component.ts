import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatSnackBar } from '@angular/material';
import { fuseAnimations } from '@fuse/animations';
import { DatatableComponent } from '@swimlane/ngx-datatable';

import { DivisionAddEditComponent } from '../division-add-edit/division-add-edit.component';
import { DivisionListService } from './division-list.service';

@Component({
  selector: 'app-division-list',
  templateUrl: './division-list.component.html',
  styleUrls: ['./division-list.component.scss'],
  animations : fuseAnimations
})
export class DivisionListComponent implements OnInit {
  rows: any[];
  temp: any[];
  loadingIndicator = true;
  reorderable = true;
  selectedStd: any[];
  
  @ViewChild(DatatableComponent) table: DatatableComponent;

  constructor(public dialog: MatDialog,
              private divisionListService: DivisionListService,
              public snackBar: MatSnackBar) { }

  ngOnInit() { 
    this.doEefresh();
  }

  openDialog(): void {
    let dialogRef = this.dialog.open(DivisionAddEditComponent, {
      width: '350px'
    });

    dialogRef.afterClosed().subscribe(response => {
      if (!response) {
          return;
      }
      const actionType: string = response[0];
      switch ( actionType ) {
        case 'save': this.doEefresh(); break; 
        case 'close': break;
      }   
    });
  }

  doEefresh() {
    this.divisionListService.getDivisions().subscribe((standards: any) => {
        this.temp = [...standards];
        this.rows = standards;
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
      this.selectedStd = obj.selected;
  }

  onEditAction(): void {
      
  }
}
