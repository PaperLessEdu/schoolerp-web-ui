import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort } from '@angular/material';
import { DataSource } from '@angular/cdk/collections';

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

import {EmployeeListService} from './employee-list.service';
import { error } from 'util';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss'],
  animations : fuseAnimations
})
// export class EmployeeListComponent implements OnInit {

//   constructor(public emplService: EmployeeListService) { }

//   employess: any;

//   ngOnInit() {
//     this.getEmployees();
//   }

//   getEmployees() {
//     this.emplService.getEmployees().subscribe(
//       data => {
//         this.employess = data;
//       },
//       err => {
//         console.log(error);
//       }
//     );
//   }
// }
export class EmployeeListComponent implements OnInit {
  dataSource = new EmplDataSource(this.emplService);
  displayedColumns = ['first_name', 'email'];
  constructor(private emplService: EmployeeListService) { }
  
  ngOnInit() {
  }
}

export class EmplDataSource extends DataSource<any> {
  constructor(private emplService: EmployeeListService) {
    super();
  }
  connect(): Observable<any> {
    return this.emplService.getEmployees();
  }
  disconnect() {}
}
