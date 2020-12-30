import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthServiceZ } from '../../../authentification/auth-service.service';
import { LoginService } from "../login.service";
import { SocialAuthService } from "angularx-social-login";
import { FacebookLoginProvider, GoogleLoginProvider } from "angularx-social-login";
import { TranslateService } from "@ngx-translate/core";

@Component({
  selector: 'app-login',
  templateUrl: './login-admin.component.html',
  styleUrls: ['./login-admin.component.scss'],
})
export class LoginAdminComponent implements OnInit {
  bg = "./../../../../assets/img/backgrounds/bisos.png"

  user
  error
  ErrorMsg
  submitted = false;
  loginBtnClicked = false;
  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.maxLength(50), Validators.pattern(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,10})+$/)]],
    password: ['', Validators.required],
  });
  get f() {
    return this.loginForm.controls;
  }
  constructor(
    private router: Router,
    private authenticationService: AuthServiceZ,
    private fb: FormBuilder,
    private loginService: LoginService,
    private authService: SocialAuthService,
    public translate: TranslateService,

  ) {
    translate.addLangs(['en', 'fr']);
    translate.setDefaultLang('en');
  }

  ngOnInit(): void {


    this.authService.authState.subscribe((user) => {
      this.user = user;
      if (this.loginBtnClicked) {
        this.loginService
          .loginSocialAdmin(user)
          .then((d) => {

            if (this.loginBtnClicked) {
              this.authenticationService.setCredentials(d, true);
             


              this.router.navigate(['/'])

            }


          })
          .catch((e) => {
            this.error = e.error.message;

          });
      }
      // this.loggedIn = (user != null);
    });


  }


  signInWithGoogle(): void {
    this.loginBtnClicked = true
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }

  signInWithFB(): void {
    this.loginBtnClicked = true
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID);
  }

  signOut(): void {
    this.authService.signOut();
  }
  login() {
    this.submitted = true;
    //stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    } else {
      const registerBody = {
        email: this.f.email.value,
        password: this.f.password.value,
      };

      this.loginService
        .loginAdmin(registerBody)
        .then((d) => {
          this.authenticationService.setCredentials(d, true);
          this.router.navigate(['/'])
        })
        .catch((e) => {
          this.error = e.error.message;
        });
    }
  }

  seeMyPw() {
    let x
    x = document.getElementById("password");
    if (x.type === "password") {
      x.type = "text";
    } else {
      x.type = "password";
    }
  }
}
