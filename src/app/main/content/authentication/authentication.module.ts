import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginModule } from './login/login.module';
import { ForgotPasswordModule } from './forgot-password/forgot-password.module';

@NgModule({
  imports: [
    LoginModule,
    CommonModule,
    ForgotPasswordModule
  ]
})
export class AuthenticationModule { }
