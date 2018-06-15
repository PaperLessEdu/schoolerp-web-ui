import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatSnackBar } from '@angular/material';
import { fuseAnimations } from '@fuse/animations';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { cloneDeep } from 'lodash';
import { ConfirmationDialogComponent } from '../../shared/confirmation-dialog/confirmation-dialog.component';
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
  selectedSubjects: any[] = [];
  pageType = 'add';

  @ViewChild(DatatableComponent) table: DatatableComponent;

  constructor(public dialog: MatDialog,
              private subjectListService: SubjectListService,
              public snackBar: MatSnackBar) { }

  ngOnInit() {
    this.doRefresh();
  }

  onAddAction(): void {
    this.pageType = 'add';
    this.openDialog();
  }

  openDialog(): void {
    const subjectObj = this.pageType === 'add' ? { name: '' } : this.selectedSubjects[0];
    const dialogRef = this.dialog.open(SubjectAddEditComponent, {
      width: '350px',
      data: {
        pageType: this.pageType,
        selectedSubject: cloneDeep(subjectObj)
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
    this.selectedSubjects = [];
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
    this.pageType = 'edit';
    this.openDialog();
  }

  onDeleteAction(): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '350px',
      data: {
        title: 'Confirmation',
        content: 'Are you sure you want delete this subject?'
      }
    });

    dialogRef.afterClosed().subscribe(response => {
      if (!response) {
          return;
      }
      const actionType: string = response[0];
      switch ( actionType ) {
        case 'yes':
          this.deleteSubject();
          break;
        case 'no': break;
      }
    });
  }

  deleteSubject(): void {
    const me = this;
    me.subjectListService.deleteSubject(this.selectedSubjects[0]).subscribe((res: any) => {
     me.displayNotification('Subject deleted successfully');
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
