import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainPaymentComponent } from './main-payment/main-payment.component';
import { PaymentSuccessComponent } from './payment-success/payment-success.component';
import { PaymentFailComponent } from './payment-fail/payment-fail.component';

import { IntiGoAuthGuardService } from './../../authentification/auth-guard-intiGoTeam.service';
import { ClientAuthGuardService } from './../../authentification/auth-guard-client.service';
import { EditClientsWalletComponent } from './edit-clients-wallet/edit-clients-wallet.component';


const routes: Routes = [
  {
    path: "buy",
    component: MainPaymentComponent,
    canActivate: [ClientAuthGuardService]
  }, {
    path: "success",
    component: PaymentSuccessComponent,
    canActivate: [ClientAuthGuardService]
  }, {
    path: "fail",
    component: PaymentFailComponent,
    canActivate: [ClientAuthGuardService]
  }, {
    path: "creditTransactions",
    component: EditClientsWalletComponent,
    canActivate: [IntiGoAuthGuardService]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PaymentRoutingModule { }
