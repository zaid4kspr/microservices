import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainProfileComponent } from './main-profile/main-profile.component';

const routes: Routes = [
 
  {
    path: '',
    component: MainProfileComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule { }
