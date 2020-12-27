import { Component, OnInit, } from '@angular/core';
import { Location, Appearance } from '@angular-material-extensions/google-maps-autocomplete';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthServiceZ } from "./../../../authentification/auth-service.service";
import { SharedService } from "./../../../shared/shared.service";
import { Router } from '@angular/router';


import PlaceResult = google.maps.places.PlaceResult;
@Component({
  selector: 'app-main-profile',
  templateUrl: './main-profile.component.html',
  styleUrls: ['./main-profile.component.scss']
})
export class MainProfileComponent implements OnInit {
  public appearance = Appearance;
  public zoom: number;
  public latitude: number;
  public longitude: number;
  public selectedAddress: PlaceResult;

  errorPMsg
  successPMsg
  errorBMsg
  successBMsg
  submittedBusiness = false
  submittedProfile = false
  apiKey
  id
  apiSuccess
  apiError
  businessForm
  userForm
  user
  constructor(private fb: FormBuilder, private authService: AuthServiceZ,
    private sharedService: SharedService,
    private router: Router
  ) {

    this.userForm = this.fb.group({
      _id: [''],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.maxLength(50), Validators.pattern(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,10})+$/)]],
      tel: ['', [Validators.minLength(8), Validators.required]],
      password: ['']
    });

    this.businessForm = this.fb.group({
      _id: [''],
      nomCommercial: ['', Validators.required],
      longitude: [''],
      latitude: [''],
      registreCommerce: [''],
      raisonSociale: [''],
      matriculeFiscale: [''],
      contactEmail: ['', [Validators.maxLength(50), Validators.pattern(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,10})+$/)]],
      tel: ['', [Validators.minLength(8), Validators.required]],
      website: [''],
      address: [undefined, Validators.required],
      createdBy: [this.authService?.credentials?.user?._id, Validators.required],
    });



  }

  ngOnInit() {

    this.zoom = 15;
    this.latitude = undefined
    this.longitude = undefined
    this.sharedService.getMyProfile("").then(res => {
      this.user = res;
      this.userForm.patchValue({
        _id: this.user._id,
        firstName: this.user.firstName,
        lastName: this.user.lastName,
        email: this.user.email,
        tel: this.user.tel
      })
      if (this.user.userType === "User") {
        this.sharedService.getBusiness(this.user.business).then(resb => {
        
          this.businessForm.patchValue(resb)
          this.apiKey = resb.apiKey;
          this.id = resb._id;

        })
      }
    })

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
  get p() { return this.userForm.controls; }


  updateProfile() {
    this.submittedProfile = true
    if (this.userForm.valid) {
      if (this.userForm.value.password === "")
        delete this.userForm.value.password;
      if (this.user.userType === "User") {
        this.sharedService.updateProfileUser(this.userForm.value).then(d => {
          this.submittedProfile = false
          this.successPMsg = "Les informations de votre profil ont été mises à jour avec succès."
        }).catch(err => {
          this.errorPMsg = "Une erreur s'est produite. Veuillez essayer plus tard ou contactez-nous."
          this.submittedProfile = false

        })
      }
      else if (this.user.userType === "Admin") {
        this.sharedService.updateProfileAdmin(this.userForm.value).then(d => {
          this.submittedProfile = false
          this.successPMsg = "Les informations de votre profil ont été mises à jour avec succès."
        }).catch(err => {
          this.errorPMsg = "Une erreur s'est produite. Veuillez essayer plus tard ou contactez-nous."
          this.submittedProfile = false

        })
      }
    } 
  }

  updateBusiness() {
    this.submittedBusiness = true
    if (this.businessForm.valid) {
       this.sharedService.updateBusiness(this.businessForm.value).then(d => {
        this.submittedBusiness = false
        this.successBMsg = "Les informations de votre Business ont été mises à jour."
      }).catch(err => {
        this.errorBMsg = "Une erreur s'est produite. Veuillez utiliser un autre nom commercial ou contactez-nous."
        this.submittedBusiness = false
      })
    }
  }

updateApiKey(){

this.sharedService.updateApiKey(this.id).then(d =>{
                   this.apiKey = d.apiKey;
                  this.apiSuccess = "Clé Api régénérée!"
                  }).catch(d=>{
                  this.apiError = "Une erreur s'est produite! Merci de nous avoir contactés pour résoudre ce problème!"                  
                  })

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
