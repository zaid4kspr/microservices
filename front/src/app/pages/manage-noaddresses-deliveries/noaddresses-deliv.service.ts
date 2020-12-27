import { Injectable } from '@angular/core';
import {
  HttpClient
} from '@angular/common/http';
import { environment } from './../../../environments/environment';

@Injectable()
export class NoaddressesDelivService {
  constructor(private httpClient: HttpClient) { }

   getAllpackingSlip(query, populate, page): any {
    var skip = (page - 1) * 10;
    var limit = 10;
    return this.httpClient
      .get(environment.api.packingSlip + "?sort=-updatedAt&query=" + query + "&populate=" + populate + '&skip=' + skip + "&limit=" + limit, { observe: 'response' })
      .toPromise()
  }
   getNoAddresspackingSlip(p): any {
    return this.httpClient
      .post(environment.api.packingSlip + "/noaddresses",{page: p })
      .toPromise()
  }

askUpdatePickUpAddress(data): any {
    return this.httpClient
      .get(environment.api.deliveryRequest + "/askupdatepickupaddress/" + data, { observe: 'response' })
      .toPromise()
  }
   askUpdateDropOffAddress(data): any {
    return this.httpClient
      .get(environment.api.deliveryRequest + "/askupdatedropoffaddress/" + data, { observe: 'response' })
      .toPromise()
  }


  processDeliveryRequest(reqBody): any {

    return this.httpClient
      .post(environment.api.deliveryRequest + "/unsuccessful/decide", reqBody)
      .toPromise()

  }


}
