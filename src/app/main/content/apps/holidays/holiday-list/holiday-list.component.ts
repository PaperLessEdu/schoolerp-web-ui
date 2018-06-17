import { Component, OnInit, ViewChild } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { MatDialog, MatSnackBar } from '@angular/material';
import { cloneDeep } from 'lodash';
import * as moment from 'moment';

import { ConfirmationDialogComponent } from '../../shared/confirmation-dialog/confirmation-dialog.component';
import { HolidayAddEditComponent } from '../holiday-add-edit/holiday-add-edit.component';
import { HolidayListService } from './holiday-list.service';
import { ExportAsPdfService } from '../../shared/services/export-as-pdf.service';

@Component({
  selector: 'app-holiday-list',
  templateUrl: './holiday-list.component.html',
  styleUrls: ['./holiday-list.component.scss'],
  animations : fuseAnimations
})
export class HolidayListComponent implements OnInit {
  rows: any[];
  temp: any[];
  loadingIndicator = true;
  reorderable = true;
  selectedholidays: any[] = [];
  pageType = 'add';

  @ViewChild(DatatableComponent) table: DatatableComponent;

  constructor(private holidayListService: HolidayListService,
              private snackBar: MatSnackBar,
              public dialog: MatDialog,
              private exportAsPdfService: ExportAsPdfService) { }

  ngOnInit() {
    this.doRefresh();
  }

  doRefresh(): void {
    this.selectedholidays = [];
    this.holidayListService.getHolidays().subscribe((holidays: any) => {
      this.temp = [...holidays];
      this.rows = holidays;
      this.loadingIndicator = false;
    });
  }

  openDialog(): void {
    const holidayObj = this.pageType === 'add' ? { date: '', name: '' } : this.selectedholidays[0];
    const dialogRef = this.dialog.open(HolidayAddEditComponent, {
      width: '350px',
      data: {
        pageType: this.pageType,
        selectedHoliday: holidayObj
      }
    });

    dialogRef.afterClosed().subscribe(response => {
      if (!response) {
          return;
      }
      const actionType: string = response[0];
      switch ( actionType ) {
        case 'save':
          this.doRefresh();
          break;
        case 'close': break;
      }
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
      this.selectedholidays = obj.selected;
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
        content: 'Are you sure you want delete this holiday?'
      }
    });

    dialogRef.afterClosed().subscribe(response => {
      if (!response) {
          return;
      }
      const actionType: string = response[0];
      switch ( actionType ) {
        case 'yes':
          this.deleteHoliday();
          break;
        case 'no': break;
      }
    });
  }

  deleteHoliday(): void {
    const me = this;
    me.holidayListService.deleteHolidays(this.selectedholidays[0]).subscribe((res: any) => {
      me.displayNotification('Holiday deleted successfully');
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
      {title: 'Date', dataKey: 'date'},
      {title: 'Name', dataKey: 'name'}
    ];
    const temp = cloneDeep(this.rows);
    temp.map( obj => obj['date'] = moment(obj['date']).format('DD MMM YYYY') );
    this.exportAsPdfService.exportGridData(columns, temp, 'holiday-list');
  }
}
