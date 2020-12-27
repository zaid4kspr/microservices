import { Component, OnInit,ChangeDetectorRef } from '@angular/core';
import { SharedService } from "./../../../shared/shared.service";
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { Location, Appearance } from '@angular-material-extensions/google-maps-autocomplete';

import PlaceResult = google.maps.places.PlaceResult;


@Component({
  selector: 'main-dropoff-address-address',
  templateUrl: './main-dropoff-address-update.component.html',
  styleUrls: ['./main-dropoff-address-update.component.scss']
})
export class MainDropOffAddressUpdateComponent implements OnInit {

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
    private cdr: ChangeDetectorRef


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
           // getGeoLocation(position.coords.latitude,position.coords.longitude)
          this.requestDelivery.patchValue({
            dropOff: {
              latitude: position.coords.latitude,
              longitude: position.coords.longitude
            },
          })
          this.showMarker = showMarker
        let geocoder = new google.maps.Geocoder();
        let latlng = {lat: position.coords.latitude, lng: position.coords.longitude};
            
            geocoder.geocode({ location: latlng }, (results, status) => {
            if (status == google.maps.GeocoderStatus.OK) {
                let result = results[0];
                let rsltAdrComponent = result.address_components;
                let resultLength = rsltAdrComponent.length;
                if (result != null) {
                    this.requestDelivery.patchValue({
                        dropOff: {
                        dropOffAddress: result["formatted_address"]
                        },
                    })
                        this.cdr.detectChanges()

                } else {
                    console.log("No address available!");
                }
            }
        });


        }
      });
    }
  }

      
    getGeoLocation(lat: number, lng: number) {
    if (navigator.geolocation) {
        let geocoder = new google.maps.Geocoder();
    }
};
    
    
  locateTheClient4MePlease() {
    this.setCurrentPosition(true);
    this.showmap = true

  }
    
  

  markerDrag(ev) {
    
    this.longitude = ev.latLng.lng()
    this.latitude = ev.latLng.lat()
        let geocoder = new google.maps.Geocoder();
        let latlng = {lat: this.latitude, lng: this.longitude};
            
            geocoder.geocode({ location: latlng }, (results, status) => {
            if (status == google.maps.GeocoderStatus.OK) {
                let result = results[0];
                     
                    this.requestDelivery.patchValue({
                        dropOff: {
                        dropOffAddress: result["formatted_address"]
                        },
                    })
                        this.cdr.detectChanges()

                } else {
                    console.log("No address available!");
                }
        });

  }

  get f() { return this.requestDelivery.controls; }

  creatRequestDeliveryForm() {

    this.requestDelivery = this.fb.group({
      dropOff: this.fb.group({
        exactDropOffAddress: [true],
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
  showSuccessMsg=false
  shareMyPosition() {
 

    if (this.requestDelivery.valid) {
      this.sharedService.updateDropOffAddress(this.jobRequest, this.requestDelivery.value).then(d => {
        this. showSuccessMsg=true
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
      this.showMarker=false
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
