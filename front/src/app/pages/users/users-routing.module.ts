import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainUsersComponent } from "./main-users/main-users.component";
import { LivreComponent } from "./livre/livre.component";
import { AdministratifComponent } from "./administratif/administratif.component";

const routes: Routes = [
  {
    path:'',
    component:MainUsersComponent
  } ,
  {
    path:'livre',
    component:LivreComponent
  },
  {
    path:'administratif',
    component:AdministratifComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
