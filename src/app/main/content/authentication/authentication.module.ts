import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

const routes = [
  {
    path: 'login',
    loadChildren: './login/login.module#LoginModule'
  }
  // ,
  // {
  //   path: 'forgot',
  //   loadChildren: './forgotpassword/forgot.module#ForgotPasswordModule'
  // }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    CommonModule
  ]
})
export class AuthenticationModule { }
