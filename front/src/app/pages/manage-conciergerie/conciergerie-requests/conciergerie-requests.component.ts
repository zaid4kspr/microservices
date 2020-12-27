import { Component, OnInit } from '@angular/core';
import { ConciergerieService } from "./../conciergerie.service";
import { FormBuilder, Validators } from '@angular/forms';
import { AuthServiceZ } from "./../../../authentification/auth-service.service";
import { PushNotificationService } from "./../../../shared/push-notification.service";
import { SharedService } from "./../../../shared/shared.service";

declare var $

@Component({
  selector: 'app-conciergerie-requests',
  templateUrl: './conciergerie-requests.component.html',
  styleUrls: ['./conciergerie-requests.component.scss']
})
export class ConciergerieRequestsComponent implements OnInit {

  popoverTitle = 'Modifier conciergerie';
  popoverMessage = 'Voulez vous annuler la conciergerie ?';
  confirmClicked = false;
  cancelClicked = false;
  expiredChkValue = false;
  itemsPerPage 
  selectedStatus = 0
  today = new Date()
  datePickerConfig = {
    locale: "fr",
    firstDayOfWeek: "mo",
    format: "YYYY-MM-DD",
  }
  filterStartDate
  filterEndDate
  // 1 pending 
  // 2 assigned 
  // 3 accepted by driver 
  // 4 declined by driver
  // 5 start the job
  // 6 finish the job
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
    }
  ]


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
  constructor(private conciergerieService: ConciergerieService,
    private fb: FormBuilder,
    private authService: AuthServiceZ,
    public sharedService: SharedService,
    private pushNotificationService: PushNotificationService,
  ) {
    this.itemsPerPage = this.sharedService.itemsPerPage

   }

  ngOnInit(): void {

    this.getAllTherequests();
    this.createConciergerieRequest();

    this.pushNotificationService.refreshListOfRequests.subscribe(d => {
      this.p = 1
      this.getAllTherequests();
    })
    this.pushNotificationService.requestPermission()
  }

  getAllTherequests(event = null) {
    let now = new Date()
    var query = {
      //"rdvDate" : {"$gte": "2020-08-28" ,"$lt": "2020-08-30"}
      service: 1
    }
    if (this.expiredChkValue) {
      query["endDate"] = {}
      query["endDate"].$lt = now
      query["status"] = { $nin: [5, 6] }
      this.selectedStatus = undefined

    } else {
      query["status"] = this.selectedStatus != 0 ? this.selectedStatus : undefined

    }

    if (this.filterStartDate?._d) {
      if (!query["startDate"]) {
        query["startDate"] = {}
      }
      let startDate = new Date(this.filterStartDate?._d)
      startDate.setHours(1)
      startDate.setMinutes(0)

      query["startDate"].$gte = startDate
    }
    if (this.filterEndDate?._d) {
      if (!query["startDate"]) {
        query["startDate"] = {}
      }
       
      let endDate = new Date(this.filterEndDate?._d)
      endDate.setHours(24)
      endDate.setMinutes(59)
      query["startDate"].$lte = endDate

    }
    
    var populate = [{ "path": "business" }, { "path": "createdBy" }, { "path": "pickUp" }, { "path": "driver" }]
    this.conciergerieService.getAllTheConciergerieRequest(JSON.stringify(query), JSON.stringify(populate), this.p,this.sharedService.itemsPerPage).then(d => {
      this.total = parseInt(d.headers.get('x-total-count'))
      this.requests = d.body


    })

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
      business: [this.authService.credentials.user.business],
    })



  }

  get f() { return this.editConciergerieForm.controls; }


  openRequestInModal(item) {
    this.editConciergerieForm.patchValue(item);
    this.editConciergerieForm.patchValue({
      conciergerieRequest: item
    });
    this.editConciergerieForm.patchValue({
      user: item.driver
    });
     

    this.latitude = this.f.pickUp?.controls?.geoLocation?.controls?.coordinates.value[1]
    this.longitude = this.f.pickUp?.controls?.geoLocation?.controls?.coordinates?.value[0]
    this.getAllTheDrivers()
    $('#editModal').modal('show');

  }

  getAllTheDrivers() {
    this.conciergerieService.getAvailableDriver(this.editConciergerieForm.value).then(d => {
      this.drivers = d
    })
  }
  assignConciergerieRequest() {
    this.submitted = true

     

    if (this.editConciergerieForm.valid) {
      if (!this.editConciergerieForm?.controls?.conciergerieRequest?.value?.driver?._id) {
        this.conciergerieService.assignDriverToRequest(this.editConciergerieForm.value).then(d => {

          var index = this.requests.map(item => item._id).indexOf(this.editConciergerieForm.controls._id.value);
          this.requests[index].driver = this.editConciergerieForm.controls.user.value;
          this.requests[index].status = 2;
          this.submitted = false;
          $('#editModal').modal('toggle');
        })
      } else {
        this.conciergerieService.updateDriverInConciergerieRequest(this.editConciergerieForm.value).then(d => {
          var index = this.requests.map(item => item._id).indexOf(this.editConciergerieForm.controls._id.value);
          this.requests[index].driver = this.editConciergerieForm.controls.user.value;
          this.requests[index].status = 2;
          this.submitted = false;
          $('#editModal').modal('toggle');

        })

      }


    }


  }
  activeStatus(ev) {
     

    this.selectedStatus = ev ? ev.value : 0
    this.p = 1
    this.getAllTherequests()
  }

  changePage($event) {
    this.p = $event
     

    this.getAllTherequests();

  }

  declineConciergerie(jbRequest) {
    this.conciergerieService.declineJobRequestByAnAdmin(jbRequest._id, { status: 8 }).then(d => {
      jbRequest.status = 8
    })
  }


  isItExpired(job) {
    let now = new Date();
    let jobEndDate = new Date(job.endDate)
    if ((now > jobEndDate) && (job.status != 6 && job.status != 5)) {
      job["expired"] = true
      return true
    }
    return false
  }

  expiredCheckBox(event) {
    this.getAllTherequests()
  }
}
