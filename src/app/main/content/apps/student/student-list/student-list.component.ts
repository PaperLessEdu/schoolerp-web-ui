import { Component, OnInit } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.scss'],
  animations : fuseAnimations
})
export class StudentListComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
