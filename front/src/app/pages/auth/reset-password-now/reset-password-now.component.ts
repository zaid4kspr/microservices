import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthServiceZ } from '../../../authentification/auth-service.service';
import { LoginService } from "./../login.service";

@Component({
  selector: 'app-reset-password-now',
  templateUrl: './reset-password-now.component.html',
  styleUrls: ['./reset-password-now.component.scss']
})
export class ResetPasswordNowComponent implements OnInit {
  submitted = false;
  errorDiffPassword = false
  success = ""
  error = ""
  resetPasswordForm
  bg="./../../../../assets/img/backgrounds/bisos.png"



  constructor(private router: Router,
    private activeroute: ActivatedRoute,
    private authenticationService: AuthServiceZ,
    private loginService: LoginService,
    private fb: FormBuilder) {

    this.resetPasswordForm = this.fb.group({

      token: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],

    });

  }

  ngOnInit(): void {

    this.activeroute.params
      .subscribe(params => {
        this.resetPasswordForm.patchValue({
          token: params.register_token
        })
      })
  }


  resetMyPassword() {
    this.submitted = true;
    if (this.resetPasswordForm.valid) {
      if (this.resetPasswordForm.controls.password.value != this.resetPasswordForm.controls.confirmPassword.value) {
        this.errorDiffPassword = true;
      } else {
        this.loginService.resetPasswordNow(this.resetPasswordForm.value).then(d => {
          this.success = d.message
          this.error = ""
          this.errorDiffPassword = false
          this.router.navigate(['/auth/login'])
        }).catch(e => {
          this.success = ""
          this.error = e.error.message
        })
      }
    }
  }
  get f() {
    return this.resetPasswordForm.controls;
  }


}
