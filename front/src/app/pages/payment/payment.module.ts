import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PaymentRoutingModule } from './payment-routing.module';
import { MainPaymentComponent } from './main-payment/main-payment.component';
import { SharedModule } from "./../../shared/shared.module";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PaymentService } from "./payment.service";
import { PaymentSuccessComponent } from './payment-success/payment-success.component';
import { PaymentFailComponent } from './payment-fail/payment-fail.component';
import { EditClientsWalletComponent } from './edit-clients-wallet/edit-clients-wallet.component';
import { NgxPaginationModule } from 'ngx-pagination'; // <-- import the module
import { NgSelectModule } from '@ng-select/ng-select';


@NgModule({
  declarations: [MainPaymentComponent, PaymentSuccessComponent, PaymentFailComponent, EditClientsWalletComponent],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    PaymentRoutingModule,
    NgxPaginationModule,
    SharedModule,
    NgSelectModule
  ]

  , providers: [PaymentService]
})
export class PaymentModule { }
