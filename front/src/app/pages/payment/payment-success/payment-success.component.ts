import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PaymentService } from "./../payment.service";

import { AuthServiceZ } from "./../../../authentification/auth-service.service";
import { SharedService } from "./../../../shared/shared.service";

@Component({
  selector: 'app-payment-success',
  templateUrl: './payment-success.component.html',
  styleUrls: ['./payment-success.component.scss']
})
export class PaymentSuccessComponent implements OnInit {
  payment_token

  constructor(
    private PaymentService: PaymentService,
    private authService: AuthServiceZ,
    private activeRoute: ActivatedRoute,
    private sharedService: SharedService,
  ) { }

  ngOnInit(): void {
    this.activeRoute.queryParams.subscribe(params => {
      // this.payment_token = params['payment_token']
      let obj2Send = {
        payment_token: params['payment_token'],
        benefactor: this.authService.credentials.user._id
      }
      this.PaymentService.addCredit(obj2Send).then(d => {
        this.sharedService.getMyProfileNow()
      })
    });
  }

}
