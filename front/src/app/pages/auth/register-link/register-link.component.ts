import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthServiceZ } from '../../../authentification/auth-service.service';
import { LoginService } from "./../login.service";

@Component({
  selector: 'app-register-link',
  templateUrl: './register-link.component.html',
  styleUrls: ['./register-link.component.scss']
})
export class RegisterLinkComponent implements OnInit {

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
  ) { }
  userType
  ngOnInit(): void {
    this.activeroute.params
      .subscribe(params => {
        this.registerForm.patchValue({
          userType: params.userType
        })
        this.loginService.verifRegisterToken({ register_token: params.register_token, userType: params.userType }).then(d => {
          this.registerForm.patchValue(d[0])
        }).catch(d => {

          this.ErrorMsg = "Sorry Captain but your invitation is no longer valid !"
        })
      })
  }




  register() {
    this.submitted = true

    if (this.registerForm.valid) {
      this.loginService.registerWithLink(this.registerForm.value).then(d => {
        this.router.navigate(['/auth/login'])
        this.submitted = false

      })
    }

  }

}
