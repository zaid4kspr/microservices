import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainDropOffAddressUpdateComponent } from './main-dropoff-address-update/main-dropoff-address-update.component';

const routes: Routes = [

{
  path:":jobRequest",
  component:MainDropOffAddressUpdateComponent
}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainDropOffAddressUpdateRoutingModule{ }
