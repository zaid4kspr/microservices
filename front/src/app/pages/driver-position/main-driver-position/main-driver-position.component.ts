import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { SharedService } from "./../../../shared/shared.service";

@Component({
  selector: 'app-main-driver-position',
  templateUrl: './main-driver-position.component.html',
  styleUrls: ['./main-driver-position.component.scss']
})
export class MainDriverPositionComponent implements OnInit {
  latitude
  longitude
  zoom = 15
  jobRequest
  iconFrom = {
    url: './../../../../assets/img/mapIcons/moto.svg',
    scaledSize: {
      width: 60,
      height: 60
    }
  }
  constructor(
    private activeroute: ActivatedRoute,
    private sharedService: SharedService,

  ) {

  }

  ngOnInit(): void {
    this.activeroute.params
      .subscribe(params => {
        this.jobRequest = params.jobRequest;
        this.getcurrentJobPosition();
        setInterval(() => {
          this.getcurrentJobPosition()

        }, 1000 * 15);


      })
    // this.setCurrentPosition()

  }
  private setCurrentPosition() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;

      });
    }
  }

  getcurrentJobPosition() {
    this.sharedService.getDriverPositionForAspeceficConciergerie({ jobRequest: this.jobRequest })
      .then(d => {
        this.longitude = d[0].geoLocation.coordinates[0]
        this.latitude = d[0].geoLocation.coordinates[1]
      })
  }


}
