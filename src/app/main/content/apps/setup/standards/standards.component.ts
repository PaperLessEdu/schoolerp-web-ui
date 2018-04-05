import { Component, OnInit, Inject } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { FuseUtils } from '@fuse/utils';
import { MatDialog } from '@angular/material';

import { StandardAddComponent } from '../standard-add/standard-add.component';

@Component({
  selector: 'app-standards',
  templateUrl: './standards.component.html',
  styleUrls: ['./standards.component.scss'],
  animations : fuseAnimations
})
export class StandardsComponent implements OnInit {

  standardName: string;

  constructor(public dialog: MatDialog) { }

  ngOnInit() { }

  openDialog(): void {
      let dialogRef = this.dialog.open(StandardAddComponent, {
        width: '250px',
        data : { 
          standardName: this.standardName
        }
      });

      dialogRef.afterClosed().subscribe(result => {
        this.standardName = result;
      });
  }
}
