import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManageNoaddressesDeliveriesRoutingModule } from './manage-noaddresses-deliveries-routing.module';
import { MainNoaddressesDeliveriesComponent } from './main-noaddresses-deliveries/main-noaddresses-deliveries.component';
import { SharedModule } from "./../../shared/shared.module";
import { NoaddressesDelivService } from "./../manage-noaddresses-deliveries/noaddresses-deliv.service";
import {NgxPaginationModule} from 'ngx-pagination'; // <-- import the module


@NgModule({
  declarations: [MainNoaddressesDeliveriesComponent],
  imports: [
    CommonModule,
    SharedModule,
    NgxPaginationModule,
    ManageNoaddressesDeliveriesRoutingModule
  ],
  providers: [NoaddressesDelivService]
})
export class ManageNoaddressesDeliveriesModule { }
