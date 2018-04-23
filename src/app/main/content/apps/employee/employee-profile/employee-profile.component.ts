import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { fuseAnimations } from '@fuse/animations';

import { EmployeeProfileService } from './employee-profile.service';

@Component({
  selector: 'app-employee-profile',
  templateUrl: './employee-profile.component.html',
  styleUrls: ['./employee-profile.component.scss'],
  animations : fuseAnimations
})
export class EmployeeProfileComponent implements OnInit {
  emplId: number;
  emplDetails: any = {};
  private sub: any;

  constructor(private emplProfileService: EmployeeProfileService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.emplId = +params['id']; // (+) converts string 'id' to a number
      this.emplProfileService.getEmployeeDetails(this.emplId).subscribe((res: any) => {
        this.emplDetails = res;
      });
   });
  }

}
