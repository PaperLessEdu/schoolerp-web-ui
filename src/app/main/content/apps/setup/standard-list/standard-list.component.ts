import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatSnackBar } from '@angular/material';
import { fuseAnimations } from '@fuse/animations';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { cloneDeep } from 'lodash';

import { ConfirmationDialogComponent } from '../../shared/confirmation-dialog/confirmation-dialog.component';
import { StandardAddEditComponent } from '../standard-add-edit/standard-add-edit.component';
import { StandardListService } from './standard-list.service';

@Component({
  selector: 'app-standards',
  templateUrl: './standard-list.component.html',
  styleUrls: ['./standard-list.component.scss'],
  animations : fuseAnimations
})
export class StandardListComponent implements OnInit {
  rows: any[];
  temp: any[];
  loadingIndicator = true;
  reorderable = true;
  selectedStds: any[] = [];
  pageType = 'add';
  
  @ViewChild(DatatableComponent) table: DatatableComponent;

  constructor(public dialog: MatDialog,
              private standardsService: StandardListService,
              public snackBar: MatSnackBar) { }

  ngOnInit() { 
    this.doRefresh();
  }

  openDialog(): void {
    const stdObj = this.pageType === 'add' ? { name: '' } : this.selectedStds[0];
    const dialogRef = this.dialog.open(StandardAddEditComponent, {
      width: '350px',
      data: {
        pageType: this.pageType,
        selectedStd: cloneDeep(stdObj)
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
    this.selectedStds = [];
    this.standardsService.getStandards().subscribe((standards: any) => {
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
      this.selectedStds = obj.selected;
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
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '350px',
      data: { 
        title: 'Confirmation',
        content: 'Are you sure you want delete this standard?'
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
    const me = this;
    me.standardsService.deleteStandard(this.selectedStds[0]).subscribe((res: any) => {
     me.displayNotification('Standard deleted successfully');
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
