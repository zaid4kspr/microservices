import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManageUnsuccessfulDeliveriesRoutingModule } from './manage-unsuccessful-deliveries-routing.module';
import { MainUnsuccessfulDeliveriesComponent } from './main-unsuccessful-deliveries/main-unsuccessful-deliveries.component';
import { SharedModule } from "./../../shared/shared.module";
import { UnsuceessfulDelivService } from "./../manage-unsuccessful-deliveries/unsuceessful-deliv.service";
import {NgxPaginationModule} from 'ngx-pagination'; // <-- import the module


@NgModule({
  declarations: [MainUnsuccessfulDeliveriesComponent],
  imports: [
    CommonModule,
    SharedModule,
    NgxPaginationModule,
    ManageUnsuccessfulDeliveriesRoutingModule
  ],
  providers: [UnsuceessfulDelivService]
})
export class ManageUnsuccessfulDeliveriesModule { }
