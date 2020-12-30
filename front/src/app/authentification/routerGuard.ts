import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthServiceZ } from './auth-service.service';
import { SharedService } from '../shared/shared.service';

@Injectable({
  providedIn: 'root',
})
export class MyRouterGuardService implements CanActivate {
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

 if (this.auth.credentials.user.userType == "Admin") {
        this.router.navigate(['/users'])
        resolve(true);
      } else {
        resolve(false);

      }
      resolve(false);

    })


  }

}
