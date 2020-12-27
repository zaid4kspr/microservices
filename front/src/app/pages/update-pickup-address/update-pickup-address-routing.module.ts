import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainPickUpAddressUpdateComponent } from './main-pickup-address-update/main-pickup-address-update.component';

const routes: Routes = [

{
  path:":jobRequest",
  component:MainPickUpAddressUpdateComponent
}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainPickUpAddressUpdateRoutingModule{ }
