import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatSnackBar } from '@angular/material';
import { fuseAnimations } from '@fuse/animations';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { cloneDeep } from 'lodash'; 

import { ConfirmationDialogComponent } from '../../shared/confirmation-dialog/confirmation-dialog.component';
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
  selectedDivisions: any[] = [];
  pageType: string = 'add';

  @ViewChild(DatatableComponent) table: DatatableComponent;

  constructor(public dialog: MatDialog,
              public snackBar: MatSnackBar,
              private divisionListService: DivisionListService) { }

  ngOnInit() { 
    this.doRefresh();
  }

  openDialog(): void {
    let divisionObj = this.pageType == 'add' ? { name: '' } : this.selectedDivisions[0];
    let dialogRef = this.dialog.open(DivisionAddEditComponent, {
      width: '350px',
      data: {
        pageType: this.pageType,
        selectedDivision: cloneDeep(divisionObj)
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

  doRefresh() {
    this.selectedDivisions = [];
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
        return d.name.toLowerCase().indexOf(val) !== -1 || !val;
    });

    // update the rows
    this.rows = temp;
    // Whenever the filter changes, always go back to the first page
    this.table.offset = 0;
  }

  onSelect(obj): void {
      this.selectedDivisions = obj.selected;
  }

  onAddAction(): void {
    this.pageType = 'add';
    this.openDialog();
  }

  onEditAction(): void {
    this.pageType = 'edit';
    this.openDialog();
  }

  onDeleteAction(): void {
    let dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '350px',
      data: { 
        title: 'Confirmation',
        content: 'Are you sure you want delete this division?'
      }
    });
    
    dialogRef.afterClosed().subscribe(response => {
      if (!response) {
          return;
      }
      const actionType: string = response[0];
      switch ( actionType ) {
        case 'yes': 
          this.deleteDivision(); 
          break; 
        case 'no': break;
      }   
    });
  }

  deleteDivision(): void {
    let me = this;
    me.divisionListService.deleteDivision(this.selectedDivisions[0]).subscribe((res: any) => {
     me.displayNotification("Division deleted successfully");
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
