import { Component, OnInit } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';

@Component({
  selector: 'app-examination-list',
  templateUrl: './examination-list.component.html',
  styleUrls: ['./examination-list.component.scss'],
  animations : fuseAnimations
})
export class ExaminationListComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
