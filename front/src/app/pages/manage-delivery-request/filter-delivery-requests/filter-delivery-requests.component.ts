import { Component, OnInit } from '@angular/core';
import { ManageDeliveryService } from "./../manage-delivery.service";
import { FormBuilder, Validators } from '@angular/forms';
import { AuthServiceZ } from "../../../authentification/auth-service.service";
import { PushNotificationService } from "../../../shared/push-notification.service";
import { SharedService } from "../../../shared/shared.service";
declare var $




@Component({
  selector: 'filter-delivery-requests',
  templateUrl: './filter-delivery-requests.component.html',
  styleUrls: ['./filter-delivery-requests.component.scss']
})
export class FilterDeliveryRequestsComponent implements OnInit {

  ids1
  ids2
  allSelected
  checkSelect = []
  dr = []
  retour = []
  driver = []
  jobsType

  clients = []
  selectedStatus = 0
  selectedClient = undefined
  selectedDriver = undefined
  selectedCity = undefined
  selectedSubDivision = undefined
  selectedJobType = false
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
  // 8 decline by the admin 
  // 9 unsuccessful
  // 10 
  jobType = [
    {
      name: "Pick up",
      value: false
    }, {
      name: "Livraison",
      value: true
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
  gouvernorats = []
  subDivisions = []
  constructor(private manageDeliveryService: ManageDeliveryService,
    private fb: FormBuilder,
    private authService: AuthServiceZ,
    public sharedService: SharedService,
    private pushNotificationService: PushNotificationService,
  ) { }

  ngOnInit(): void {

    this.getAllTherequests();
    this.createConciergerieRequest();
    this.pushNotificationService.refreshListOfDeliveryRequests.subscribe(d => {
      this.p = 1
      this.getAllTherequests();
    })
    this.getAllClients()
    this.getAllDrivers()

    this.gouvernorats = this.sharedService.gouvernorats.map(item => item.division)
  }



  getAllTherequests(event = null) {

    var query = {
      service: 2
    }
     

    if (this.selectedJobType != undefined) {
      query["pickUpJob"] = {
        $exists: this.selectedJobType
      }
    }

    query["status"] = this.selectedStatus != 0 ? this.selectedStatus : undefined
    query["business"] = this.selectedClient != undefined ? this.selectedClient : undefined
    query["driver"] = this.selectedDriver != undefined ? this.selectedDriver : undefined
    if (this.selectedCity) {
      query["city"] = this.selectedCity != undefined ? this.selectedCity : undefined
    }
    if (this.selectedSubDivision) {
      query["subDivision"] = this.selectedSubDivision != undefined ? this.selectedSubDivision : undefined
    }

    if (this.filterStartDate?._d) {
      if (!query["startDate"]) {
        query["startDate"] = {}
      }
      query["startDate"].$gte = this.filterStartDate?._d
    }
    if (this.filterEndDate?._d) {
      if (!query["startDate"]) {
        query["startDate"] = {}
      }
      query["startDate"].$lte = this.filterEndDate?._d

    }


    var populate = [{ "path": "business" }, { "path": "createdBy" }, { "path": "pickUp" }, { "path": "dropOff" }, { "path": "driver" }, { "path": "pickUpJob" }]
    this.manageDeliveryService.getAllTheDeliveryRequest(JSON.stringify(query), JSON.stringify(populate), this.p).then(d => {
      this.total = parseInt(d.headers.get('x-total-count'))
      this.requests = d.body
    });


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





  activeStatus(ev) {
     

    this.selectedStatus = ev ? ev.value : 0
    this.p = 1
    this.getAllTherequests()
  }

  selectClient(ev) {
     

    this.selectedClient = ev ? ev._id : undefined
    this.p = 1
    this.getAllTherequests()
  }

  selectDriver(ev) {
     
    this.selectedDriver = ev ? ev._id : undefined
    this.p = 1
    this.getAllTherequests()
  }



  selectJobType(ev) {
     

    this.selectedJobType = ev ? ev.value : false
    this.p = 1
    this.getAllTherequests()
  }
  selectCity(ev) {
     

    this.selectedCity = ev ? ev : undefined
    this.sharedService.gouvernorats.forEach(item => {
      if (item.division == this.selectedCity) {
        this.subDivisions = item.subDivisions
      }
    })
    this.subDivisions.push("other")
    this.p = 1
    this.getAllTherequests()
  }
  selectSubDivision(ev) {
     

    this.selectedSubDivision = ev ? ev : undefined

    this.p = 1
    this.getAllTherequests()
  }

  changePage($event) {
    this.p = $event
     

    this.getAllTherequests();

  }


  getAllClients() {
    this.manageDeliveryService.getAllTheClients().then(d => {
      this.clients = d
    })
  }
  getAllDrivers() {
    this.manageDeliveryService.getAllDrivers("2").then(d => {
      this.drivers = d
    })
  }

  selectedJob
  openRequestInModal(job) {
    // this.editConciergerieForm.patchValue(item);
    // this.editConciergerieForm.patchValue({
    //   conciergerieRequest: item
    // });
    // this.editConciergerieForm.patchValue({
    //   user: item.driver
    // });
    //  

    // this.latitude = this.f.pickUp?.controls?.geoLocation?.controls?.coordinates.value[1]
    // this.longitude = this.f.pickUp?.controls?.geoLocation?.controls?.coordinates?.value[0]
     

    //this is a pickup job
    if (!job.pickUpJob) {
      this.latitude = job.pickUp?.geoLocation?.coordinates[1]
      this.longitude = job.pickUp?.geoLocation?.coordinates[0]
    }
    //deliveryJob
    else {
      this.latitude = job.dropOff?.geoLocation?.coordinates[1]
      this.longitude = job.dropOff?.geoLocation?.coordinates[0]

    }

    this.selectedJob = job
    $('#assignDriver4Delivery').modal('show');

  }

  newselectedDriver
  assignDriverToJobs() {
    this.submitted = true
    var RequestArray = []
    if (this.newselectedDriver && this.selectedJob) {


      this.selectedJob.driver = this.newselectedDriver;
      this.selectedJob.status = 2
      RequestArray.push(this.selectedJob)

      this.manageDeliveryService.assignDriver2Delivery({ deliveryRequests: RequestArray }).then(d => {
        $('#assignDriver4Delivery').modal('toggle');
        this.getAllTherequests()
        this.submitted = false
        this.newselectedDriver = undefined
        this.selectedJob = undefined

      })
    }

  }
  selectedDivision = undefined
  cityChanged(event) {
    return this.selectedDivision = this.gouvernorats.map(item => item.division).indexOf(this.f.city.value)

  }


  selectOne = ($event, i) => {
    this.checkSelect[i] = true;
  }
  selectAll = ($event) => {
    if (this.checkSelect.length < 10) {
      for (let c = 0; c < this.requests.length; c++) {
        this.checkSelect[c] = true;
      }
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
  }

  openPickUpPdfModal($event) {
    this.dr = []
    this.ids1 = ''
    for (let c = 0; c < this.checkSelect.length; c++) {
      if (this.checkSelect[c] == true) {
        this.dr.push(this.requests[c]);
        this.ids1 = this.ids1 + this.requests[c]._id + ",";
      }
    }
    this.ids1 = this.ids1.slice(0, -1);
     
    if (this.dr.length >= 1)
      $('#bonPickup').modal('show');
  }

  openRetourPdfModal($event) {

    this.retour = []
    this.ids2 = ''
    for (let c = 0; c < this.checkSelect.length; c++) {
      if (this.checkSelect[c] == true) {
        this.retour.push(this.requests[c]);
        this.ids2 = this.ids2 + this.requests[c]._id + ",";
      }
    }
    this.ids2 = this.ids2.slice(0, -1);
     

    if (this.retour.length >= 1)
      $('#retourModal').modal('show');


  }

  updateDrivermInModal = {
    driver: undefined,
    deliveryRequest: undefined
  }

  updateDriver(deliveryRequest) {
    if (deliveryRequest.driver) {
      $('#updateDriver').modal('show');
      this.updateDrivermInModal = {
        driver: deliveryRequest.driver,
        deliveryRequest: deliveryRequest
      }
    }

  }
  saveUpdateJobRequest() {
    var temp = {
      driver: this.updateDrivermInModal.driver._id,
      deliveryRequest: this.updateDrivermInModal.deliveryRequest._id,
    }
    this.manageDeliveryService.updateDeliveryRequestDriver(temp).then(d => {
      this.updateDrivermInModal.deliveryRequest = undefined
      this.updateDrivermInModal.driver = undefined
      // this.deliveryRequests.forEach(dr => {
      //    
      //    

      //   if (dr._id == d.resultat._id) {
      //      
      //     dr.driver = d.resultat.driver
      //   }
      // })
      $('#updateDriver').modal('toggle');
    })
  }




  openDriverPdfModal($event) {
    if (!this.selectedJobType)
      this.jobsType = "pickUp"
    else
      this.jobsType = "dropOff"
    this.driver = []
    for (let c = 0; c < this.checkSelect.length; c++) {
      if (this.checkSelect[c] == true) {
        this.driver.push(this.requests[c]);
      }
    }

    if (this.driver.length >= 1)
      $('#driverModal').modal('show');
  }



  resetJob(item) {
    this.manageDeliveryService.updateDeliveryJobStatus(item._id, 1).then(d => {
      item.status = 1
      item.driver = undefined
    })
  }

}
