import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainUnsuccessfulDeliveriesComponent } from "./main-unsuccessful-deliveries/main-unsuccessful-deliveries.component";
const routes: Routes = [
  {
    path: "",
    component: MainUnsuccessfulDeliveriesComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManageUnsuccessfulDeliveriesRoutingModule { }
