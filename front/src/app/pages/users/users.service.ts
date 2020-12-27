import { Injectable } from '@angular/core';
import {
  HttpClient
} from '@angular/common/http';
import { environment } from './../../../environments/environment';

@Injectable()
export class UsersService {

  constructor(private httpClient: HttpClient) { }

  getallUsers(userType, reqBody): any {
    return this.httpClient
      .post(environment.api.user + "/filter/users/"+userType, reqBody)
      .toPromise();
  }
  getAllBusiness(): any {
    return this.httpClient
      .get(environment.api.business)
      .toPromise();
  }
  sendInvitation(reqBody): any {
    return this.httpClient
      .post(environment.api.user + "/users/invitation", reqBody)
      .toPromise();
  }
  editUser(userType,user): any {
    return this.httpClient
      .put(environment.api.user + "/" +userType +"s/"+user._id, user)
      .toPromise();
  }

/*
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
*/

}
