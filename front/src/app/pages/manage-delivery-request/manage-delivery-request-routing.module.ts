import { Component, NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ManageDeliveryRequestMapComponent } from './manage-delivery-request-map/manage-delivery-request-map.component';
import {FilterDeliveryRequestsComponent} from "./filter-delivery-requests/filter-delivery-requests.component"
import { EditJobComponent } from "./edit-job/edit-job.component";

const routes: Routes = [
  {
    path: "fromMap/:jobType",
    component: ManageDeliveryRequestMapComponent
  }, {
    path: "filter",
    component: FilterDeliveryRequestsComponent
  }, {
    path: "edit",
    component: EditJobComponent
  }


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManageDeliveryRequestRoutingModule { }
