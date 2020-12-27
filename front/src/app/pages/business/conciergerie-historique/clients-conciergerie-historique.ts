import { Component, OnInit } from '@angular/core';
import { BusinessService } from "../business.service";
import { FormBuilder, Validators } from '@angular/forms';
import { AuthServiceZ } from "../../../authentification/auth-service.service";
import { PushNotificationService } from "../../../shared/push-notification.service";
declare var $
@Component({
  selector: 'app-conciergerie-historique',
  templateUrl: './clients-conciergerie-historique.component.html',
  styleUrls: ['./clients-conciergerie-historique.component.scss']
})
export class ClientsConciergerieHistoriqueComponent implements OnInit {
  total = 0
  p = 1
  errorPMsg = undefined
  submitted = false;
  allSelected
  latitude
  longitude
  requests = []
  drivers = []
  checkSelect = []

  editConciergerieForm
  zoom = 14
  iconFrom = {
    url: './../../../../assets/img/mapIcons/marker.png',
    scaledSize: {
      width: 60,
      height: 60
    }
  }
  datePickerConfig = {
    locale: "fr",
    firstDayOfWeek: "mo",
    format: "YYYY-MM-DD",
  }
  filterStartDate
  filterEndDate
  constructor(private businessService: BusinessService,
    private fb: FormBuilder,
    private authService: AuthServiceZ,
    private pushNotificationService: PushNotificationService,
  ) { }

  ngOnInit(): void {

    this.createConciergerieRequest();

    this.pushNotificationService.refreshListOfRequests.subscribe(d => {
      this.p = 1
      this.getAllTherequests();
    })
    this.pushNotificationService.requestPermission()

    this.getAllTherequests();
  }

  getAllTherequests() {
    this.errorPMsg = undefined
    if (this.authService.credentials.user.business) {

      var query = {
        business: JSON.parse(localStorage.getItem("connectedAdmin")).user.business,
        service: 1,
        status: 6

      }
      if (this.filterStartDate?._d) {
        let startDate = new Date(this.filterStartDate?._d)
        startDate.setHours(1)
        startDate.setMinutes(0)
        if (!query["startDate"]) {
          query["startDate"] = {}
        }
        query["startDate"].$gte = startDate

      }

      if (this.filterEndDate?._d) {
        let endDate = new Date(this.filterEndDate?._d)
        endDate.setHours(24)
        endDate.setMinutes(59)
        if (!query["startDate"]) {
          query["startDate"] = {}
        }
        query["startDate"].$lte = endDate

      }
      var populate = [{ "path": "business" }, { "path": "createdBy" }, { "path": "pickUp" }, { "path": "driver" }]
      this.businessService.getAllTheConciergerieRequest4Client(query, JSON.stringify(populate), this.p).then(d => {
        this.total = parseInt(d.headers.get('x-total-count'))
        this.requests =d.body
        
        for (let index = 0; index < this.requests.length; index++) {

          if (new Date(this.requests[index].FinishJobDate) > new Date(this.requests[index].endDate)) {
            this.requests[index]["duration"] = this.dateDiff(this.requests[index].startDate, this.requests[index].FinishJobDate)

          }
          else {
            this.requests[index]["duration"] = this.dateDiff(this.requests[index].startDate, this.requests[index].endDate)

          }
          this.checkSelect[index] = false
        }

      }).catch(d => {
        this.errorPMsg = "Une erreur s'est produite. Veuillez essayer plus tard ou contactez-nous."
      });
    }


  }


  createConciergerieRequest() {

    this.editConciergerieForm = this.fb.group({
      pickUp: this.fb.group({
        _id: [''],
        geoLocation: this.fb.group({
          coordinates: []
        }),
        pickUpAddress: ['', Validators.required],
        name: ['', Validators.required],

      }),

      conciergerieRequest: [undefined, Validators.required],
      user: [undefined, Validators.required],
      _id: [undefined, Validators.required],
      startDate: ['', Validators.required],
      endDate: [''],
      createdBy: [this.authService.credentials.user._id, Validators.required],
      business: [this.authService.credentials.user.business, Validators.required],
    })



  }

