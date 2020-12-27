import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainUsersComponent } from "./main-users/main-users.component";
const routes: Routes = [
  {
    path:'',
    component:MainUsersComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
