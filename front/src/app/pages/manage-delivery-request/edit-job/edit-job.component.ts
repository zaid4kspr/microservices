import { Component, OnInit } from '@angular/core';

import { Location, Appearance } from '@angular-material-extensions/google-maps-autocomplete';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthServiceZ } from "../../../authentification/auth-service.service";
import { SharedService } from "../../../shared/shared.service";
import PlaceResult = google.maps.places.PlaceResult;
import { ManageDeliveryService } from "./../manage-delivery.service";
import { Router, ActivatedRoute } from '@angular/router';


declare var $: any

@Component({
  selector: 'app-livraison',
  templateUrl: './edit-job.component.html',
  styleUrls: ['./edit-job.component.scss']
})
export class EditJobComponent implements OnInit {
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
    }
  ]

  pickupStatus = [

    {
      name: "En attente d'enlévement",
      active: false,
      value: 1
    },
    {
      name: "Assigné",
      active: false,
      value: 2
    },
    {
      name: "Accepted",
      active: false,
      value: 3
    },
    {
      name: "Pickup assurée",
      active: false,
      value: 10
    },
    {
      name: "Refusé par chauffeur",
      active: false,
      value: 4
    }, {
      name: "Commencé",
      active: false,
      value: 5
    }, {
      name: "Entrée au centrale",
      active: false,
      value: 6
    },
    {
      name: "Annulée par chauffeur aprés acceptation",
      active: false,
      value: 7
    },
    {
      name: "Annulée par admin",
      active: false,
      value: 8
    },
    {
      name: "Annulée par vendeur",
      active: false,
      value: 14
    }, {
      name: "Retour définitif",
      active: false,
      value: 16
    },
    {
      name: "Retour vendeur",
      active: false,
      value: 17
    }

  ]
  livraisonStatus = [

    {
      name: "En attente de livraison",
      active: false,
      value: 1
    },
    {
      name: "Assigné",
      active: false,
      value: 2
    },
    {
      name: "Livraison en cours",
      active: false,
      value: 10
    },
    {
      name: "Refusé par chauffeur",
      active: false,
      value: 4
    },
    {
      name: "Commencée",
      active: false,
      value: 5
    }, {
      name: "Commande livrée",
      active: false,
      value: 6
    },
    {
      name: "Annulée by admin",
      active: false,
      value: 8
    },
    {
      name: "Annulée par vendeur",
      active: false,
      value: 14
    }, {
      name: "Retour provisoir",
      active: false,
      value: 15
    },
    {
      name: "Retour définitif",
      active: false,
      value: 16
    }, {
      name: "Retour vendeur",
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
    private ManageDeliveryService: ManageDeliveryService,
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


        if (params.jobToEdit) {

          // this.requestDelivery.patchValue({
          //   isExchangeFor: params.isExchangeFor
          // })
          this.getTheJobAndPatchValue(params.jobToEdit)

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

  getTheJobAndPatchValue(id) {
    var populate = [{ "path": "business" }, { "path": "createdBy" }, { "path": "pickUp" }, { "path": "dropOff" }, { "path": "driver" }, { "path": "pickUpJob" }]

    let query = {
      _id: id
    }


    this.ManageDeliveryService.getAllTheDeliveryRequest(JSON.stringify(query), JSON.stringify(populate), 1).then(d => {
      let job = d.body[0]
      if (d.body[0].pickUpJob) {
        //delivery
        this.jobType = 2
        this.status=this.livraisonStatus
        this.creatRequestDeliveryForm();

        this.requestDelivery.patchValue(d.body[0])
        this.requestDelivery.patchValue({
          dropOff: {
            latitude: job.dropOff.geoLocation ? job.dropOff.geoLocation.coordinates[1] : '',
            longitude: job.dropOff.geoLocation ? job.dropOff.geoLocation.coordinates[0] : '',
            pickUpAddress: job.dropOff.pickUpAddress,

          },
        })
        this.longitude = job.dropOff.geoLocation ? job.dropOff.geoLocation.coordinates[1] : '';
        this.longitude = job.dropOff.geoLocation ? job.dropOff.geoLocation.coordinates[0] : '';

      } else {
        //pickup
        this.jobType = 1
        this.status=this.pickupStatus

        this.creatRequestDeliveryForm();

        this.requestDelivery.patchValue(d.body[0])

        this.requestDelivery.patchValue(
          {
            startDate: new Date(job.startDate).toISOString().substring(0, 10),

          }
        )

        this.requestDelivery.patchValue({
          pickUp: {
            latitude: job.pickUp.geoLocation ? job.pickUp.geoLocation.coordinates[1] : '',
            longitude: job.pickUp.geoLocation ? job.pickUp.geoLocation.coordinates[0] : '',
            pickUpAddress: job.pickUp.pickUpAddress,

          },
        })
        this.longitude = job.pickUp.geoLocation ? job.pickUp.geoLocation.coordinates[1] : '';
        this.longitude = job.pickUp.geoLocation ? job.pickUp.geoLocation.coordinates[0] : '';
      }

      this.cityChanged(null)




    })
  }

  pickUpInputChanged(event) {
     
    this.requestDelivery.patchValue({
      pickUp: {
        pickUpAddress: event.target.value,
        longitude: '',
        latitude: '',
        _id: '',
        name: ''
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

    //pickUp
    if (this.jobType == 1) {

      this.requestDelivery = this.fb.group({
        _id: [''],
        pickUp: this.fb.group({
          _id: [''],
          longitude: [''],
          latitude: [''],
          pickUpAddress: [undefined, Validators.required],
          name: [''],
          exactPickUpAddress: [true, Validators.required],
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
        status: [undefined, Validators.required],
        startDate: ['', Validators.required],
        fromTo: ['08:00-12:00', Validators.required],
        endDate: [''],
        isExchangeFor: ['']

      });


    } else {
      this.requestDelivery = this.fb.group({
        _id: [''],
        dropOff: this.fb.group({
          _id: [''],
          longitude: [''],
          latitude: [''],
          dropOffAddress: ['', Validators.required],
          exactDropOffAddress: [false],
          deliveredTo: this.fb.group({
            name: ['', Validators.required],
            email: ['', [Validators.maxLength(50), Validators.pattern(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,10})+$/)]],
            phone: ['', [Validators.required, Validators.minLength(8)]]
          })

        }),
        fromTo: ['08:00-12:00'],
        when: ['2'],
        city: ["", Validators.required],
        subDivision: ["", Validators.required],
        business: [JSON.parse(localStorage.getItem("connectedAdmin")).user.business],
        createdBy: [this.authService?.credentials?.user?._id],
        status: [undefined, Validators.required],
        paymentStatus: [''],
        isExchangeFor: [''],
        startDate: [''],
        endDate: [''],


      });
    }

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

       


      if (this.jobType == 1) {
        this.ManageDeliveryService.editPickUpJob(reqBody).then(d => {
          this.router.navigate(['/pickups'])
          this.disableSendBtn = false
        })
      }


      if (this.jobType == 2) {
        this.ManageDeliveryService.editLivraisonJob(reqBody).then(d => {
          this.router.navigate(['/livraison'])
          this.disableSendBtn = false
        })
      }

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
        dropOffAddress: event.target.value,
        longitude: '',
        latitude: '',
        _id: '',
        name: ''
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


