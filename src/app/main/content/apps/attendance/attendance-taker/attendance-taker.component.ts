import { Component, OnInit } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';

@Component({
  selector: 'app-attendance-taker',
  templateUrl: './attendance-taker.component.html',
  styleUrls: ['./attendance-taker.component.scss'],
  animations : fuseAnimations
})
export class AttendanceTakerComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
