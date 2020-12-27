import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainPackagingSlipComponent } from './main-packaging-slip/main-packaging-slip.component';

const routes: Routes = [
  {
    path: "",
    component: MainPackagingSlipComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PackagingSlipRoutingModule { }
