import { Component, OnInit } from '@angular/core';
import { SharedService } from "./../../../shared/shared.service";
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { Location, Appearance } from '@angular-material-extensions/google-maps-autocomplete';

import PlaceResult = google.maps.places.PlaceResult;


@Component({
  selector: 'main-pickup-address-address',
  templateUrl: './main-pickup-address-update.component.html',
  styleUrls: ['./main-pickup-address-update.component.scss']
})
export class MainPickUpAddressUpdateComponent implements OnInit {

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
            pickUp: {
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
              pickUpAddress: "Position actuelle"
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

  get f() { return this.requestDelivery.controls; }

  creatRequestDeliveryForm() {

    this.requestDelivery = this.fb.group({
      pickUp: this.fb.group({
        exactPickUpAddress: [true],
        longitude: ['', Validators.required],
        latitude: ['', Validators.required],
        pickUpAddress: ['', Validators.required],
      })
    })
  }


  onDropOffAutocompleteSelected(result: PlaceResult) {
    this.requestDelivery.patchValue({
      pickUp: {
        pickUpAddress: result.name + ", " + result.formatted_address,
      }
    })
  }

  onDropOffLocationSelected(location: Location) {
    this.latitude = location.latitude;
    this.longitude = location.longitude;
    this.showMarker = true
    this.requestDelivery.patchValue({

      pickUp: {
        latitude: location.latitude,
        longitude: location.longitude
      },


    })


  }
  job
  showSuccessMsg = false
  shareMyPosition() {
    


    if (this.requestDelivery.valid) {
      this.sharedService.updatePickUpAddress(this.jobRequest, this.requestDelivery.value).then(d => {
        this.showSuccessMsg = true

      })
    }


  }

  dropOffInputChanged(event) {
     
    this.requestDelivery.patchValue({
      pickUp: {
        pickUpAddress: event.target.value
      }
    })
    if (event.target.value == "") {
      this.showMarker = false
      this.requestDelivery.patchValue({
        pickUp: {
          pickUpAddress: event.target.value,
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
