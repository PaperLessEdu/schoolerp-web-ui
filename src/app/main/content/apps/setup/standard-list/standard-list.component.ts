import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatSnackBar } from '@angular/material';
import { fuseAnimations } from '@fuse/animations';
import { DatatableComponent } from '@swimlane/ngx-datatable';

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
  selectedStd: any[];
  
  @ViewChild(DatatableComponent) table: DatatableComponent;

  constructor(public dialog: MatDialog,
              private standardsService: StandardListService,
              public snackBar: MatSnackBar) { }

  ngOnInit() { 
    this.doRefresh();
  }

  openDialog(): void {
    let dialogRef = this.dialog.open(StandardAddEditComponent, {
      width: '350px'
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