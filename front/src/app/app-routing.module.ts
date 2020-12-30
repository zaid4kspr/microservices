import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MyRouterGuardService } from './authentification/routerGuard';
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
