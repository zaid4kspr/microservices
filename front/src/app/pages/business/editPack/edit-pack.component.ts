import { Component, OnInit } from '@angular/core';

import { Location, Appearance } from '@angular-material-extensions/google-maps-autocomplete';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthServiceZ } from "../../../authentification/auth-service.service";
import { SharedService } from "../../../shared/shared.service";
import PlaceResult = google.maps.places.PlaceResult;
import { BusinessService } from "./../business.service";
import { Router, ActivatedRoute } from '@angular/router';


declare var $: any

@Component({
  selector: 'app-edit-pack',
  templateUrl: './edit-pack.component.html',
  styleUrls: ['./edit-pack.component.scss']
})
export class EditPackComponent implements OnInit {
  submitted = false
  zoom = 7
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
  //1 pickup 2 dropOff
  jobType
  status = [
    {
      name: "All",
      active: true,
      value: 0
    },
    {
      name: "New",
      active: false,
      value: 1
    },
    {
      name: "Assigned",
      active: false,
      value: 2
    },
    {
      name: "Accepted",
      active: false,
      value: 3
    },
    {
      name: "pickedUp",
      active: false,
      value: 10
    },
    {
      name: "Declined",
      active: false,
      value: 4
    }, {
      name: "Started",
      active: false,
      value: 5
    }, {
      name: "Finished",
      active: false,
      value: 6
    },
    {
      name: "declined by driver after accepting",
      active: false,
      value: 7
    },
    {
      name: "declined by admin",
      active: false,
      value: 8
    },
    {
      name: "Retour au magazin",
      active: false,
      value: 9
    }, {
      name: "Retour définitif",
      active: false,
      value: 16
    },
    {
      name: "Retour au client",
      active: false,
      value: 17
    },
    {
      name: "Adresse non exacte",
      active: false,
      value: 12
    }
  ]
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





  constructor(private fb: FormBuilder,
    private authService: AuthServiceZ,
    private ManageDeliveryService: BusinessService,
    private router: Router,
    private activeroute: ActivatedRoute,
    private sharedService: SharedService

  ) {

  }

  ngOnInit(): void {

    this.setTomorrow = this.D[2] + "-" + this.D[0] + "-" + this.D[1];
    this.getMyPickUpsPoint();
    this.setCurrentPosition();

    this.activeroute.queryParams
      .subscribe(params => {

        if (params.isExchangeFor) {

          this.requestDelivery.patchValue({
            isExchangeFor: params.isExchangeFor
          })
        }


        if (params.packToEdit) {


          this.getThePackingSlipAndPatchValue(params.packToEdit)

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

  getThePackingSlipAndPatchValue(id) {
    this.creatRequestDeliveryForm();
    var populate = [

      { path: "pickUpjobRequest", populate: [{ "path": "business" }, { "path": "createdBy" }, { "path": "pickUp" }, { "path": "dropOff" }, { "path": "driver" }, { "path": "pickUpJob" }] }
      , { path: "dropOffjobRequest", populate: [{ "path": "business" }, { "path": "createdBy" }, { "path": "pickUp" }, { "path": "dropOff" }, { "path": "driver" }, { "path": "pickUpJob" }] }



    ]

    let query = {
      _id: id
    }


    this.ManageDeliveryService.getAllpackingSlip(JSON.stringify(query), JSON.stringify(populate), 1).then(d => {
      let pickUpjobRequest = d.body[0].pickUpjobRequest
      let dropOffjobRequest = d.body[0].dropOffjobRequest


      this.requestDelivery.patchValue(pickUpjobRequest)
      this.requestDelivery.patchValue({
        dropOff: {
          latitude: dropOffjobRequest.dropOff.geoLocation.coordinates[1],
          longitude: dropOffjobRequest.dropOff.geoLocation.coordinates[0],
          pickUpAddress: dropOffjobRequest.dropOff.pickUpAddress,

          deliveredTo: dropOffjobRequest.dropOff.deliveredTo,
          exactDropOffAddress: dropOffjobRequest.dropOff.exactDropOffAddress
        },
        city: dropOffjobRequest.city,
        subDivision: dropOffjobRequest.subDivision,
      })
      this.cityChanged(null)
      this.longitude = dropOffjobRequest.dropOff.geoLocation.coordinates[1]
      this.longitude = dropOffjobRequest.dropOff.geoLocation.coordinates[0]


      //pickup


      this.requestDelivery.patchValue(
        {
          startDate: new Date(pickUpjobRequest.startDate).toISOString().substring(0, 10),

        }
      )

      this.requestDelivery.patchValue({
        pickUp: {
          latitude: pickUpjobRequest.pickUp.geoLocation.coordinates[1],
          longitude: pickUpjobRequest.pickUp.geoLocation.coordinates[0],
          pickUpAddress: pickUpjobRequest.pickUp.pickUpAddress,

        },
      })
      this.longitude = pickUpjobRequest.pickUp.geoLocation.coordinates[1]
      this.longitude = pickUpjobRequest.pickUp.geoLocation.coordinates[0]



      this.requestDelivery.patchValue({
        _id: id
      })


    })
  }

  pickUpInputChanged(event) {
    this.requestDelivery.patchValue({
      pickUp: {
        pickUpAddress: event.target.value
      }
    })
    if (event.target.value == "") {
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
      _id: [''],

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

  }

  selectBoxSize(size) {
    this.boxSize = [0, 0, 0, 0, 0];
    this.boxSize[size] = 1;
  }




  getMyPickUpsPoint() {
    var query = {
      createdBy: this.authService.credentials.user._id
    }

  }

  showNewPickUpInput(event) {



    if (event.target.value == 1) {
      this.showNewPickUpInputField = !this.showNewPickUpInputField
      this.requestDelivery.patchValue({
        pickUp: {
          _id: '',
          longitude: '',
          latitude: '',
          // pickUpAddress: '',
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

      this.ManageDeliveryService.editPack(reqBody).then(d => {
         this.router.navigate(['/business/livraison'])
        this.disableSendBtn = false
      })





    }



  }
  cityChanged(event) {
    let index = this.gouvernorats.map(item => item.division).indexOf(this.f.city.value)
    this.selectedDivision = index
    this.requestDelivery.patchValue({
      subDivision: this.gouvernorats[index].subDivisions[0]
    })

    return index

  }
  get f() { return this.requestDelivery.controls; }


  choosePickUpDate(pickUp) {

  }




  startTimeSet(event) {
    if (this.f.endTime.value) {
      let startTime = new Date();
      let endTime = new Date();

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


