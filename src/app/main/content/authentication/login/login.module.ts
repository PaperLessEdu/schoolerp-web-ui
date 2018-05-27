import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatButtonModule, MatCheckboxModule, MatFormFieldModule, MatInputModule, MatIconModule } from '@angular/material';
import { FuseSharedModule } from '@fuse/shared.module';
import { LoginComponent } from './login.component';
import { LoginService } from './login.service';

const routes = [
  {
    path: '',
    component: LoginComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    MatButtonModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    FuseSharedModule
  ],
  declarations: [LoginComponent],
  providers: [LoginService]
})
export class LoginModule { }
