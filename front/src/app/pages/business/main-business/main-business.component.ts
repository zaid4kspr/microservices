import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthServiceZ } from "./../../../authentification/auth-service.service";
import { BusinessService } from "./../business.service";
import PlaceResult = google.maps.places.PlaceResult;

declare var $: any
@Component({
  selector: 'app-main-business',
  templateUrl: './main-business.component.html',
  styleUrls: ['./main-business.component.scss']
})

export class MainBusinessComponent implements OnInit {


  myStats


  constructor(private fb: FormBuilder,
    public authService: AuthServiceZ,
    private businessService: BusinessService) {

  }

  ngOnInit(): void {
    this.businessService.getStats().then(d => {
      this.myStats = d
    })
  }



}
