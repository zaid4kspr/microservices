import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from "./../../../environments/environment";

@Injectable()
export class PaymentService {
  constructor(private httpClient: HttpClient) { }

  getToken(obj): any {
     

    const headers = new HttpHeaders({
      'Authorization': "Token " + environment.paymentApiKey
      ,
      'Content-Type': 'application/json'
    });
    return this.httpClient
      .post(environment.api.payment + "/api/OPRequest/", obj, { headers: headers })
      .toPromise()

  }
  createTransaction(obj): any {
    return this.httpClient
      .post(environment.api.userFromBackend + "/createTransaction/", obj)
      .toPromise()

  }
  createTransactionFromAdmin(obj): any {
    return this.httpClient
      .post(environment.api.userFromBackend + "/createTransactionFromAdmin/", obj)
      .toPromise()

  }
  addCredit(obj): any {
    return this.httpClient
      .post(environment.api.userFromBackend + "/addCredit/", obj)
      .toPromise()

  }
  transactionFailed(obj): any {
    return this.httpClient
      .post(environment.api.userFromBackend + "/transactionFailed/", obj)
      .toPromise()

  }
  getCreditTransaction(query, populate, page): any {

    var skip = (page - 1) * 10;
    var limit = 10;

    return this.httpClient
      .get(environment.api.serverUrl + "/creditTransactions" + "?sort=-createdAt&query=" + JSON.stringify(query) + "&populate=" + JSON.stringify(populate) + '&skip=' + skip + "&limit=" + limit, { observe: 'response' })
      .toPromise()
  }

  getallClients(): any {
    return this.httpClient
      .get(environment.api.userFromBackend + "/all/clients")
      .toPromise()

  }



}
