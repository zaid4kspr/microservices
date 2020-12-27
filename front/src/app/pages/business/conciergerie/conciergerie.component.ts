import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location, Appearance } from '@angular-material-extensions/google-maps-autocomplete';
import { FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { AuthServiceZ } from "./../../../authentification/auth-service.service";
import { SharedService } from "./../../../shared/shared.service";
import { BusinessService } from "./../business.service";
import PlaceResult = google.maps.places.PlaceResult;
declare var $: any
@Component({
  selector: 'app-conciergerie',
  templateUrl: './conciergerie.component.html',
  styleUrls: ['./conciergerie.component.scss']
})
export class ConciergerieComponent implements OnInit {
  showNewPickUpInputField = false;
  submitted = false
  today = new Date()
  datePickerConfig = {
    locale: "fr",
    firstDayOfWeek: "mo",
    format: "YYYY-MM-DD",
    min: this.today.toISOString()
  }
  vehicle = [1, 0, 0]
  oldPickUpPoints = []
  duration = [1, 2, 3, 4, 5, 6, 7, 8]
  modalDays = [
    {
      name: "Dim",
      active: false
    },
    {
      name: "Lun",
      active: true
    }, {
      name: "Mar",
      active: true
    }, {
      name: "Mer",
      active: false
    }, {
      name: "Jeu",
      active: false
    }, {
      name: "Ven",
      active: false
    }, {
      name: "Sam",
      active: false
    },
  ]
  repeatEvery = [
    {
      name: "week",
      value: 7
    }, {
      name: "Two weeks",
      value: 14
    }, {
      name: "Three weeks",
      value: 21
    }, {
      name: "Month",
      value: 28
    }
  ]
  customRecurrenceSubmitted = false
  disableSendBtn = false
  latitude
  longitude
  zoom = 13
  pname
  pnameError = false;
  conciergerieForm
  CustomRecurrenceForm
  iconFrom = {
    url: './../../../../assets/img/mapIcons/marker.png',
    scaledSize: {
      width: 60,
      height: 60
    }
  }
  drivers = []
  constructor(private fb: FormBuilder,
    private authService: AuthServiceZ,
    private businessService: BusinessService,
    private router: Router,
    private shared: SharedService,

  ) {

  }

  ngOnInit(): void {
    this.getAllDrivers()
    this.getMyPickUpsPoint();
    this.createConciergerieRequest()
    this.setCurrentPosition();
    this.createCustomRecurrenceForm();


  }


  getMyPickUpsPoint() {
    var query = {
      createdBy: this.authService.credentials.user._id
    }
    this.businessService.getMyPickUpPoints(JSON.stringify(query)).then(d => {
      this.oldPickUpPoints = d
    })
  }

  private setCurrentPosition() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;

      });
    }
  }
  onPickUpAutocompleteSelected(result: PlaceResult) {
    this.conciergerieForm.patchValue({
      pickUp: {
        pickUpAddress: result.name + ", " + result.formatted_address,
      }
    })
  }
  onPickUpLocationSelected(location: Location) {
    this.latitude = location.latitude;
    this.longitude = location.longitude;
    this.conciergerieForm.patchValue({

      pickUp: {
        latitude: location.latitude,
        longitude: location.longitude
      },


    })
  }


  createConciergerieRequest() {

    this.conciergerieForm = this.fb.group({

      pickUp: this.fb.group({
        _id: [''],
        longitude: ['', Validators.required],
        latitude: ['', Validators.required],
        pickUpAddress: ['', Validators.required],
        name: [],
      }),


      speceficName: [''],

      startDate: ['', Validators.required],
      time: [undefined, Validators.required],
      endDate: [''],
      driver: [undefined],
      customRecurrence: [false],
      duration: [1, Validators.required],
      createdBy: [this.authService.credentials.user._id, Validators.required],
      business: [JSON.parse(localStorage.getItem("connectedAdmin")).user.business, Validators.required],
    }, { validator: this.validateConciergerieForm.bind(this) })



  }

  validateConciergerieForm(input: AbstractControl) {
    if (input.get("customRecurrence").value) {
      this.updateConciergerieFormValidatorsToNull()
    } else {
      this.setConciergerieFormValidatorsToRequiredAgain()
    }

  }

  createCustomRecurrenceForm() {

    this.CustomRecurrenceForm = this.fb.group({
      startDate: ['', Validators.required],
      time: [undefined, Validators.required],
      endDate: ['', Validators.required],
      duration: [1, Validators.required],
      recurrence: [7, Validators.required],
    })



  }

  getAllDrivers() {
    this.businessService.getAllDrivers(1).then(d => {
      this.drivers = d
    })
  }

  selectVehicle(index) {
    this.vehicle = [0, 0, 0]

    this.vehicle[index] = 1
  }

  sendTheRequest() {
    if (this.recurrentDays.length) {
      this.requestWithCustomRecurrence()
    } else {
      this.NormalRequest()
    }

  }
  requestWithCustomRecurrence() {

    var endDate

    var arrayOfRequest = []

    for (let index = 0; index < this.recurrentDays.length; index++) {
      endDate = new Date(this.recurrentDays[index]);
      endDate.setHours(endDate.getHours() + parseInt(this.CustomRecurrenceForm.controls.duration.value))

      var reqObj = {
        pickUp: this.conciergerieForm.controls.pickUp.value,
        startDate: this.recurrentDays[index],
        business: this.conciergerieForm.controls.business.value,
        endDate: endDate,
        createdBy: this.conciergerieForm.controls.createdBy.value,
        driver: this.conciergerieForm?.controls?.driver.value,
        vehicleType: this.vehicle.indexOf(1) + 1,
      }
      // arrayOfRequest[index]["pickUp"] = this.conciergerieForm.controls.pickUp.value;
      arrayOfRequest.push(reqObj)


    }
    var obj = {
      conciergerieRequests: arrayOfRequest
    }


    if (this.conciergerieForm.valid) {


      this.disableSendBtn = true

      this.businessService.addconciergerieRequest(obj).then(d => {
        this.shared.getMyProfileNow();
        this.router.navigate(["/business/conciergerie"]);


      }).catch(err => {
        this.disableSendBtn = false

        if (err.status == 405) {
          $('#noFunds').modal('show');
        }
      })
    }

  }

  NormalRequest() {
    this.submitted = true
    var startDate = new Date(this.conciergerieForm.controls.startDate.value + 'T' + this.conciergerieForm.controls.time.value + ':00')
    var endDate = new Date(startDate);


    endDate.setHours(endDate.getHours() + parseInt(this.conciergerieForm.controls.duration.value))

    var request2Send = Object.assign({}, this.conciergerieForm.value)
    request2Send.vehicle = this.vehicle.indexOf(1) + 1
    request2Send.startDate = startDate;
    request2Send.endDate = endDate;

    var obj = {
      conciergerieRequests: [request2Send]
    }

    if (this.conciergerieForm.valid) {
      this.disableSendBtn = true

      this.businessService.addconciergerieRequest(obj).then(d => {
        this.shared.getMyProfileNow();

        this.router.navigate(["/business/conciergerie"]);

      }).catch(err => {
        this.disableSendBtn = false
        if (err.status == 405) {
          $('#noFunds').modal('show');
        }
      })
    }


  }

  get f() { return this.conciergerieForm.controls; }
  get crf() { return this.CustomRecurrenceForm.controls; }

  activeDay(day) {
    day.active = !day.active
  }

  showNewPickUpInput(event) {



    if (event.target.value == 1) {
      this.showNewPickUpInputField = !this.showNewPickUpInputField
      this.conciergerieForm.patchValue({
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
        this.conciergerieForm.patchValue({
          pickUp: {
            speceficName: true,
            name: temp.name
          }
        })
      } else {
        this.conciergerieForm.patchValue({
          pickUp: {
            speceficName: false,
            name: ''
          }
        })
      }

      this.longitude = temp?.geoLocation.coordinates[0]
      this.latitude = temp?.geoLocation.coordinates[1]


      this.conciergerieForm.patchValue({
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
  recurrentDays = []
  saveTheCostumRecurrence() {
    this.customRecurrenceSubmitted = true


    if (this.CustomRecurrenceForm.valid) {
      this.recurrentDays = this.recurringDates()

      if (this.recurrentDays.length) {
        $('#exampleModal').modal('toggle');

      }
    }



  }

  recurringDates() {



    var startDate = new Date(this.CustomRecurrenceForm.controls.startDate.value + 'T' + this.CustomRecurrenceForm.controls.time.value + ':00');
    var date = startDate;
    var endDate = new Date(this.CustomRecurrenceForm.controls.endDate.value + 'T' + this.CustomRecurrenceForm.controls.time.value + ':00')
    var repeatEvery = this.CustomRecurrenceForm.controls.recurrence.value // by days
    var recurrent = [];


    while (date < endDate) {
      date.setDate(date.getDate() + 1);

      if (this.modalDays[date.getDay()].active) {
        var temp = new Date(date)
        recurrent.push(temp)
      }

      //Here we jump in case
      if (date.getDay() == 0 && repeatEvery != 7 && recurrent.length) {
        date.setDate(date.getDate() + repeatEvery - 7)
      }

    }
    return recurrent

  }

  customRecChanged() {
    if (this.conciergerieForm.controls.customRecurrence.value) {
      $('#exampleModal').modal('show');

    } else {
      this.customRecurrenceSubmitted = false;
      this.recurrentDays = [];
      this.CustomRecurrenceForm.reset();
      this.CustomRecurrenceForm.patchValue({

        startDate: '',
        time: undefined,
        endDate: '',
        duration: 1,
        recurrence: 7,

      })

    }

  }

  closeAndResetCustomRecurrenceForm() {
    this.conciergerieForm.patchValue({
      customRecurrence: false
    })
    $('#exampleModal').modal('toggle');
    this.customRecurrenceSubmitted = false;
    this.recurrentDays = [];
    this.CustomRecurrenceForm.reset();
    this.CustomRecurrenceForm.patchValue({

      startDate: '',
      time: undefined,
      endDate: '',
      duration: 1,
      recurrence: 7,

    })

  }

  updateConciergerieFormValidatorsToNull() {

    this.conciergerieForm.get('startDate').clearValidators();
    this.conciergerieForm.get('startDate').updateValueAndValidity({ emitEvent: false, onlySelf: true });
    this.conciergerieForm.get('time').clearValidators();
    this.conciergerieForm.get('time').updateValueAndValidity({ emitEvent: false, onlySelf: true });
    this.conciergerieForm.get('duration').clearValidators();
    this.conciergerieForm.get('duration').updateValueAndValidity({ emitEvent: false, onlySelf: true });
  }
  setConciergerieFormValidatorsToRequiredAgain() {

    this.conciergerieForm?.get('startDate').setValidators([Validators.required]);
    this.conciergerieForm?.get('startDate').updateValueAndValidity({ emitEvent: false, onlySelf: true });
    this.conciergerieForm?.get('time').setValidators([Validators.required]);
    this.conciergerieForm?.get('time').updateValueAndValidity({ emitEvent: false, onlySelf: true });
    this.conciergerieForm?.get('duration').setValidators([Validators.required]);
    this.conciergerieForm?.get('duration').updateValueAndValidity({ emitEvent: false, onlySelf: true });
  }
  buyPoints() {
    $('#noFunds').modal('toggle');
    this.router.navigate(['/payment/buy'])
  }

  pickUpInputChanged(event) {
    this.conciergerieForm.patchValue({
      pickUp: {
        pickUpAddress: event.target.value
      }
    })
    if (event.target.value == "") {
      this.conciergerieForm.patchValue({
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


  savePickUpName($event) {
    if (!this.pname) {
      this.pnameError = true;
    }
    else {
      this.conciergerieForm.controls.pickUp.controls.name.value = this.pname;
      this.conciergerieForm.patchValue({
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
        let pickUpAddress = this.conciergerieForm.controls.pickUp.controls.pickUpAddress.value;
        if (pickUpAddress) {
          this.pnameError = false;
          $('#pickUpNameModal').modal('show');
        }

      }, 400)

    }
    else {

      this.conciergerieForm.patchValue({
        pickUp: {
          pickUpAddress: "",
          latitude: "",
          longitude: "",
          name: ""
        }
      })
      this.conciergerieForm.controls.pickUp.controls.name.value = "";

    }

  }

}
