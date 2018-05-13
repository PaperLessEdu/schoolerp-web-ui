import { Component, OnInit, ViewEncapsulation, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MatSnackBar } from '@angular/material';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { RoleAddEditService } from './role-add-edit.service';

@Component({
  selector: 'app-role-add-edit',
  templateUrl: './role-add-edit.component.html',
  styleUrls: ['./role-add-edit.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class RoleAddEditComponent implements OnInit {
  roleForm: FormGroup;
  roleFormErrors: any;

  constructor(private formBuilder: FormBuilder,
              private snackBar: MatSnackBar,
              private roleAddEditService: RoleAddEditService,
              public dialogRef: MatDialogRef<RoleAddEditComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
      this.roleFormErrors = {
        name: {}
      }; 
    }

  ngOnInit() {
    this.roleForm = this.formBuilder.group({
      role: ['', Validators.required]
    });
  }

  addRole(): void {
    const data = this.roleForm.getRawValue();
    this.roleAddEditService.addRole(data)
      .then(() => {
        this.dialogRef.close(['save', this.roleForm]);  
          
        // Show the success message
        const msg = 'Role added successfully';
        this.snackBar.open(msg, 'OK', {
            verticalPosition: 'top',
            duration        : 3000
        });
      });
  }

  updateRole(): void {
    const data = this.data.selectedRole;
    this.roleAddEditService.updateRole(data)
      .then(() => {
        this.dialogRef.close(['save', this.roleForm]);  
          
        // Show the success message
        const msg = 'Role updated successfully';
        this.snackBar.open(msg, 'OK', {
            verticalPosition: 'top',
            duration        : 3000
        });
      });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
