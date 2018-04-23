import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EmployeeProfileService } from './employee-profile.service';

@Component({
  selector: 'app-employee-profile',
  templateUrl: './employee-profile.component.html',
  styleUrls: ['./employee-profile.component.scss']
})
export class EmployeeProfileComponent implements OnInit {
  emplId: number;
  private sub: any;

  constructor(private emplProfileService: EmployeeProfileService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      debugger;
      this.emplId = +params['id']; // (+) converts string 'id' to a number
      this.emplProfileService.getEmployeeDetails(this.emplId).subscribe((emplDetails: any) => {
        debugger;
        console.log(emplDetails);
      });
   });
  }

}
