import { Component, OnInit } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { FuseConfigService } from '@fuse/services/config.service';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from './login.service';
import { HttpErrorResponse } from '@angular/common/http/src/response';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  animations: fuseAnimations
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  isLoginError = false;
  isValidUser = true;

  // getters for form control
  get username(): FormControl {
    return <FormControl>(this.loginForm && this.loginForm.get('username'));
  }

  get password(): FormControl {
    return <FormControl>(this.loginForm && this.loginForm.get('password'));
  }

  constructor(
    private fuseConfig: FuseConfigService,
    private formBuilder: FormBuilder,
    private router: Router,
    private loginService: LoginService
  ) {
    this.fuseConfig.setConfig({
      layout: {
        navigation: 'none',
        toolbar: 'none',
        footer: 'none'
      }
    });
  }

  ngOnInit() {
    this.createForm();
  }

  createForm(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  doLogin(): void {
    if (this.username.value === 'admin' && this.password.value === 'Admin!23') {
      localStorage.setItem('userToken', 'sfsf-sdfsd-fsdfds-fsdf-dsf-dsf-sdf');
      this.router.navigate(['/apps/dashboard/home']);
    } else {
      this.isValidUser = false;
    }

    // @TODO: Integrate with actual API
    // this.loginService.userAuthentication(this.username.value, this.password.value).subscribe((data) => {
    //   localStorage.setItem('userToken', data['access_token']);
    //   this.router.navigate(['/apps/dashboard/home']);
    // }, (err: HttpErrorResponse) => {
    //   this.isLoginError = true;
    // });
  }
}
