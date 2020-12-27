import { Injectable } from '@angular/core';
import {
  HttpClient
} from '@angular/common/http';
import { environment } from './../../../environments/environment';

@Injectable()
export class ConciergerieService {

  constructor(private httpClient: HttpClient) { }
  getAllTheConciergerieRequest(query, populate, page,itemsPerPage=10): any {


    var skip = (page - 1) * itemsPerPage;
    var limit = itemsPerPage;
    return this.httpClient
      .get(environment.api.conciergerieRequest + "?sort=-createdAt&query=" + query + "&populate=" + populate + '&skip=' + skip + "&limit=" + limit, { observe: 'response' })
      .toPromise()
      .catch(this.handleError);
  }

  getMyDrivers(): any {
    return this.httpClient
      .post(environment.api.user + "/all", {})
      .toPromise()
      .catch(this.handleError);
  }


  getAvailableDriver(conciergerieRequest): any {
    return this.httpClient
      .post(environment.api.workingDay + "/available", {
        conciergerieRequest: conciergerieRequest
      })
      .toPromise()
      .catch(this.handleError);
  }

  getDriversWorkingHours(reqBody): any {
    return this.httpClient
      .post(environment.api.workingDay + "/analytics", reqBody)
      .toPromise()
      .catch(this.handleError);
  }
  assignDriverToRequest(reqObj): any {
    return this.httpClient
      .post(environment.api.workingDay, reqObj)
      .toPromise()
      .catch(this.handleError);
  }
  updateDriverInConciergerieRequest(reqObj): any {
    return this.httpClient
      .put(environment.api.workingDay, reqObj)
      .toPromise()
      .catch(this.handleError);
  }


  getMyPickUpPoints(query): any {
    return this.httpClient
      .get(environment.api.pickUp + "?query=" + query)
      .toPromise()
      .catch(this.handleError);
  }
  addconciergerieRequest(conciergerieRequest): any {
    return this.httpClient
      .post(environment.api.conciergerieRequest, conciergerieRequest)
      .toPromise()
      .catch(this.handleError);
  }
  declineJobRequestByAnAdmin(id, obj): any {
    return this.httpClient
      .put(environment.api.jobRequest + "/" + id, obj)
      .toPromise()
      .catch(this.handleError);
  }
  private handleError(error: Response | any) {
    let errMsg: string;
    if (error instanceof Response || error) {
      const body = error.json() || '';
      const err = JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Promise.reject(errMsg);
  }
}
