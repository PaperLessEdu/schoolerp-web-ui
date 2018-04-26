import { Component, OnInit } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { AttendanceTakerService } from './attendance-taker.service';

@Component({
  selector: 'app-attendance-taker',
  templateUrl: './attendance-taker.component.html',
  styleUrls: ['./attendance-taker.component.scss'],
  animations : fuseAnimations
})
export class AttendanceTakerComponent implements OnInit {

  constructor(private attendanceTakerService: AttendanceTakerService) { }

  ngOnInit() { }
}
