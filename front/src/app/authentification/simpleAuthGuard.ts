import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthServiceZ } from './auth-service.service';
import { SharedService } from '../shared/shared.service';

@Injectable({
  providedIn: 'root',
})
export class simpleAuthGuardService implements CanActivate {
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
      }else{
        resolve(true);

      }




    })


  }

}
