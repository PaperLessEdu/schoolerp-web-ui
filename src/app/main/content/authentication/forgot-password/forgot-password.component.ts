import { Component, OnInit } from '@angular/core';
import { FuseConfigService } from '@fuse/services/config.service';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { fuseAnimations } from '@fuse/animations';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
  animations: fuseAnimations
})
export class ForgotPasswordComponent implements OnInit {

  forgotPasswordForm: FormGroup;

  // getters for form control
  get email(): FormControl {
    return <FormControl>(this.forgotPasswordForm && this.forgotPasswordForm.get('email'));
  }

  constructor(
    private fuseConfig: FuseConfigService,
    private formBuilder: FormBuilder
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
    this.forgotPasswordForm = this.formBuilder.group({
      email: ['', Validators.required]
    });
  }

}
