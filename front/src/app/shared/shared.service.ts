import { Injectable } from '@angular/core';
import {
  HttpClient
} from '@angular/common/http';
import { environment } from './../../environments/environment';
import { AuthServiceZ } from './../authentification/auth-service.service';


@Injectable({
  providedIn: 'root'
})
export class SharedService {


  user
  itemsPerPage = 50
  constructor(private httpClient: HttpClient, private authServiceZ: AuthServiceZ) {
    this.getMyProfileNow();

    if (localStorage.getItem("itemsPerPage")) {
      this.itemsPerPage = parseInt(localStorage.getItem("itemsPerPage"))
    }



  }


  updateNumberOfItemPerPage() {
 
    localStorage.setItem("itemsPerPage", this.itemsPerPage + "")
  }



  getMyProfile(id): any {
    return this.httpClient
      .get(environment.api.user + '/users/' + this.authServiceZ.credentials.user._id + '/' + this.authServiceZ.credentials.user.userType)
      .toPromise()
     
  }

  getMyProfileNow(): any {
    if (this.authServiceZ.credentials) {
      return this.httpClient
        .get(environment.api.user + '/users/' + this.authServiceZ.credentials.user._id + '/' + this.authServiceZ.credentials.user.userType)
        .toPromise().then(d => {
          this.user = d
       

        })
    }
  }

  updateProfileUser(user): any {
    return this.httpClient
      .put(environment.api.user + "/users/" + user._id, user)
      .toPromise()
     
  }
  updateProfileAdmin(user): any {
    return this.httpClient
      .put(environment.api.user + "/admins/" + user._id, user)
      .toPromise()
     
  }

 
}
