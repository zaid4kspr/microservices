import { Component, OnInit, } from '@angular/core';
import { Location, Appearance } from '@angular-material-extensions/google-maps-autocomplete';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthServiceZ } from "./../../../authentification/auth-service.service";
import { SharedService } from "./../../../shared/shared.service";
import { Router } from '@angular/router';


import PlaceResult = google.maps.places.PlaceResult;
@Component({
  selector: 'app-main-business-step-one',
  templateUrl: './main-business-step-one.component.html',
  styleUrls: ['./main-business-step-one.component.scss']
})
export class MainBusinessStepOneComponent implements OnInit {
  public appearance = Appearance;
  public zoom: number;
  public latitude: number;
  public longitude: number;
  public selectedAddress: PlaceResult;


  submitted = false
  businessForm


  constructor(private fb: FormBuilder, private authService: AuthServiceZ,
    private sharedService: SharedService,
    private router: Router
  ) {

    this.businessForm = this.fb.group({
      nomCommercial: ['', Validators.required],
      longitude: [''],
      latitude: [''],
      registreCommerce: [''],
      raisonSociale: [''],
      matriculeFiscale: [''],
      contactEmail: ['', [Validators.maxLength(50), Validators.pattern(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,10})+$/)]],
      tel: ['', [Validators.minLength(8),Validators.required]],
      website: [''],
      address: [undefined, Validators.required],
      createdBy: [this.authService?.credentials?.user?._id, Validators.required],
    });

  }

  ngOnInit() {

    this.zoom = 15;
    this.latitude = undefined
    this.longitude = undefined

    // this.setCurrentPosition();

  }

  private setCurrentPosition() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.zoom = 12;
      });
    }
  }

  onAutocompleteSelected(result: PlaceResult) {
    this.businessForm.patchValue({
      address: result.name + ", " + result.formatted_address,
    })
  }

  onLocationSelected(location: Location) {
    this.latitude = location.latitude;
    this.longitude = location.longitude;
    this.businessForm.patchValue({
      latitude: location.latitude,
      longitude: location.longitude
    })
  }

  get f() { return this.businessForm.controls; }


  addBusiness() {
    this.submitted = true
    var localInfo = JSON.parse(localStorage.getItem('connectedAdmin'))
    if (this.businessForm.valid) {
      this.sharedService.addBusiness(this.businessForm.value).then(d => {
        localInfo.user["business"] = d._id
        localStorage.clear()
        
        localStorage.setItem('connectedAdmin', JSON.stringify(localInfo));
        this.submitted = false
        this.router.navigate(['/business'])

      }).catch(err => {
        console.log(err)
       // this.error = err.data;
    })
    }

  }


  addressInputChanged(event) {
    this.businessForm.patchValue({
        address: event.target.value
    })
    if (event.target.value == "") {
      this.businessForm.patchValue({
          address: event.target.value,
      })
    }
  }

}
