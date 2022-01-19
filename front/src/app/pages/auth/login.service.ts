import { Injectable, EventEmitter } from '@angular/core';
import {
  HttpClient
} from '@angular/common/http';
import { environment } from './../../../environments/environment';


@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private httpClient: HttpClient) { }

  loginAdmin(loginBody: any, contactId: String = ''): any {
    return this.httpClient
      .post(environment.api.user + '/admins/login/', loginBody)
      .toPromise()
  };
  login(loginBody: any, contactId: String = ''): any {
    return this.httpClient
      .post(environment.api.user + '/users/login/', loginBody)
      .toPromise()
  }

  loginSocialUser(loginBody: any, contactId: String = ''): any {
    return this.httpClient
      .post(environment.api.user + '/users/sociallogin/', loginBody)
      .toPromise()
  }
  loginSocialAdmin(loginBody: any, contactId: String = ''): any {
    return this.httpClient
      .post(environment.api.user + '/admins/sociallogin/', loginBody)
      .toPromise()
  }

register(registerBody: any): any {
    return this.httpClient
      .post(environment.api.user + '/register/', registerBody)
      .toPromise()
      .catch(this.handleError);
  }
  registerWithLink(registerBody: any): any {
    return this.httpClient
      .post(environment.api.user + '/users/registration/', registerBody)
      .toPromise()
      .catch(this.handleError);
  }
  registerClient(registerBody: any): any {
    return this.httpClient
      .post(environment.api.user + '/users/partners/register', registerBody)
      .toPromise()
  
  }
  sendPasswordRecoveryRequest(registerBody: any): any {
    
    return this.httpClient
      .get(environment.api.user + '/reset/users/'+ registerBody.email)
      .toPromise()
  }
  verifRegisterToken(body: any): any {
    return this.httpClient
      .post(environment.api.user + '/users/inviteverification/', body)
      .toPromise()
      .catch(this.handleError);
  }  
  verifRegisterTokenV2(body: any): any {
    return this.httpClient
      .post(environment.api.user + '/users/partners/verification', body)
      .toPromise()
      .catch(this.handleError);
  }

  resetPasswordNow(body: any): any {
    return this.httpClient
      .post(environment.api.user + '/reset/users', body)
      .toPromise()

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
