import { Component, OnInit, ViewChild } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { Router } from '@angular/router'; 

import {HolidayListService} from './holiday-list.service';

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

  @ViewChild(DatatableComponent) table: DatatableComponent;

  constructor(private holidayListService: HolidayListService,
              private router: Router) { }
    ngOnInit() {
      this.holidayListService.getHolidays().subscribe((holidays: any) => {
        this.temp = [...holidays];
        this.rows = holidays;
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
      this.selectedholidays = obj.selected;
  }

  onEditAction(): void {
      
  }
}
