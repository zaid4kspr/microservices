import { Injectable } from '@angular/core';
import {
  HttpClient
} from '@angular/common/http';
import { environment } from './../../../environments/environment';
@Injectable()
export class GroupsService {
  
  
    constructor(private httpClient: HttpClient) {}


    getMySubGroup(): any {
      return this.httpClient
        .get(environment.api.group + '/subGroups')
        .toPromise()
        .catch(this.handleError);
    }

    addGroup(group): any {
      return this.httpClient
      .post(environment.api.group ,group)
      .toPromise()
      .catch(this.handleError);
    }
     editGroup(group): any {
      return this.httpClient
      .put(environment.api.group +"/"+ group._id,group)
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
