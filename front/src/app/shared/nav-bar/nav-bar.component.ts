import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthServiceZ } from './../../authentification/auth-service.service';
import { SocialAuthService } from "angularx-social-login";
import { TranslateService } from '@ngx-translate/core';
import { SharedService } from "./../shared.service";
declare var $
@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
})
export class NavBarComponent implements OnInit {
  notifications = []
  user
  constructor(
    private authenticationService: AuthServiceZ,
    private router: Router,
    private authService: SocialAuthService,
    public translate: TranslateService,
    public sharedService: SharedService

  ) {
    translate.addLangs(['en', 'fr']);

    if (localStorage && localStorage.getItem('locale')) {
      const browserLang = localStorage.getItem('locale');
      translate.use(browserLang.match(/en|fr/) ? browserLang : 'fr');
    } else {
      localStorage.setItem('locale', 'fr');
      translate.setDefaultLang('fr');
    }



  }

  ngOnInit(): void {

    this.sharedService.getMyProfileNow();

  }


  changeLang(language: string) {

    localStorage.setItem('locale', language);
    this.translate.use(language);




  }

  logout() {

    this.authService.signOut(true);
    localStorage.clear();
    this.router.navigate(['/auth/login']);
    
    location.reload();


  }

  onScroll() {
   }




}
