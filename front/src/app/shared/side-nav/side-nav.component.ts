import { Component, OnInit } from '@angular/core';
import { AuthServiceZ } from "./../../authentification/auth-service.service";
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss'],
})
export class SideNavComponent implements OnInit {
  constructor(
    public router: Router,
    public activeroute: ActivatedRoute,
    public authService: AuthServiceZ) { }

  ngOnInit(): void {

    // this.activeroute.params
    //   .subscribe(params => {
    //     

    //     if (this.authService.credentials.user.userType == "User" && this.router.url == "/") {
    //       // this.router.navigate(['/business'])
    //     } else if (this.router.url == "/") {
    //       this.router.navigate(['/manageConciergerie/list'])
    //     }

    //   })
  }


}
