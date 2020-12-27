import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthServiceZ } from './auth-service.service';
import { SharedService } from '../shared/shared.service';

@Injectable({
  providedIn: 'root',
})
export class CustomerServicesGuard implements CanActivate {
  constructor(
    public auth: AuthServiceZ,
    public router: Router,
    public authService: AuthServiceZ,
    public sharedService: SharedService
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    return new Promise((resolve) => {
      if (!this.auth.isAuthenticated()) {
        this.router.navigate(['/auth/login']);
        resolve(false);
      }

      let userServices = this.auth.credentials.user.services



      if (state.url.includes("livraison") && userServices.includes("2")) {
        resolve(true);

      }
      else if (state.url.includes("conciergerie") && userServices.includes("1")) {

        resolve(true);

      }
      else if (state.url.includes("express") && userServices.includes("3")) {
        resolve(true);

      } else {
        this.router.navigate(['/business'])
        resolve(false);
      }



    })


  }

}
