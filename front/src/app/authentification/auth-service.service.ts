import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { Observable, of, throwError } from 'rxjs';
//import { ApiService } from './../core/http/api.service';
import { Inject, PLATFORM_ID, EventEmitter } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
export interface LoginContext {
  username: string;
  password: string;
  remember?: boolean;
}

const credentialsKey = 'connectedAdmin';

@Injectable({
  providedIn: 'root',
})
export class AuthServiceZ {
  loginEvent = new EventEmitter();

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private http: HttpClient
  ) {
    if (isPlatformBrowser(this.platformId)) {
      const savedCredentials =
        sessionStorage.getItem(credentialsKey) ||
        localStorage.getItem(credentialsKey);
      if (savedCredentials) {
        this._credentials = JSON.parse(savedCredentials);
      }
    }
  }

  getToken() {
    JSON.parse(localStorage.getItem('connectedAdmin')).token;
  }

  refreshMyInfo(credentials) {
    if (isPlatformBrowser(this.platformId)) {
      var temp = JSON.parse(localStorage.connectedAdmin);
      temp.user = credentials;
      localStorage.setItem(credentialsKey, JSON.stringify(temp));
      this.loginEvent.emit(temp);
    }
  }

  public isLoggedIn(): any {
    if (isPlatformBrowser(this.platformId)) {
      let YOUCANPASS = false;
      if (localStorage.getItem('token') != null) {
        YOUCANPASS = true;
      }
      return YOUCANPASS;
    }
  }

  isLoggedOut() {
    return !this.isLoggedIn();
  }

  private _credentials: any;

  /**
   * Logs out the user and clear credentials.
   * @return {Observable<boolean>} True if the user was logged out successfully.
   */
  logout(): Observable<boolean> {
    // Customize credentials invalidation here
    this.setCredentials();
    return of(true);
  }

  /**
   * Checks is the user is authenticated.
   * @return {boolean} True if the user is authenticated.
   */
  isAuthenticated(): boolean {
    return this.credentials;
  }

  /**
   * Gets the user credentials.
   * @return {Credentials} The user credentials or null if the user is not authenticated.
   */
  get credentials(): any {
    return this._credentials;
  }

  /**
   * Sets the user credentials.
   * The credentials may be persisted across sessions by setting the `remember` parameter to true.
   * Otherwise, the credentials are only persisted for the current session.
   * @param {Credentials=} credentials The user credentials.
   * @param {boolean=} remember? True to remember credentials across sessions.
   */
  public setCredentials(credentials?: any, remember?: boolean) {
    if (isPlatformBrowser(this.platformId)) {
      this._credentials = credentials || null;
   
      if (credentials) {
        this.loginEvent.emit(credentials);
        const storage = remember ? localStorage : sessionStorage;
        storage.setItem(credentialsKey, JSON.stringify(credentials));
      } else {
        sessionStorage.removeItem(credentialsKey);
        localStorage.removeItem(credentialsKey);
      }
    }
  }
  parseJwt(token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
  };
  private handleError(error: Response | any) {
    let errMsg: string;
    if (error instanceof Response) {
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
