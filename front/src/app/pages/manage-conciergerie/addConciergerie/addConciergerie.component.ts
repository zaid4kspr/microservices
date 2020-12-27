import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location, Appearance } from '@angular-material-extensions/google-maps-autocomplete';
import { FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { AuthServiceZ } from "../../../authentification/auth-service.service";
import { ConciergerieService } from "./../conciergerie.service";

import PlaceResult = google.maps.places.PlaceResult;
declare var $: any

@Component({
  selector: 'app-conciergerie',
  templateUrl: './addConciergerie.component.html',
  styleUrls: ['./addConciergerie.component.scss']
})
export class AddConciergerieComponent implements OnInit {
  pname
  pnameError = false;
  showNewPickUpInputField = false;
  customRecurrenceSubmitted = false
  CustomRecurrenceForm
  submitted = false
  disableSendBtn = false
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

  latitude
  longitude
  zoom = 13

  conciergerieForm
  iconFrom = {
    url: './../../../../assets/img/mapIcons/marker.png',
    scaledSize: {
      width: 60,
      height: 60
    }
  }
  constructor(private fb: FormBuilder,
    private authService: AuthServiceZ,
    private conciergerieService: ConciergerieService,
    private router: Router,

  ) {

  }

  ngOnInit(): void {
    this.getMyPickUpsPoint();
    this.createConciergerieRequest()
    this.setCurrentPosition();
    this.createCustomRecurrenceForm();

  }


  getMyPickUpsPoint() {
    var query = {
      createdBy: this.authService.credentials.user._id
    }
    this.conciergerieService.getMyPickUpPoints(JSON.stringify(query)).then(d => {
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
        name: ['', Validators.required],
      }),
      customRecurrence: [false],

      speceficName: [''],
      startDate: [''],
      passingClientName: ['', Validators.required],
      time: [undefined],
      endDate: [''],
      duration: [1],
      createdBy: [this.authService.credentials.user._id, Validators.required],
      // business: [this.authService.credentials.user.business, Validators.required],
    }, { validator: this.validateConciergerieForm.bind(this) })



  }


  validateConciergerieForm(input: AbstractControl) {
    if (input.get("customRecurrence").value) {
      this.updateConciergerieFormValidatorsToNull()
    } else {
      this.setConciergerieFormValidatorsToRequiredAgain()
    }

  }

  selectVehicle(index) {
    this.vehicle = [0, 0, 0]

    this.vehicle[index] = 1
  }


  sendTheRequest() {
    this.submitted = true
    if (this.recurrentDays.length) {
      this.requestWithCustomRecurrence()
    } else {
      this.NormalRequest()
    }

  }




  get f() { return this.conciergerieForm.controls; }


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




  createCustomRecurrenceForm() {

    this.CustomRecurrenceForm = this.fb.group({
      startDate: ['', Validators.required],
      time: [undefined, Validators.required],
      endDate: ['', Validators.required],
      duration: [1, Validators.required],
      recurrence: [7, Validators.required],
    })



  }
  requestWithCustomRecurrence() {
    this.customRecurrenceSubmitted = true

    var endDate
    var arrayOfRequest = []
    for (let index = 0; index < this.recurrentDays.length; index++) {
      endDate = new Date(this.recurrentDays[index]);
      endDate.setHours(endDate.getHours() + parseInt(this.CustomRecurrenceForm.controls.duration.value))
       
      var reqObj = {
        pickUp: this.conciergerieForm.controls.pickUp.value,
        passingClientName: this.conciergerieForm.controls.passingClientName.value,
        startDate: this.recurrentDays[index],
        business: this.conciergerieForm.controls.business ? this.conciergerieForm.controls.business.value : undefined,
        endDate: endDate,
        createdBy: this.conciergerieForm.controls.createdBy.value,
        vehicleType: this.vehicle.indexOf(1) + 1,
      }
      // arrayOfRequest[index]["pickUp"] = this.conciergerieForm.controls.pickUp.value;
      arrayOfRequest.push(reqObj)


    }
    var obj = {
      conciergerieRequests: arrayOfRequest
    }

    this.getFormValidationErrors()
    if (this.conciergerieForm.valid) {
      this.disableSendBtn = true
      this.conciergerieService.addconciergerieRequest(obj).then(d => {

        this.router.navigate(["/manageConciergerie/list"]);

      })
    }



  }

  NormalRequest() {
    var startDate = new Date(this.conciergerieForm.controls.startDate.value + 'T' + this.conciergerieForm.controls.time.value + ':00')
    var endDate = new Date(startDate);


    endDate.setHours(endDate.getHours() + parseInt(this.conciergerieForm.controls.duration.value))

    var request2Send = Object.assign({}, this.conciergerieForm.value)
    request2Send.vehicleType = this.vehicle.indexOf(1) + 1
    request2Send.startDate = startDate;
    request2Send.endDate = endDate;

     
    var obj = {
      conciergerieRequests: [request2Send]
    }

    if (this.conciergerieForm.valid) {
      this.disableSendBtn = true

      this.conciergerieService.addconciergerieRequest(obj).then(d => {
         
        this.router.navigate(["/manageConciergerie/list"]);

      })
    }


  }
  get crf() { return this.CustomRecurrenceForm.controls; }

  recurrentDays = []
  saveTheCostumRecurrence() {
    this.customRecurrenceSubmitted = true
     
     

    if (this.CustomRecurrenceForm.valid) {
      this.recurrentDays = this.recurringDates()
       

      if (this.recurrentDays.length) {
        $('#exampleModal').modal('toggle');
        // this.updateConciergerieFormValidatorsToNull()
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

  activeDay(day) {
    day.active = !day.active
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
  getFormValidationErrors() {
    Object.keys(this.conciergerieForm.controls).forEach(key => {

      const controlErrors = this.conciergerieForm.get(key).errors;
      if (controlErrors != null) {
        Object.keys(controlErrors).forEach(keyError => {
        });
      }
    });
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
