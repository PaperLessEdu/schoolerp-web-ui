import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatSnackBar } from '@angular/material';
import { DataSource } from '@angular/cdk/collections';
import { MatDialog } from '@angular/material';

import 'rxjs/add/operator/startWith';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/observable/fromEvent';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { fuseAnimations } from '@fuse/animations';
import { FuseUtils } from '@fuse/utils';

import { SubjectAddEditComponent } from '../subject-add-edit/subject-add-edit.component';
import { SubjectListService } from './subject-list.service';

@Component({
  selector: 'app-subject-list',
  templateUrl: './subject-list.component.html',
  styleUrls: ['./subject-list.component.scss'],
  animations : fuseAnimations
})
export class SubjectListComponent implements OnInit {
  
  dataSource: SubjectsDataSource | null;
  displayedColumns = ['name', 'abbreviation'];
  
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild('filter') filter: ElementRef;
  @ViewChild(MatSort) sort: MatSort;

  constructor(public dialog: MatDialog,
              private subjectListService: SubjectListService,
              public snackBar: MatSnackBar) { }

  ngOnInit() { 
    this.dataSource = new SubjectsDataSource(this.subjectListService, this.paginator, this.sort);
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

  openDialog(): void {
    let dialogRef = this.dialog.open(SubjectAddEditComponent, {
      width: '250px'
    });

    dialogRef.afterClosed().subscribe(result => {
      this.refresh();     
    });
  }

  refresh() {
    this.subjectListService.getSubjects();
  }
}

export class SubjectsDataSource extends DataSource<any> {
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

  constructor(private subjectListService: SubjectListService,
              private _paginator: MatPaginator,
              private _sort: MatSort) {
    super();
    this.filteredData = this.subjectListService.subjects;
  }
  
  connect(): Observable<any> {
    //return this.standardsService.getStandards();
    const displayDataChanges = [
      this.subjectListService.onSubjectsChanged,
      this._paginator.page,
      this._filterChange,
      this._sort.sortChange
    ];
    
    return Observable.merge(...displayDataChanges).map(() => {
      let data = this.subjectListService.subjects.slice();
      data = this.filterData(data);
      
      this.filteredData = [...data];

      data = this.sortData(data);

      // Grab the page's slice of data.
      const startIndex = this._paginator.pageIndex * this._paginator.pageSize;
      return data.splice(startIndex, this._paginator.pageSize);
    });
  }

  filterData(data) {
      if (!this.filter){
          return data;
      }
      return FuseUtils.filterArrayByString(data, this.filter);
  }

  sortData(data): any[] {
    if ( !this._sort.active || this._sort.direction === '' ) {
        return data;
    }

    return data.sort((a, b) => {
        let propertyA: number | string = '';
        let propertyB: number | string = '';

        switch ( this._sort.active ) {
          case 'name':
            [propertyA, propertyB] = [a.name, b.name];
            break;
        }

        const valueA = isNaN(+propertyA) ? propertyA : +propertyA;
        const valueB = isNaN(+propertyB) ? propertyB : +propertyB;

        return (valueA < valueB ? -1 : 1) * (this._sort.direction === 'asc' ? 1 : -1);
    });
}

  disconnect() {}
}
