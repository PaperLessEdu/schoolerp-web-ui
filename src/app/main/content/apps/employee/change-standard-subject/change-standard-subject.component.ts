import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ChangeStandardSubjectService } from './change-standard-subject.service';

@Component({
  selector: 'app-change-standard-subject',
  templateUrl: './change-standard-subject.component.html',
  styleUrls: ['./change-standard-subject.component.scss']
})
export class ChangeStandardSubjectComponent implements OnInit {

  standards: any[] = [];
  subjects: any[] = [];

  constructor(private changeStdSubService: ChangeStandardSubjectService,
              public dialogRef: MatDialogRef<ChangeStandardSubjectComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    this.getStandards();
    this.getSubjects();
  }

  getStandards(): void {
    this.changeStdSubService.getStandards().subscribe((res: any) => {
      this.standards = res;
    });
  }

  getSubjects(): void {
    this.changeStdSubService.getSubjects().subscribe((res: any) => {
      this.subjects = res;
    });
  }
}
