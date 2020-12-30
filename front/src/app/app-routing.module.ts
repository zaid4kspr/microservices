import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IntiGoAuthGuardService } from './authentification/auth-guard-intiGoTeam.service';
import { ClientAuthGuardService } from './authentification/auth-guard-client.service';
import { MyRouterGuardService } from './authentification/routerGuard';
import { simpleAuthGuardService } from "./authentification/simpleAuthGuard";
const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () =>
      import('./pages/auth/auth.module').then((m) => m.AuthModule),
  },

  {
    path: 'users',
    loadChildren: () =>
      import('./pages/users/users.module').then((m) => m.UsersModule),
   
  },
 
{
    path: 'profile',
    loadChildren: () =>
      import('./pages/profile/profile.module').then((m) => m.ProfileModule),
     

  },
 
  { path: '', pathMatch: 'full', children: [], canActivate: [MyRouterGuardService] }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