  get f() { return this.editConciergerieForm.controls; }


  openRequestInModal(item) {
    $('#editModal').modal('show');
    this.editConciergerieForm.patchValue(item);
    this.editConciergerieForm.patchValue({
      conciergerieRequest: item
    });
    this.editConciergerieForm.patchValue({
      user: item.driver
    });

    this.latitude = this.f.pickUp?.controls?.geoLocation?.controls?.coordinates.value[1]
    this.longitude = this.f.pickUp?.controls?.geoLocation?.controls?.coordinates?.value[0]
    //  this.getAllTheDrivers()
  }


  selectAll = ($event) => {

    for (let c = 0; c < this.requests.length; c++) {
      this.checkSelect[c] = true;
    }

    if (this.allSelected === true) {
      for (let c = 0; c < this.requests.length; c++) {
        this.checkSelect[c] = false;
      }
    }
    if (this.allSelected === false) {
      for (let c = 0; c < this.requests.length; c++) {
        this.checkSelect[c] = true;
      }
    }

    this.calculSommeDuration()
  }
  somme_duration = {
    "sec": 0,
    "min": 0,
    "hour": 0,
    "day": 0

  }
  calculSommeDuration() {
    this.duration = undefined
    this.somme_duration = {
      "sec": 0,
      "min": 0,
      "hour": 0,
      "day": 0
    }



    for (let c = 0; c < this.checkSelect.length; c++) {
      if (this.checkSelect[c] == true) {
        this.somme_duration.day += this.requests[c].duration.day
        this.somme_duration.min += this.requests[c].duration.min
        this.somme_duration.hour += this.requests[c].duration.hour
        this.somme_duration.sec += this.requests[c].duration.sec
      }
    }
    let TotaltimeInMinute = this.somme_duration.min + (this.somme_duration.hour * 60) + (this.somme_duration.day * 24 * 60)
    this.timeConvert(TotaltimeInMinute)

  }
  duration = undefined
  timeConvert(n) {
    this.duration = ""
    let num = n;
    var hours = (num / 60);
    var rhours = Math.floor(hours);
    var minutes = (hours - rhours) * 60;
    var rminutes = Math.round(minutes);
    if (rhours)
      this.duration += rhours + " heure(s)"
    if (rminutes)
      this.duration += " " + rminutes + " minute(s)"
  }

  changePage($event) {
    this.p = $event

    this.getAllTherequests();

  }


  dateDiff(date1, date2) {
    date1 = new Date(date1)
    date2 = new Date(date2)
 

    var diff = {
      "sec": 0,
      "min": 0,
      "hour": 0,
      "day": 0

    }                        // Initialisation du retour
    var tmp = date2 - date1;



    tmp = Math.floor(tmp / 1000);             // Nombre de secondes entre les 2 dates
    diff.sec = tmp % 60;                    // Extraction du nombre de secondes

    tmp = Math.floor((tmp - diff.sec) / 60);    // Nombre de minutes (partie entière)
    diff.min = tmp % 60;                    // Extraction du nombre de minutes

    tmp = Math.floor((tmp - diff.min) / 60) ;    // Nombre d'heures (entières)
    diff.hour = (tmp % 24);                   // Extraction du nombre d'heures

    tmp = Math.floor((tmp - diff.hour) / 24);   // Nombre de jours restants
    diff.day = tmp;

      return diff;

  }

  selectOne = ($event, i) => {

    this.checkSelect[i] = !this.checkSelect[i];
    if (this.checkSelect.length === 1)
      this.allSelected = false;

    this.calculSommeDuration()

  }


  deleteFilterStartDate() {
    this.filterStartDate = undefined
    this.getAllTherequests()
    this.p = 1
  }
  deleteFilterEndDate() {
    this.filterEndDate = undefined
    this.getAllTherequests()
    this.p = 1
  }
}
