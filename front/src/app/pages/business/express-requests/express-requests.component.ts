import { Component, OnInit } from '@angular/core';
import { BusinessService } from "./../business.service";
import { FormBuilder, Validators } from '@angular/forms';
import { AuthServiceZ } from "../../../authentification/auth-service.service";
import { PushNotificationService } from "../../../shared/push-notification.service";
declare var $
@Component({
  selector: 'app-express-requests',
  templateUrl: './express-requests.component.html',
  styleUrls: ['./express-requests.component.scss']
})
export class ExpressRequestsComponent implements OnInit {
  selectedStatus = 0

  selectedCity = undefined

  datePickerConfig = {
    locale: "fr",
    firstDayOfWeek: "mo",
    format: "YYYY-MM-DD",
  }

  filterStartDate
  filterEndDate
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
      name: "Accepted",
      active: false,
      value: 3
    },
    {
      name: "Started",
      active: false,
      value: 5
    }, {
      name: "Finished",
      active: false,
      value: 6
    },


  ]
  cities = []
  total = 0
  p = 1
  submitted = false;
  latitude
  longitude
  requests = []
  drivers = []
  editConciergerieForm
  zoom = 14
  iconFrom = {
    url: './../../../../assets/img/mapIcons/marker.png',
    scaledSize: {
      width: 60,
      height: 60
    }
  }
  constructor(private businessService: BusinessService,
    private fb: FormBuilder,
    private authService: AuthServiceZ,
    private pushNotificationService: PushNotificationService,
  ) { }

  ngOnInit(): void {

    this.createConciergerieRequest();

    this.pushNotificationService.refreshListOfDeliveryRequestsExpress.subscribe(d => {
      this.p = 1
      this.getAllTherequests();
    })
    this.pushNotificationService.requestPermission()

    this.getAllTherequests();

   

    if (this.businessService.gouvernorats) {
      this.cities = this.businessService.gouvernorats.map(item => item.division)

    }


  }





  getAllTherequests(event = null) {

    if (this.authService.credentials.user.business) {
      var query = {
        business: JSON.parse(localStorage.getItem("connectedAdmin")).user.business,
        service: 4
      }


      query["status"] = this.selectedStatus != 0 ? this.selectedStatus : undefined

      if (this.selectedCity) {
        query["city"] = this.selectedCity != undefined ? this.selectedCity : undefined
      }

      if (this.filterStartDate?._d) {
        if (!query["createdAt"]) {
          query["createdAt"] = {}
        }
        query["createdAt"].$gte = this.filterStartDate?._d
      }
      if (this.filterEndDate?._d) {
        if (!query["createdAt"]) {
          query["createdAt"] = {}
        }
        query["createdAt"].$lte = this.filterEndDate?._d

      }


      var populate = [{ "path": "business" }, { "path": "createdBy" }, { "path": "pickUp" }, { "path": "dropOff" }, { "path": "driver" }]
      this.businessService.getAllTheConciergerieRequest4Client(query, JSON.stringify(populate), this.p).then(d => {
        this.total = parseInt(d.headers.get('x-total-count'))
        this.requests = d.body
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
      business: [JSON.parse(localStorage.getItem("connectedAdmin")).user.business, Validators.required],
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





  changePage($event) {
    this.p = $event

    this.getAllTherequests();

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

  activeStatus(ev) {
     

    this.selectedStatus = ev ? ev.value : 0
    this.p = 1
    this.getAllTherequests()
  }
  selectCity(ev) {
     

    this.selectedCity = ev ? ev : undefined

    this.p = 1
    this.getAllTherequests()
  }

}
