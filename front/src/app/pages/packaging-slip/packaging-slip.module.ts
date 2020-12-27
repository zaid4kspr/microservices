import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PackagingSlipRoutingModule } from './packaging-slip-routing.module';
import { MainPackagingSlipComponent } from './main-packaging-slip/main-packaging-slip.component';
import { SharedModule } from "./../../shared/shared.module";
import { PackagingSlipService } from "./packaging-slip.service";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgxPaginationModule } from 'ngx-pagination'; // <-- import the module
import { SharedModalsModule } from "./../../shared-modals/shared-modals.module";
@NgModule({
  declarations: [MainPackagingSlipComponent],
  imports: [
    CommonModule,
    PackagingSlipRoutingModule,
    SharedModule,
    NgxPaginationModule,
    SharedModalsModule,
    FormsModule, ReactiveFormsModule

  ],
  providers: [PackagingSlipService]
})
export class PackagingSlipModule { }
