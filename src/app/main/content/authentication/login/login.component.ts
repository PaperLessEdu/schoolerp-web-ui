import { Component, OnInit } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { FuseConfigService } from '@fuse/services/config.service';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  animations: fuseAnimations
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

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
    private router: Router
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
    console.log(this.username.value+"------"+this.password.value);
    if (this.username.value === 'admin' && this.password.value === 'admin') {
      this.router.navigate(['/apps/dashboard/home']);
    }
  }
}
