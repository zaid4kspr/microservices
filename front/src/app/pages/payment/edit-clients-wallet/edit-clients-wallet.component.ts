import { Component, OnInit } from '@angular/core';
import { PaymentService } from "./../payment.service";
import { FormBuilder, Validators } from '@angular/forms';
import { AuthServiceZ } from "./../../../authentification/auth-service.service";

declare var $
@Component({
  selector: 'app-edit-clients-wallet',
  templateUrl: './edit-clients-wallet.component.html',
  styleUrls: ['./edit-clients-wallet.component.scss']
})
export class EditClientsWalletComponent implements OnInit {
  users = []
  creditTransactions = []
  total
  p = 1
  addCreditToUserForm
  submittedAdd = false
  clients = []
  pointsPatetrn = "^[0-9]+$";
  constructor(
    public paymentService: PaymentService,
    private fb: FormBuilder,
    private authService: AuthServiceZ,


  ) { }

  ngOnInit(): void {
    this.getAllClients()
    this.getCreditTransactions()
    this.addCreditToUserForm = this.fb.group({
      credit: [undefined, Validators.required],
      amount: [0, Validators.required],
      madeBy: ['', Validators.required],
      benefactor: [undefined, Validators.required],
      comment: [undefined, Validators.required],
      payment_token: ""
    });
  }


  getCreditTransactions() {
    var query = {}
    var populate = [{ "path": "madeBy" }, { "path": "benefactor" }]

    this.paymentService.getCreditTransaction(query, populate, this.p).then(d => {
      this.creditTransactions = d.body
      this.total = parseInt(d.headers.get('x-total-count'))

    })
  }


  onKey(ev) {

  }
  changePage($event) {
    this.p = $event
     

    this.getCreditTransactions();

  }
  getAllClients() {
    var filterBody = {
      group: null,
      name: "",
      page: 1
    }
    this.paymentService.getallClients().then(d => {
      this.clients = d.docs
    })
  }
  get e() { return this.addCreditToUserForm.controls; }
  addUser() {
    this.addCreditToUserForm.reset();
    $('#addModal').modal('show');

  }

  addIntiPoints() {
    this.submittedAdd = true;
    this.addCreditToUserForm.patchValue({
      madeBy: this.authService.credentials.user._id
    })
    this.paymentService.createTransactionFromAdmin(this.addCreditToUserForm.value).then(d => {
      this.p = 1
      this.getCreditTransactions()
      $('#addModal').modal('toggle');


    })
   

  }
}
