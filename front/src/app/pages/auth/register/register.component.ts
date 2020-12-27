import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthServiceZ } from '../../../authentification/auth-service.service';
import { LoginService } from "./../login.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  bg="./../../../../assets/img/backgrounds/bisos.png"

  submitted = false;
  success = false
  ErrorMsg = "";
  registerForm = this.fb.group({
    email: ['', [Validators.required, Validators.maxLength(50), Validators.pattern(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,10})+$/)]],
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    password: ['', Validators.required],
    tel: ['', [Validators.minLength(8), Validators.required]],
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
  register() {
    this.submitted = true
    if (this.registerForm.valid) {
      this.loginService.registerClient(this.registerForm.value).then(d => {
        this.submitted = false
        this.ErrorMsg = undefined
        this.success = true;
      }).catch(err => {
        this.ErrorMsg = err.error.message

      })
    }

  }
  ngOnInit(): void {
  }

}
