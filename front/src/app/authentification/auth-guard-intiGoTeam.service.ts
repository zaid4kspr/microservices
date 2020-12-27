import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthServiceZ } from './auth-service.service';
import { SharedService } from './../shared/shared.service';

@Injectable({
  providedIn: 'root',
})
export class IntiGoAuthGuardService implements CanActivate {
  constructor(
    public auth: AuthServiceZ,
    public router: Router,
    public authService: AuthServiceZ,
    public sharedService: SharedService
  ) { }

  canActivate(): Promise<boolean> {
    return new Promise((resolve) => {
      if (!this.auth.isAuthenticated()) {
        this.router.navigate(['/auth/login']);
        resolve(false);
      }
      if (this.auth.credentials.user.userType != "User" && this.auth.credentials.user.userType != "Driver") {

    

        resolve(true);
      }
      resolve(false);

    })


  }

}
