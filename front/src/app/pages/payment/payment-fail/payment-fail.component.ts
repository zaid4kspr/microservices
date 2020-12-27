import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PaymentService } from "./../payment.service";

import { AuthServiceZ } from "./../../../authentification/auth-service.service";

@Component({
  selector: 'app-payment-fail',
  templateUrl: './payment-fail.component.html',
  styleUrls: ['./payment-fail.component.scss']
})
export class PaymentFailComponent implements OnInit {

  constructor(private PaymentService: PaymentService,
    private authService: AuthServiceZ,
    private activeRoute: ActivatedRoute) { }




  ngOnInit(): void {
    this.activeRoute.queryParams.subscribe(params => {
      // this.payment_token = params['payment_token']
      let obj2Send = {
        payment_token: params['payment_token'],
        benefactor: this.authService.credentials.user._id
      }
      this.PaymentService.transactionFailed(obj2Send).then(d => {

      })
    });
  }

}
