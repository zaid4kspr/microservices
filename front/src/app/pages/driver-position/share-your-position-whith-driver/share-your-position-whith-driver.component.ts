import { Component, OnInit } from '@angular/core';
import { SharedService } from "./../../../shared/shared.service";
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { Location, Appearance } from '@angular-material-extensions/google-maps-autocomplete';

import PlaceResult = google.maps.places.PlaceResult;


@Component({
  selector: 'app-share-your-position-whith-driver',
  templateUrl: './share-your-position-whith-driver.component.html',
  styleUrls: ['./share-your-position-whith-driver.component.scss']
})
export class ShareYourPositionWhithDriverComponent implements OnInit {

  showMarker = false
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
  iconTo = {
    url: './../../../../assets/img/mapIcons/map.png',
    scaledSize: {
      width: 30,
      height: 30
    }
  }
  submitted = false
  requestDelivery
  constructor(
    private activeroute: ActivatedRoute,
    private sharedService: SharedService,
    private fb: FormBuilder,

  ) {

  }

  ngOnInit(): void {
    this.creatRequestDeliveryForm()
    this.activeroute.params
      .subscribe(params => {

        this.jobRequest = params.jobRequest;
        this.getDeliveryInfo()
        // this.getcurrentJobPosition();
      })
    this.setCurrentPosition()

  }
  showInput = true
  private setCurrentPosition(showMarker = false) {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.requestDelivery.reset()
        if (showMarker) {

          this.requestDelivery.patchValue({
            dropOff: {
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
              dropOffAddress: "Position actuelle"
            },
          })
          this.showMarker = showMarker

        }

      });
    }
  }

  locateTheClient4MePlease() {
    this.setCurrentPosition(true);
    this.showmap = true

  }

  markerDrag(ev) {

    this.longitude = ev.coords.lng
    this.latitude = ev.coords.lat

  }

  getcurrentJobPosition() {
    this.sharedService.getDriverPositionForAspeceficConciergerie({ jobRequest: this.jobRequest })
      .then(d => {
        this.longitude = d[0].geoLocation.coordinates[0]
        this.latitude = d[0].geoLocation.coordinates[1]
      })
  }

  get f() { return this.requestDelivery.controls; }

  creatRequestDeliveryForm() {

    this.requestDelivery = this.fb.group({
      dropOff: this.fb.group({
        longitude: ['', Validators.required],
        latitude: ['', Validators.required],
        dropOffAddress: ['', Validators.required],
      })
    })
  }


  onDropOffAutocompleteSelected(result: PlaceResult) {
    this.requestDelivery.patchValue({
      dropOff: {
        dropOffAddress: result.name + ", " + result.formatted_address,
      }
    })
  }

  onDropOffLocationSelected(location: Location) {
    this.latitude = location.latitude;
    this.longitude = location.longitude;
    this.showMarker = true
    this.requestDelivery.patchValue({

      dropOff: {
        latitude: location.latitude,
        longitude: location.longitude
      },


    })


  }
  job
  showSuccessMsg = false
  getDeliveryInfo() {
    this.sharedService.getDeliveryRequest(this.jobRequest).then(d => {
      this.job = d[0]
    

    })
  }
  shareMyPosition() {


    if (this.requestDelivery.valid) {
      this.sharedService.updatejobDropOffPosition(this.jobRequest, this.requestDelivery.value).then(d => {
        this.job.dropOff.dropOffAddress = "aaaa"
        this.showSuccessMsg = true
        this.showmap = false

      })
    }


  }

  dropOffInputChanged(event) {

    this.requestDelivery.patchValue({
      dropOff: {
        dropOffAddress: event.target.value
      }
    })
    if (event.target.value == "") {
      this.showMarker = false
      this.requestDelivery.patchValue({
        dropOff: {
          dropOffAddress: event.target.value,
          longitude: '',
          latitude: '',
          _id: '',
          name: ''
        }
      })

    }

  }

  showmap = false
  showMap() {
    this.showmap = true;
  }
}
