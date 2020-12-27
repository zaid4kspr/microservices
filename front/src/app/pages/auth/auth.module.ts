import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegisterLinkComponent } from './register-link/register-link.component';


import { SharedModule } from "./../../shared/shared.module";
import { ResetPasswordRequestComponent } from './reset-password-request/reset-password-request.component';
import { ResetPasswordNowComponent } from './reset-password-now/reset-password-now.component';
import { RegisterComponent } from './register/register.component';
import { LoginAdminComponent } from './loginAdmin/login-admin.component';
import { VerifRegistrationTokenComponent } from './verif-registration-token/verif-registration-token.component';
@NgModule({
  declarations: [LoginComponent, RegisterLinkComponent, ResetPasswordRequestComponent, ResetPasswordNowComponent, RegisterComponent, LoginAdminComponent, VerifRegistrationTokenComponent],
  imports: [
    CommonModule,
    AuthRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule
  ],
  providers: [

  ]
})
export class AuthModule { }
