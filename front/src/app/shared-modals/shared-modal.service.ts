import { Injectable } from '@angular/core';
import {
  HttpClient
} from '@angular/common/http';
import { environment } from './../../environments/environment';

@Injectable()
export class SharedModalService {



  constructor(private httpClient: HttpClient) { }

  getJobRequestHistory(query, populate): any {
    return this.httpClient
      .get(environment.api.jobRequestHistory + "?sort=-createdAt&query=" + JSON.stringify(query) + "&populate=" + JSON.stringify(populate), { observe: 'response' })
      .toPromise()

  }
  getJobRequestActionHistory(query, populate): any {
    return this.httpClient
      .get(environment.api.serverUrl + "/ActionsHistory?sort=-createdAt&query=" + JSON.stringify(query) + "&populate=" + JSON.stringify(populate))
      .toPromise()

  }
  getAllpackingSlip(query, populate, page): any {
    var skip = (page - 1) * 10;
    var limit = 10;
    return this.httpClient
      .get(environment.api.packingSlip + "?sort=-updatedAt&query=" + query + "&populate=" + populate + '&skip=' + skip + "&limit=" + limit, { observe: 'response' })
      .toPromise()

  }
}
