import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { fuseAnimations } from '@fuse/animations';

import { StudentProfileService } from './student-profile.service';

@Component({
  selector: 'app-student-profile',
  templateUrl: './student-profile.component.html',
  styleUrls: ['./student-profile.component.scss'],
  animations: fuseAnimations
})
export class StudentProfileComponent implements OnInit {
  studentId: number;
  studentDetails: any = {};
  private sub: any;
  panelOpenState = false;

  constructor(
    private studentProfileService: StudentProfileService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.fetchStudentDetails();
  }

  fetchStudentDetails(): void {
    this.sub = this.route.params.subscribe(params => {
      this.studentId = +params['id']; // (+) converts string 'id' to a number
      this.studentProfileService.getStudentDetails(this.studentId).subscribe((response: any) => {
        this.studentDetails = response;
      });
    });
  }

}
