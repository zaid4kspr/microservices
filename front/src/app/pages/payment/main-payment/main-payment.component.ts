import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { PaymentService } from "./../payment.service";
import { environment } from 'src/environments/environment';
import { AuthServiceZ } from "./../../../authentification/auth-service.service";

@Component({
  selector: 'app-main-payment',
  templateUrl: './main-payment.component.html',
  styleUrls: ['./main-payment.component.scss']
})
export class MainPaymentComponent implements OnInit {
  submitted = false;
  token = ""
  paymentUrl = ""
  frontEndUrl = ""
  pointsForm: FormGroup;
  actionUrl
  constructor(private fb: FormBuilder, private PaymentService: PaymentService, private authService: AuthServiceZ,
  ) {


  }

  ngOnInit(): void {

    let payment_token
    let transaction
    this.paymentUrl = environment.api.payment
    this.frontEndUrl = environment.api.frontEndUrl
    this.actionUrl = environment.api.payment
 
    this.createBuyPointsForm();
  }
  pointsPatetrn = "^[0-9]+$";

  createBuyPointsForm() {
    this.pointsForm = this.fb.group({
      points: [1, [Validators.required, Validators.min(1)]],


    });

  }
  pay() {
    if (this.pointsForm.valid) {
      var payObj = {
        "points": this.pointsForm.controls.points.value,
        "amount": this.pointsForm.controls.points.value * 7,
        "vendor": environment.paymentVendor,
        "note": "Commande"

      }
      this.PaymentService.getToken(payObj).then(result => {

        this.token = result.token
        let savedTransactionObject = {
          "credit": this.pointsForm.controls.points.value,
          "amount": this.pointsForm.controls.points.value * 7,
          "madeBy": this.authService.credentials.user._id,
          "benefactor": this.authService.credentials.user._id,
          "payment_token": result.token
        }
        this.PaymentService.createTransaction(savedTransactionObject).then(d => {
          setTimeout(() => {
            document.getElementById('payBtn').click();
          }, 1000);
        })


      })
    }
  }
  get f() { return this.pointsForm.controls; }


}
