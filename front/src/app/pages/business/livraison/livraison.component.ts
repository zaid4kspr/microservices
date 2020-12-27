import { Component, OnInit } from '@angular/core';

import { Location, Appearance } from '@angular-material-extensions/google-maps-autocomplete';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthServiceZ } from "./../../../authentification/auth-service.service";
import { BusinessService } from "./../business.service";
import { Router, ActivatedRoute } from "@angular/router";
import { SharedService } from "./../../../shared/shared.service";
import PlaceResult = google.maps.places.PlaceResult;
import { isNgTemplate } from '@angular/compiler';
declare var $: any

@Component({
  selector: 'app-livraison',
  templateUrl: './livraison.component.html',
  styleUrls: ['./livraison.component.scss']
})
export class LivraisonComponent implements OnInit {
  submitted = false
  zoom = 8
  latitude
  longitude
  showAmount = false
  today = new Date()
  tomorrow = new Date(this.today.setDate(this.today.getDate() + 1))
  D = this.tomorrow.toLocaleDateString().split("/");
  setTomorrow
  datePickerConfig = {
    locale: "fr",
    firstDayOfWeek: "mo",
    format: "YYYY-MM-DD",
    min: this.tomorrow.toISOString()
  }
  pname
  pnameError = false;
  requestDelivery
  public selectedAddress: PlaceResult;
  pickUpSelectInput
  pickUpForm
  boxSize = [1, 0, 0, 0, 0];
  oldPickUpPoints = [];
  showNewPickUpInputField = false;
  gouvernorats = []
  selectedDivision = 0
  disableSendBtn = false

  iconFrom = {
    url: './../../../../assets/img/mapIcons/marker.png',
    scaledSize: {
      width: 30,
      height: 30
    }
  }
  iconTo = {
    url: './../../../../assets/img/mapIcons/map.png',
    scaledSize: {
      width: 30,
      height: 30
    }
  }





  constructor(
    private fb: FormBuilder,
    private authService: AuthServiceZ,
    private businessService: BusinessService,
    private router: Router,
    private activeroute: ActivatedRoute,
    private sharedService: SharedService

  ) {

  }

  ngOnInit(): void {

    this.setTomorrow = this.D[2] + "-" + this.D[0] + "-" + this.D[1];
    this.getMyPickUpsPoint();
    this.setCurrentPosition();
    this.creatRequestDeliveryForm();

    this.activeroute.queryParams
      .subscribe(params => {

        if (params.isExchangeFor) {

          this.requestDelivery.patchValue({
            isExchangeFor: params.isExchangeFor
          })
        }

      })

    this.gouvernorats = this.sharedService.gouvernorats

  }

