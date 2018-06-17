import { Component, OnInit } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { MatDialog, MatSnackBar } from '@angular/material';
import { cloneDeep } from 'lodash';

import { AcademicYearListService } from './academic-year-list.service';
import { AcademicYearAddEditComponent } from '../academic-year-add-edit/academic-year-add-edit.component';
@Component({
  selector: 'app-academic-year-list',
  templateUrl: './academic-year-list.component.html',
  styleUrls: ['./academic-year-list.component.scss'],
  animations : fuseAnimations
})
export class AcademicYearListComponent implements OnInit {
  loadingIndicator = false;
  rows = [];
  temp: any[];
  selected = [];
  reorderable = true;
  pageType = 'add';

  constructor(public dialog: MatDialog,
              private academicYearListService: AcademicYearListService) { }

  ngOnInit() {
    this.doRefresh();
  }

  onAddAction() {
    this.pageType = 'add';
    this.openDialog();
  }

  onEditAction() {

  }

  onDeleteAction() {

  }

  updateFilter(event): void {

  }

  onSelect(obj): void {
    this.selected = obj.selected;
  }

  openDialog(): void {
    const obj = this.pageType === 'add' ? { name: '' } : this.selected[0];
    const dialogRef = this.dialog.open(AcademicYearAddEditComponent, {
      width: '550px',
      data: {
        pageType: this.pageType,
        selectedAcademicYear: cloneDeep(obj)
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
    this.selected = [];
    this.academicYearListService.getAcademicYears().subscribe((years: any) => {
        this.temp = [...years];
        this.rows = years;
        this.loadingIndicator = false;
    });
  }
}
