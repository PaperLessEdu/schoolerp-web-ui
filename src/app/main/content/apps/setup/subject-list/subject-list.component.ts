import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatSnackBar } from '@angular/material';
import { fuseAnimations } from '@fuse/animations';
import { DatatableComponent } from '@swimlane/ngx-datatable';

import { SubjectAddEditComponent } from '../subject-add-edit/subject-add-edit.component';
import { SubjectListService } from './subject-list.service';

@Component({
  selector: 'app-subject-list',
  templateUrl: './subject-list.component.html',
  styleUrls: ['./subject-list.component.scss'],
  animations : fuseAnimations
})
export class SubjectListComponent implements OnInit {
  rows: any[];
  temp: any[];
  loadingIndicator = true;
  reorderable = true;
  selectedSubjects: any[];
  
  @ViewChild(DatatableComponent) table: DatatableComponent;

  constructor(public dialog: MatDialog,
              private subjectListService: SubjectListService,
              public snackBar: MatSnackBar) { }

  ngOnInit() { 
    this.doRefresh();
  }

  openDialog(): void {
    let dialogRef = this.dialog.open(SubjectAddEditComponent, {
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
    this.subjectListService.getSubjects().subscribe((standards: any) => {
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
      this.selectedSubjects = obj.selected;
  }

  onEditAction(): void {
      
  }
}
