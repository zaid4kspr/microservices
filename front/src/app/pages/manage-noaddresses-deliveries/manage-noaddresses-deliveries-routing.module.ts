import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainNoaddressesDeliveriesComponent } from "./main-noaddresses-deliveries/main-noaddresses-deliveries.component";
const routes: Routes = [
  {
    path: "",
    component: MainNoaddressesDeliveriesComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManageNoaddressesDeliveriesRoutingModule { }