import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class StudentAddEditService {

  student: any;
  onStudentChanged: BehaviorSubject<any> = new BehaviorSubject({});
  
  constructor() { }

}
