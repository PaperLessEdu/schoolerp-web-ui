import { Component, OnInit, Inject, ViewEncapsulation } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-attendance-details',
  templateUrl: './attendance-details.component.html',
  styleUrls: ['./attendance-details.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AttendanceDetailsComponent implements OnInit {

    constructor(public dialogRef: MatDialogRef<AttendanceDetailsComponent>,
                @Inject(MAT_DIALOG_DATA) public data: any) {

    }

    ngOnInit() { }

}
