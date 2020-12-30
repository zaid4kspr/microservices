import { Injectable } from '@angular/core';
import {
  HttpClient
} from '@angular/common/http';
import { environment } from './../../../environments/environment';

@Injectable()
export class UsersService {

  constructor(private httpClient: HttpClient) { }

  getallUsers(): any {
    return this.httpClient
      .get(environment.api.serverUrl + "/v1/services/service-etudiants/etudiants")
      .toPromise();
  } 
  
  getallTeacher(): any {
    return this.httpClient
      .get(environment.api.serverUrl + "/v1/services/service-enseignant/enseignants")
      .toPromise();
  } 
  getallAdministratif(): any {
    return this.httpClient
      .get(environment.api.serverUrl + "/v1/services/service-admins/admins")
      .toPromise();
  } 
   upadateStudent(id,body): any {
    return this.httpClient
      .put(environment.api.serverUrl + "/v1/services/service-etudiants/etudiants"+"?id="+id,body)
      .toPromise();
  } 
     upadateTeacher(id,body): any {
    return this.httpClient
      .put(environment.api.serverUrl + "/v1/services/service-enseignant/enseignants"+"?id="+id,body)
      .toPromise();
  } 
      upadateAdmin(id,body): any {
    return this.httpClient
      .put(environment.api.serverUrl + "/v1/services/service-admins/admins"+"?id="+id,body)
      .toPromise();
  } 
     deleteStudent(id): any {
    return this.httpClient
      .delete(environment.api.serverUrl + "/v1/services/service-etudiants/etudiants"+"?id="+id)
      .toPromise();
  }  
      deleteTeacher(id): any {
    return this.httpClient
      .delete(environment.api.serverUrl + "/v1/services/service-enseignant/enseignants"+"?id="+id)
      .toPromise();
  } 
     deleteAdmin(id): any {
    return this.httpClient
      .delete(environment.api.serverUrl + "/v1/services/service-admins/admins"+"?id="+id)
      .toPromise();
  } 
   addStudent(body): any {
    return this.httpClient
      .post(environment.api.serverUrl + "/v1/services/service-etudiants/etudiants",body)
      .toPromise();
  }
  addTeacher(body): any {
    return this.httpClient
      .post(environment.api.serverUrl + "/v1/services/service-enseignant/enseignants",body)
      .toPromise();
  } addAdmin(body): any {
    return this.httpClient
      .post(environment.api.serverUrl + "/v1/services/service-admins/admins",body)
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