  private setCurrentPosition() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;

      });
    }
  }
  savePickUpName($event) {
    if (!this.pname) {
      this.pnameError = true;
    }
    else {
      this.requestDelivery.controls.pickUp.controls.name.value = this.pname;
      this.requestDelivery.patchValue({
        pickUp: {
          name: this.pname
        }
      });

      this.pnameError = false;
      $('#pickUpNameModal').modal('hide');

    }

  }


  openPickUpNameModal(event) {
    if (event.target.value) {
      setTimeout(() => {
        let pickUpAddress = this.requestDelivery.controls.pickUp.controls.pickUpAddress.value;
        if (pickUpAddress) {
          this.pnameError = false;
          $('#pickUpNameModal').modal('show');
        }

      }, 400)

    }
    else {

      this.requestDelivery.patchValue({
        pickUp: {
          pickUpAddress: "",
          latitude: "",
          longitude: "",
          name: ""
        }
      })
      this.requestDelivery.controls.pickUp.controls.name.value = "";

    }

  }



  onPickUpAutocompleteSelected(result: PlaceResult) {
    this.requestDelivery.patchValue({
      pickUp: {
        pickUpAddress: result.name + ", " + result.formatted_address,
      }
    })
  }
  onDropOffAutocompleteSelected(result: PlaceResult) {
    this.requestDelivery.patchValue({
      dropOff: {
        dropOffAddress: result.name + ", " + result.formatted_address,
      }
    })
  }

  onPickUpLocationSelected(location: Location) {

    this.latitude = location.latitude;
    this.longitude = location.longitude;
    this.requestDelivery.patchValue({
      pickUp: {
        latitude: location.latitude,
        longitude: location.longitude
      },
    })
  }
  onDropOffLocationSelected(location: Location) {
    //  this.latitude = location.latitude;
    //  this.longitude = location.longitude;
    this.requestDelivery.patchValue({

      dropOff: {
        latitude: location.latitude,
        longitude: location.longitude
      },


    })
  }
  showAmountBox() {
    this.showAmount = true
  }

  creatRequestDeliveryForm() {
    this.requestDelivery = this.fb.group({
      pickUp: this.fb.group({
        _id: [''],
        longitude: ['', Validators.required],
        latitude: ['', Validators.required],
        pickUpAddress: ['', Validators.required],
        name: [''],
        exactPickUpAddress: [true, Validators.required],
      }),
      dropOff: this.fb.group({
        longitude: [''],
        latitude: [''],
        dropOffAddress: [''],
        exactDropOffAddress: [false, Validators.required],
        deliveredTo: this.fb.group({
          name: ['', Validators.required],
          email: ['', [Validators.maxLength(50), Validators.pattern(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,10})+$/)]],
          phone: ['', Validators.required]
        })

      }),
      city: ["", Validators.required],
      subDivision: ["", Validators.required],
      addInfo: [''],
      descProduit: [''],
      when: ['2', Validators.required],
      amount: [undefined, Validators.required],
      business: [JSON.parse(localStorage.getItem("connectedAdmin")).user.business, Validators.required],
      createdBy: [this.authService?.credentials?.user?._id, Validators.required],
      paymentStatus: ['', Validators.required],
      packageSize: [undefined, Validators.required],
      status: [1, Validators.required],
      startDate: ['', Validators.required],
      fromTo: ['08:00-12:00', Validators.required],
      endDate: [''],
      isExchangeFor: ['']

    });

    this.requestDelivery.patchValue(
      {
        startDate: new Date(this.tomorrow).toISOString().substring(0, 10),

      }
    )
  }

  selectBoxSize(size) {
    this.boxSize = [0, 0, 0, 0, 0];
    this.boxSize[size] = 1;
  }




  getMyPickUpsPoint() {
    var query = {
      createdBy: this.authService.credentials.user._id
    }
    this.businessService.getMyPickUpPoints(JSON.stringify(query)).then(d => {
      this.oldPickUpPoints = d
    })
  }

  showNewPickUpInput(event) {



    if (event.target.value == 1) {
      this.showNewPickUpInputField = !this.showNewPickUpInputField
      this.requestDelivery.patchValue({
        pickUp: {
          _id: '',
          longitude: '',
          latitude: '',
          pickUpAddress: '',
        }
      })
    } else {




      var index = event.target.value - 2


      // this.oldPickUpPoints.map(item => item.pickUpAddress).indexOf(event.target.value);


      var temp = this.oldPickUpPoints[index]
      if (temp.name) {
        this.requestDelivery.patchValue({
          pickUp: {
            speceficName: true,
            name: temp.name
          }
        })
      } else {
        this.requestDelivery.patchValue({
          pickUp: {
            speceficName: false,
            name: ''
          }
        })
      }

      this.requestDelivery.patchValue({
        pickUp: {
          _id: temp?._id,
          longitude: temp?.geoLocation.coordinates[0],
          latitude: temp?.geoLocation.coordinates[1],
          pickUpAddress: temp?.pickUpAddress,
          name: temp?.name
        }
      })

    }


  }


  saveRequestDelivery() {


    this.submitted = true
    var today = new Date()
    var tomorrow = new Date()
    tomorrow.setDate(today.getDate() + 1)

    this.requestDelivery.patchValue({
      packageSize: (this.boxSize.indexOf(1)) + 1,
    })

    if (this.requestDelivery.controls.when.value == 1) {
      this.requestDelivery.patchValue({
        when: today,
      })
    } else {
      this.requestDelivery.patchValue({
        when: tomorrow,
      })
    }

    if (this.requestDelivery.controls.paymentStatus.value == 1) {
      this.requestDelivery.patchValue({
        amount: 0,
      })
    }

    this.requestDelivery.patchValue({
      when: '2',
    })



    let reqBody = Object.assign({}, this.requestDelivery.value)
    let endTime = Number(this.requestDelivery.controls.fromTo.value.substr(0, 2)) + 4;


    let t1 = new Date(this.requestDelivery.controls.startDate.value + 'T' + this.requestDelivery.controls.fromTo.value.substr(0, 2) + ':00:00')
    let t2 = new Date(this.requestDelivery.controls.startDate.value + 'T' + endTime + ':00:00')


    reqBody.startDate = t1
    reqBody.endDate = t2


    if (this.requestDelivery.valid) {
      this.disableSendBtn = true




      this.businessService.addDeliveryRequest(reqBody).then(d => {

        var dropOffJobRequest = this.requestDelivery.value
        dropOffJobRequest["pickUp"] = undefined
        dropOffJobRequest["pickUpJob"] = d._id

        this.router.navigate(['/business/livraison'])
        this.disableSendBtn = false

      }).catch(err=>{
        this.disableSendBtn = false

      })

    }



  }
  cityChanged(event) {
    return this.selectedDivision = this.gouvernorats.map(item => item.division).indexOf(this.f.city.value)

  }
  get f() { return this.requestDelivery.controls; }


  choosePickUpDate(pickUp) {

  }




  startTimeSet(event) {
    if (this.f.endTime.value) {
      let startTime = new Date();
      let endTime = new Date();
      //  

      startTime.setHours(event.substring(0, 2))
      startTime.setMinutes(event.substring(3, 5))

      endTime.setHours(this.f.endTime.value.substring(0, 2))
      endTime.setMinutes(this.f.endTime.value.substring(3, 5))

      if (startTime > endTime) {
        this.requestDelivery.patchValue({
          endTime: undefined
        })

      }

    }


  }
  dropOffInputChanged(event) {
    this.requestDelivery.patchValue({
      dropOff: {
        dropOffAddress: event.target.value
      }
    })
    if (event.target.value == "") {
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





}


