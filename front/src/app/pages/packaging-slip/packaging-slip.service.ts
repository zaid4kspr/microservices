import { Injectable } from '@angular/core';
import {
  HttpClient
} from '@angular/common/http';
import { environment } from './../../../environments/environment';


@Injectable({
  providedIn: 'root',

})
export class PackagingSlipService {

  constructor(private httpClient: HttpClient) { }
  getAllpackingSlip(query, populate, page,itemsPerPage=10): any {
    var skip = (page - 1) * itemsPerPage;
    var limit = itemsPerPage;
    return this.httpClient
      .get(environment.api.packingSlip + "?sort=-updatedAt&query=" + query + "&populate=" + populate + '&skip=' + skip + "&limit=" + limit, { observe: 'response' })
      .toPromise()

  }
}
