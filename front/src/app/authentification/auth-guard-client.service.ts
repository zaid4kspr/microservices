import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthServiceZ } from './auth-service.service';
import { SharedService } from './../shared/shared.service';

@Injectable({
  providedIn: 'root',
})
export class ClientAuthGuardService implements CanActivate {
  user
  constructor(
    public auth: AuthServiceZ,
    public router: Router,
    public authService: AuthServiceZ,
    public sharedService: SharedService
  ) {

    if(this.authService?.credentials?.user)
    this.sharedService.getMyProfile(this.authService.credentials.user._id).then(d => {
      this.user = d
    })

  }
  canActivate(): Promise<boolean> {


    return new Promise((resolve) => {
      if (!this.auth.isAuthenticated()) {
        this.router.navigate(['/auth/login']);
        resolve(false);

      }


      if (this.auth.credentials.user.userType == "User") {
        this.sharedService.getMyProfile(this.authService.credentials.user._id).then(d => {
          this.user = d

          if (d.business) {
            resolve(true);
          }
          else {
            this.router.navigate(['/stepOne/init']);
            resolve(false);
          }
        })
      }
    });
  }






}

