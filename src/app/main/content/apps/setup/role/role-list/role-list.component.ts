import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatSnackBar } from '@angular/material';
import { fuseAnimations } from '@fuse/animations';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { cloneDeep } from 'lodash'; 

import { ConfirmationDialogComponent } from '../../../shared/confirmation-dialog/confirmation-dialog.component';
import { RoleListService } from './role-list.service';
import { RoleAddEditComponent } from '../role-add-edit/role-add-edit.component';
@Component({
  selector: 'app-role-list',
  templateUrl: './role-list.component.html',
  styleUrls: ['./role-list.component.scss'],
  animations : fuseAnimations
})
export class RoleListComponent implements OnInit {
  rows: any[];
  temp: any[];
  loadingIndicator = true;
  reorderable = true;
  selectedRoles: any[] = [];
  pageType: string = 'add';

  @ViewChild(DatatableComponent) table: DatatableComponent;

  constructor(public dialog: MatDialog,
              private roleListService: RoleListService,
              public snackBar: MatSnackBar) { }

  ngOnInit() { 
    this.doRefresh();
  }

  openDialog(): void {
    let roleObj = this.pageType == 'add' ? { name: '' } : this.selectedRoles[0];
    let dialogRef = this.dialog.open(RoleAddEditComponent, {
      width: '350px',
      data: {
        pageType: this.pageType,
        selectedRole: cloneDeep(roleObj)
      }
    });

    dialogRef.afterClosed().subscribe(response => {
      if (!response) {
          return;
      }
      const actionType: string = response[0];
      switch ( actionType ) {
        case 'save': this.doRefresh(); break; 
        case 'close': break;
      }     
    });
  }

  doRefresh(): void {
    this.selectedRoles = [];
    this.roleListService.getRoles().subscribe((roles: any) => {
        this.temp = [...roles];
        this.rows = roles;
        this.loadingIndicator = false;
    });
  }

  updateFilter(event): void {
    const val = event.target.value.toLowerCase();

    // filter our data
    const temp = this.temp.filter(function(d) {
        return d.name.toLowerCase().indexOf(val) !== -1 || !val;
    });

    // update the rows
    this.rows = temp;
    // Whenever the filter changes, always go back to the first page
    this.table.offset = 0;
  }

  onSelect(obj): void {
      this.selectedRoles = obj.selected;
  }

  onAddAction(): void {
    this.pageType = 'add';
    this.openDialog();
  }

  onEditAction(): void {
    this.pageType = 'edit';
    this.openDialog();
  }

  onDeleteAction(): void {
    let dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '350px',
      data: { 
        title: 'Confirmation',
        content: 'Are you sure you want delete this role?'
      }
    });
    
    dialogRef.afterClosed().subscribe(response => {
      if (!response) {
          return;
      }
      const actionType: string = response[0];
      switch ( actionType ) {
        case 'yes': 
          this.deleteHoliday(); 
          break; 
        case 'no': break;
      }   
    });
  }

  deleteHoliday(): void {
    let me = this;
    me.roleListService.deleteRole(this.selectedRoles[0]).subscribe((res: any) => {
     me.displayNotification("Role deleted successfully");
     me.doRefresh();
    });  
  }

  displayNotification(msg): void {
    this.snackBar.open(msg, 'OK', {
      verticalPosition: 'top',
      duration        : 3000
    });
  }
}
