import { Injectable } from '@angular/core';
import {
  HttpClient
} from '@angular/common/http';
import { environment } from './../../../environments/environment';

@Injectable()
export class UnsuceessfulDelivService {
  constructor(private httpClient: HttpClient) { }

  getAllThefailedDeliveryRequest(query, populate, page): any {


    var skip = (page - 1) * 10;
    var limit = 10;
    return this.httpClient
      .get(environment.api.deliveryRequest + "?sort=-updatedAt&query=" + query + "&populate=" + populate + '&skip=' + skip + "&limit=" + limit, { observe: 'response' })
      .toPromise()

  }

  updateDeliveryJobStatus(id, status): any {
    return this.httpClient
      .put(environment.api.deliveryRequest + "/updateStatus/" + id, { status })
      .toPromise()

  }
  processDeliveryRequest(reqBody): any {

    return this.httpClient
      .post(environment.api.deliveryRequest + "/unsuccessful/decide", reqBody)
      .toPromise()

  }


}
