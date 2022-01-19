import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthServiceZ } from '../../../authentification/auth-service.service';
import { LoginService } from "./../login.service";

@Component({
  selector: 'app-verif-registration-token',
  templateUrl: './verif-registration-token.component.html',
  styleUrls: ['./verif-registration-token.component.scss']
})
export class VerifRegistrationTokenComponent implements OnInit {


  ngOnInit(): void {
  }



  submitted = false;
  ErrorMsg = "";
  registerForm = this.fb.group({
    email: ['', Validators.required],
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    password: ['', Validators.required],
    userType: [''],
    _id: ['', Validators.required],
  });
  get f() {
    return this.registerForm.controls;
  }
  constructor(
    private router: Router,
    private activeroute: ActivatedRoute,
    private authenticationService: AuthServiceZ,
    private fb: FormBuilder,
    private loginService: LoginService
  ) {

    this.activeroute.params
      .subscribe(params => {
        this.registerForm.patchValue({
          userType: params.userType
        })
        this.loginService.verifRegisterTokenV2({ register_token: params.register_token }).then(d => {
          this.authenticationService.setCredentials(d, true);
          this.router.navigate(['/business'])
        }).catch(e => {

          this.ErrorMsg = "Sorry Captain but your invitation is no longer valid !"
        })
      })


  }


}
