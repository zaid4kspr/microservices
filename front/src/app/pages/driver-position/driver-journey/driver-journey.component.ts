import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { SharedService } from "../../../shared/shared.service";

@Component({
  selector: 'main-driver-position',
  templateUrl: './driver-journey.component.html',
  styleUrls: ['./driver-journey.component.scss']
})
export class DriverJourneyComponent implements OnInit {
  latitude
  longitude
  zoom = 10
  journeyId
  iconFrom = {
    url: './../../../../assets/img/mapIcons/scooter.png',
    scaledSize: {
      width: 45,
      height: 45
    }
  }
  boxIconFrom = {
    url: './../../../../assets/img/mapIcons/secure.svg',
    scaledSize: {
      width: 35,
      height: 35
    }
  }
  latlng = [
    [
      23.0285312,
      72.5262336
    ],
    [
      19.0760,
      72.8777
    ],
    [
      25.2048,
      55.2708
    ]
  ];
  constructor(
    private activeroute: ActivatedRoute,
    private sharedService: SharedService,

  ) {

  }

  ngOnInit(): void {
    this.activeroute.params
      .subscribe(params => {
        this.journeyId = params.journeyId;
        this.getJourneyUpdates();
        setInterval(() => {
          this.getJourneyUpdates()

        }, 1000 * 60);


      })
    this.setCurrentPosition()

  }
  private setCurrentPosition() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;

      });
    }
  }

  dropOffs = []
  geoLocations = []
  getJourneyUpdates() {
    this.sharedService.getJourneyById({ driverJourney: this.journeyId })
      .then(d => {

        this.dropOffs = d.jobRequests.map(elt => elt.dropOff)
        this.geoLocations = [d.coordinates]
       
        // this.longitude = d[0].geoLocation.coordinates[0]
        // this.latitude = d[0].geoLocation.coordinates[1]
      })
  }


}
