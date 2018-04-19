import { Component, OnInit, Inject } from '@angular/core';
import { ChangeRoleService } from './change-role.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-change-role',
  templateUrl: './change-role.component.html',
  styleUrls: ['./change-role.component.scss']
})
export class ChangeRoleComponent implements OnInit {
  roles: any[] = [];
  selectedRoleId: number = 0; 

  constructor(private changeRoleService: ChangeRoleService,
              private dialogRef: MatDialogRef<ChangeRoleComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
    if (this.data && this.data.selectedEmpl) {
      this.selectedRoleId = this.data.selectedEmpl.roleId;
    }
  }

  ngOnInit() {
    this.getRoles();
  }

  getRoles(): void {
    this.changeRoleService.getRoles().subscribe((roles: any) => {
      this.roles = roles;
    });
  }

  onRoleChange(event): void {
    this.selectedRoleId = event.value;
  }

  updateRole(): void {
    //TODO: update role api call to backend
  }
}
