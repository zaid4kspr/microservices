import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { simpleAuthGuardService } from "./authentification/simpleAuthGuard";
const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () =>
      import('./pages/auth/auth.module').then((m) => m.AuthModule),
      canActivate: [simpleAuthGuardService]
  },

  {
    path: 'users',
    loadChildren: () =>
      import('./pages/users/users.module').then((m) => m.UsersModule),
      canActivate: [simpleAuthGuardService]
   
  },
 
{
    path: 'profile',
    loadChildren: () =>
      import('./pages/profile/profile.module').then((m) => m.ProfileModule),
      canActivate: [simpleAuthGuardService]
     

  },
 
  { path: '', pathMatch: 'full', children: [], canActivate: [simpleAuthGuardService] }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
