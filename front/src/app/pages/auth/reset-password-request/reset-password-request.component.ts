import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { AuthServiceZ } from '../../../authentification/auth-service.service';
import { LoginService } from "./../login.service";



@Component({
  selector: 'app-reset-password-request',
  templateUrl: './reset-password-request.component.html',
  styleUrls: ['./reset-password-request.component.scss']
})
export class ResetPasswordRequestComponent implements OnInit {
  submitted = false;
  ErrorMsg = "";
  success = ""
  error = ""
  bg="./../../../../assets/img/backgrounds/bisos.png"

  resetPwForm: FormGroup;
  get f() {
    return this.resetPwForm.controls;
  }

  constructor(private router: Router,
    private activeroute: ActivatedRoute,
    private authenticationService: AuthServiceZ,
    private loginService: LoginService,
    private fb: FormBuilder) {
    this.resetPwForm = this.fb.group({
      email: ['', Validators.email],
    });
  }


  ngOnInit(): void {
  }



  resetPw() {
    this.submitted = true;

    if (this.resetPwForm.valid) {

      this.loginService.sendPasswordRecoveryRequest(this.resetPwForm.value).then(d => {
        this.success = d.message
        this.error = ""

      }).catch(e => {
        this.success = ""
        this.error = e.error.message
      })
    }



  }

}
