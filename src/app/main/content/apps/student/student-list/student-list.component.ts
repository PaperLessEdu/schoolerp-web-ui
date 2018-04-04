import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { StudentListService } from 'app/main/content/apps/student/student-list/student-list.service';
import { Observable } from 'rxjs/Observable';
import { DataSource } from '@angular/cdk/collections';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { MatPaginator, MatSort } from '@angular/material';
import { FuseUtils } from '@fuse/utils';

import 'rxjs/add/operator/startWith';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/observable/fromEvent';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.scss'],
  animations : fuseAnimations
})
export class StudentListComponent implements OnInit {
  dataSource: FilesDataSource | null;
  displayedColumns = ['name', 'address'];
  
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild('filter') filter: ElementRef;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private studentListService: StudentListService
  ) { 
    const data = this.studentListService.studentList;
  }

  ngOnInit() {
    this.dataSource = new FilesDataSource(this.studentListService, this.paginator, this.sort);
      Observable.fromEvent(this.filter.nativeElement, 'keyup')
                .debounceTime(150)
                .distinctUntilChanged()
                .subscribe(() => {
                    if ( !this.dataSource ) {
                        return;
                    }
                    this.dataSource.filter = this.filter.nativeElement.value;
                });
  }
}

export class FilesDataSource extends DataSource<any> {
  _filterChange = new BehaviorSubject('');
  _filteredDataChange = new BehaviorSubject('');

  get filteredData(): any {
      return this._filteredDataChange.value;
  }

  set filteredData(value: any) {
      this._filteredDataChange.next(value);
  }

  get filter(): string {
      return this._filterChange.value;
  }

  set filter(filter: string) {
      this._filterChange.next(filter);
  }

  constructor(
      private studentListService: StudentListService,
      private _paginator: MatPaginator,
      private _sort: MatSort
  ) {
      super();
      this.filteredData = this.studentListService.studentList;
  }

  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<any[]> {
      const displayDataChanges = [
          this.studentListService.onStudentChanged,
          this._paginator.page,
          this._filterChange,
          this._sort.sortChange
      ];

      return Observable.merge(...displayDataChanges).map(() => {
          let data = this.studentListService.studentList.slice();

          data = this.filterData(data);

          this.filteredData = [...data];

          data = this.sortData(data);

          // Grab the page's slice of data.
          const startIndex = this._paginator.pageIndex * this._paginator.pageSize;
          return data.splice(startIndex, this._paginator.pageSize);
      });
  }

  filterData(data): any[] {
      if (!this.filter) {
          return data;
      }
      return FuseUtils.filterArrayByString(data, this.filter);
  }

  sortData(data): any[] {
      if (!this._sort.active || this._sort.direction === '') {
          return data;
      }

      return data.sort((a, b) => {
          let propertyA: number | string = '';
          let propertyB: number | string = '';

          switch ( this._sort.active ) {
            case 'firstName':
              [propertyA, propertyB] = [a.firstName, b.firstName];
              break;
            case 'jobType':
              [propertyA, propertyB] = [a.jobType, b.jobType];
              break;
            case 'emailId':
                [propertyA, propertyB] = [a.emailId, b.emailId];
                break;
          }

          const valueA = isNaN(+propertyA) ? propertyA : +propertyA;
          const valueB = isNaN(+propertyB) ? propertyB : +propertyB;

          return (valueA < valueB ? -1 : 1) * (this._sort.direction === 'asc' ? 1 : -1);
      });
  }

  disconnect() { }
}
