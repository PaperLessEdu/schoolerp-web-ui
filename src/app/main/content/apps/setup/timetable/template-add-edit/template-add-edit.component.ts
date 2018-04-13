import { Component, OnInit } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { MatDialog, MatSnackBar } from '@angular/material';
import { FormGroup } from '@angular/forms';
import { cloneDeep } from 'lodash';   

import { TemplateTimePickerComponent } from '../template-time-picker/template-time-picker.component'

@Component({
  selector: 'app-template-add-edit',
  templateUrl: './template-add-edit.component.html',
  styleUrls: ['./template-add-edit.component.scss'],
  animations   : fuseAnimations
})
export class TemplateAddEditComponent implements OnInit {
  timerPickerForm: FormGroup;
  selectedTile: any;
  tiles = [
    {text: 'Monday', cols: 1, rows: 1, slotInfo: {isHeader: true}},
    {text: 'Tuesday', cols: 1, rows: 1, slotInfo: {isHeader: true}},
    {text: 'Wednesday', cols: 1, rows: 1, slotInfo: {isHeader: true}},
    {text: 'Thursday', cols: 1, rows: 1, slotInfo: {isHeader: true}},
    {text: 'Friday', cols: 1, rows: 1, slotInfo: {isHeader: true}},
    {text: 'Saturday', cols: 1, rows: 1, slotInfo: {isHeader: true}}
  ];

  constructor(public dialog: MatDialog) { }

  ngOnInit() { 
    this.addNewRow();
  }

  addNewRow() {
    this.tiles.push(
      {text: '', cols: 1, rows: 2, slotInfo: {isHeader: false}},
      {text: '', cols: 1, rows: 2, slotInfo: {isHeader: false}},
      {text: '', cols: 1, rows: 2, slotInfo: {isHeader: false}},
      {text: '', cols: 1, rows: 2, slotInfo: {isHeader: false}},
      {text: '', cols: 1, rows: 2, slotInfo: {isHeader: false}},
      {text: '', cols: 1, rows: 2, slotInfo: {isHeader: false}}
    );
  }

  onTileClick(tile) {
    this.selectedTile = tile;
    this.openDialog();
  }

  openDialog(): void {
    let dialogRef = this.dialog.open(TemplateTimePickerComponent, {
      width: '350px',
      data: {
        selectedSlot: cloneDeep(this.selectedTile.slotInfo)
      }
    });

    dialogRef.afterClosed().subscribe(response => {
      if (!response) {
          return;
      }
      this.timerPickerForm = response[1];
      const actionType: string = response[0];
      switch ( actionType ) {
        case 'save': 
          this.updateSlot();
          break; 
        case 'close': break;
      }     
    });
  }

  updateSlot(): void {
    this.selectedTile.slotInfo['name'] = this.timerPickerForm.get('name').value;
    this.selectedTile.slotInfo['startTime'] = this.timerPickerForm.get('startTime').value;
    this.selectedTile.slotInfo['endTime'] = this.timerPickerForm.get('endTime').value;
  }
}
