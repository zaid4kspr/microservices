import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainPermissionComponent } from "./main-permission/main-permission.component";
const routes: Routes = [

{
  path:"",
  component:MainPermissionComponent
}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PermissionRoutingModule { }
