import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthServiceZ } from "./authentification/auth-service.service";




@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'front';

  showNAv = true

  constructor(public router: Router,
    private activeroute: ActivatedRoute,
    private authService: AuthServiceZ

  ) {
    if (!this.router.url.includes('auth')) {
      this.showNAv = false;

    }



  }

  ngOnInit(): void {





  }
}
