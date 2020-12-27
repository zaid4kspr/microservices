import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterLinkComponent } from './register-link/register-link.component';
import { ResetPasswordRequestComponent } from './reset-password-request/reset-password-request.component';
import { ResetPasswordNowComponent } from './reset-password-now/reset-password-now.component';
import { RegisterComponent } from './register/register.component';
import { LoginAdminComponent } from './loginAdmin/login-admin.component';
import { VerifRegistrationTokenComponent } from './verif-registration-token/verif-registration-token.component';

const routes: Routes = [

  {
    path: 'login',
    component: LoginComponent
  }, {
    path: 'login/admin',
    component: LoginAdminComponent
  }, {
    path: 'resetPassword',
    component: ResetPasswordRequestComponent
  }, {
    path: 'resetPassword/:register_token',
    component: ResetPasswordNowComponent
  },
  {
    path: 'register/:userType/:register_token',
    component: RegisterLinkComponent
  },  {
    path: 'verifAccount/:register_token',
    component: VerifRegistrationTokenComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
