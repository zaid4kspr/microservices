import { Injectable } from '@angular/core';
import {
  HttpClient
} from '@angular/common/http';
import { environment } from './../../../environments/environment';


@Injectable({
  providedIn: 'root',
})
export class ManageDeliveryService {

  constructor(private httpClient: HttpClient) { }

  getAllDeliveryRequest(query, populate, page): any {
    var skip = (page - 1) * 10;
    var limit = 10;
    return this.httpClient
      .get(environment.api.deliveryRequest + "?sort=-createdAt&query=" + JSON.stringify(query) + "&populate=" + JSON.stringify(populate) + '&skip=' + skip + "&limit=" + limit, { observe: 'response' })
      .toPromise()

  }
  generatePickUpPdf(ids): any {
    return this.httpClient
      .post(environment.api.serverUrl + "/generatepickuppdf", ids)
      .toPromise()

  }
  filterDeliveryRequestV1(query): any {

    return this.httpClient
      .post(environment.api.deliveryRequest + "/filter", query)
      .toPromise()

  }


  addDeliveryRequest(deliveryRequest): any {
    return this.httpClient
      .post(environment.api.deliveryRequest, deliveryRequest)
      .toPromise()

  }
  getStatsForAdmin(body): any {
    return this.httpClient
      .post(environment.api.serverUrl + "/stats/admin", body)
      .toPromise()

  }

  editPickUpJob(deliveryRequest): any {
    return this.httpClient
      .put(environment.api.deliveryRequest, deliveryRequest)
      .toPromise()

  }
  editLivraisonJob(deliveryRequest): any {
    return this.httpClient
      .put(environment.api.deliveryRequest + "/livraison", deliveryRequest)
      .toPromise()

  }

  filterDeliveryRequest(query): any {

    return this.httpClient
      .post(environment.api.deliveryRequest + "/filter/v2", query)
      .toPromise()

  }
  getHowMuchMoneyIOweIntigo(businessId): any {
  
      return this.httpClient
        .get(environment.api.serverUrl + "/deliveryrequest/partnerMoney/"+ businessId)
        .toPromise()

    
  }
  receivingMoneyFromDriver(query): any {

    return this.httpClient
      .post(environment.api.deliveryRequest + "/receivingMoneyFromDriver", query)
      .toPromise()

  }
  editGivingMoneyToClient(query): any {

    return this.httpClient
      .post(environment.api.deliveryRequest + "/sendingMoneyToClient", query)
      .toPromise()

  }
  getAvailableDriver4Delivery(): any {
    return this.httpClient
      .get(environment.api.user + "/drivers")
      .toPromise()

  }
  getAllDrivers(service): any {
    return this.httpClient
      .get(environment.api.user + "/alldrivers/" + service)
      .toPromise()

  }

  assignDriver2Delivery(deliveryRequests): any {
    return this.httpClient
      .post(environment.api.deliveryRequest + "/assign", deliveryRequests)
      .toPromise()

  }
  updateDeliveryRequestDriver(obj): any {
    return this.httpClient
      .post(environment.api.deliveryRequest + "/updateDriver", obj)
      .toPromise()

  }

  getAllTheDeliveryRequest(query, populate, page, itemsPerPage = 10): any {


    var skip = (page - 1) * itemsPerPage;
    var limit = itemsPerPage;
    return this.httpClient
      .get(environment.api.deliveryRequest + "?sort=-createdAt" + "&populate=" + populate + "&query=" + query + '&skip=' + skip + "&limit=" + limit, { observe: 'response' })
      .toPromise()

  }
  getAllTheDeliveryRequestHistory(query, populate, page, itemsPerPage = 10): any {


    var skip = (page - 1) * itemsPerPage;
    var limit = itemsPerPage;
    return this.httpClient
      .get(environment.api.jobRequestHistory + "?sort=-date" + "&populate=" + populate + "&query=" + query + '&skip=' + skip + "&limit=" + limit, { observe: 'response' })
      .toPromise()

  }
  filterAllTheDeliveryRequest(query): any {


    return this.httpClient
      .post(environment.api.deliveryRequest + "/filter/v2", query)
      .toPromise()

  }
  askUpdateDropOffAddress(data): any {
    return this.httpClient
      .get(environment.api.deliveryRequest + "/askupdatedropoffaddress/" + data, { observe: 'response' })
      .toPromise()
  }


  getAllTheClients(): any {


    return this.httpClient
      .get(environment.api.serverUrl + "/business")
      .toPromise()

  }
  updateDeliveryJobStatus(id, status): any {
    return this.httpClient
      .put(environment.api.deliveryRequest + "/updateStatus/" + id, { status })
      .toPromise()

  }

  getpackingSlip(query): any {

    return this.httpClient
      .get(environment.api.packingSlip + "?sort=-updatedAt&query=" + query)
      .toPromise()

  }

}
