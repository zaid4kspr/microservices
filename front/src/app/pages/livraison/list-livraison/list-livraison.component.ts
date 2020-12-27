import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ManageDeliveryService } from "../../manage-delivery-request/manage-delivery.service";
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthServiceZ } from "../../../authentification/auth-service.service";
import { PushNotificationService } from "../../../shared/push-notification.service";
import { SharedService } from "../../../shared/shared.service";
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';


declare var $


@Component({
  selector: 'app-list-livraison',
  templateUrl: './list-livraison.component.html',
  styleUrls: ['./list-livraison.component.scss']
})
export class ListLivraisionComponent implements OnInit {

  nid
  ids1
  ids2
  allSelected
  checkSelect = []
  rqs = []
  dr = []
  retour = []
  driver = []
  jobsType
  errorPMsg = undefined
  updateDriverSubmitted = false;
  clients = []
  selectedStatus = undefined
  selectedClient = undefined
  selectedDriver = undefined
  selectedCity = undefined
  selectedSubDivision = undefined
  finalClientName
  finalClientPhone
  // true so it's a livraison
  selectedJobType = true
  today = new Date()
  datePickerConfig = {
    locale: "fr",
    firstDayOfWeek: "mo",
    format: "YYYY-MM-DD",
  }
  itemsPerPage
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
      name: "declined by admin",
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
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthServiceZ,
    public sharedService: SharedService,
    private toastr: ToastrService,
    private cdr: ChangeDetectorRef,

    private pushNotificationService: PushNotificationService,
  ) {

    this.itemsPerPage = this.sharedService.itemsPerPage
  }

  ngOnInit(): void {
    this.gouvernorats = this.sharedService.gouvernorats.map(item => item.division)
    //  this.selectedCity = this.sharedService.gouvernorats.map(item => item.division)


    this.route.queryParams.subscribe(queryParams => {
      console.log(queryParams);
      if (queryParams.driver)
        this.selectedDriver = queryParams.driver

      if (queryParams.startDate) {
        this.filterStartDate = queryParams.startDate.substring(0, 10)
      }
      if (queryParams.endDate) {
        this.filterEndDate = queryParams.endDate.substring(0, 10)
      }
      if (queryParams.status)
        this.selectedStatus = parseInt(queryParams.status)

      if (queryParams.business)
        this.selectedClient = queryParams.business
      if (queryParams.driver)
        this.selectedDriver = queryParams.driver
      if (queryParams.finalClientName)
        this.finalClientName = queryParams.finalClientName
      if (queryParams.finalClientPhone)
        this.finalClientPhone = queryParams.finalClientPhone
      if (queryParams.nid)
        this.nid = queryParams.nid
      // this.selectedCity = queryParams.city



    });

    this.getAllTherequests();
    this.createConciergerieRequest();
    this.pushNotificationService.refreshListOfDeliveryRequests.subscribe(d => {
      this.p = 1
      this.getAllTherequests();
    })
    this.getAllClients()
    this.getAllDrivers()

    for (let index = 0; index < this.selectedCity?.length; index++) {

      for (let j = 0; j < this.sharedService.gouvernorats.length; j++) {
        if (this.selectedCity[index] == this.sharedService.gouvernorats[j].division) {
          this.subDivisions = this.subDivisions.concat(this.sharedService.gouvernorats[j].subDivisions)
        }
      }

    }
  }



  getAllTherequests(event = null) {
    this.errorPMsg = undefined
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

    query["city"] = this.selectedCity != undefined && this.selectedCity.length ? this.selectedCity : this.sharedService.gouvernorats.map(item => item.division)

    if (this.selectedSubDivision) {
      query["subDivision"] = this.selectedSubDivision != undefined ? this.selectedSubDivision : undefined
    }


    if (this.filterStartDate) {
      if (!query["date"]) {
        query["date"] = {}
      }
      let startDate = new Date(this.filterStartDate)


      startDate.setHours(1)
      startDate.setMinutes(0)

      query["date"].$gte = startDate
    }

    if (this.filterEndDate) {
      if (!query["date"]) {
        query["date"] = {}
      }

      let endDate = new Date(this.filterEndDate)
      endDate.setHours(24)
      endDate.setMinutes(59)
      query["date"].$lte = endDate

    }

    if (this.filterStartDate?._d) {
      let startDate = new Date(this.filterStartDate?._d)
      startDate.setHours(1)
      startDate.setMinutes(0)

      query["startDate"] = startDate
    }
    if (this.filterEndDate?._d) {
      let endDate = new Date(this.filterEndDate?._d)
      endDate.setHours(24)
      endDate.setMinutes(59)
      query["endDate"] = endDate
    }



    if (this.finalClientName) {
      query["finalClientName"] = this.finalClientName

    }
    if (this.finalClientPhone) {
      query["finalClientPhone"] = this.finalClientPhone

    }
    if (this.nid) {
      query["nid"] = this.nid

    }
    query["page"] = this.p
    query["itemsPerPage"] = this.itemsPerPage
    this.manageDeliveryService.filterDeliveryRequest(query).then(d => {
      this.requests = []
      this.total = d.totalDocs
      this.requests = d.docs
      this.addQueryParams(query)
      this.cdr.detectChanges()
    }).catch(d => {
      this.errorPMsg = "Une erreur s'est produite. Veuillez essayer plus tard ou contactez-nous."
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

    this.subDivisions = []
    this.selectedCity = ev.length ? ev.map(item => item.division) : []
    for (let index = 0; index < this.selectedCity.length; index++) {
      for (let j = 0; j < this.sharedService.gouvernorats.length; j++) {
        if (this.selectedCity[index] == this.sharedService.gouvernorats[j].division) {
          this.subDivisions = this.subDivisions.concat(this.sharedService.gouvernorats[j].subDivisions)
        }
      }

    }
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
    this.updateDriverSubmitted = true;
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
        this.updateDriverSubmitted = false;

      })
    }

  }
  selectedDivision = undefined
  cityChanged(event) {
    return this.selectedDivision = this.gouvernorats.map(item => item.division).indexOf(this.f.city.value)

  }


  selectOne = ($event, i) => {
    this.checkSelect[i] = true;
    if (this.checkSelect.length === 1)
      this.allSelected = false;
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
    this.checkSelect = [];
    this.allSelected = false;

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
    this.checkSelect = [];
    this.allSelected = false;

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
    this.updateDriverSubmitted = true;
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
      this.updateDriverSubmitted = false;
      $('#updateDriver').modal('toggle');

    })
  }




  openDriverPdfModal($event) {
    if (!this.selectedJobType)
      this.jobsType = "pickUp"
    else
      this.jobsType = "dropOff"


    if (!this.selectedDriver) {
      this.toastr.info(' Veuillez selectionnez un chauffeur', "");

    } else {
      this.driver = []
      for (let c = 0; c < this.checkSelect.length; c++) {
        if (this.checkSelect[c] == true) {
          this.driver.push(this.requests[c]);
        }
      }

      if (this.driver.length >= 1)
        $('#driverModal').modal('show');
      this.checkSelect = [];
      this.allSelected = false;
    }



  }
  etatlieuxRequestArray = []
  openEtatLieuClient($event) {

    if (!this.selectedClient) {
      this.toastr.info(' Veuillez selectionnez un client !', "");

    } else {
      this.etatlieuxRequestArray = []
      this.jobsType = "dropOff"
      this.selectedStatus = 6
      this.getAllTherequests()
      for (let c = 0; c < this.checkSelect.length; c++) {
        if (this.checkSelect[c] == true) {
          this.etatlieuxRequestArray.push(this.requests[c]);
        }
      }

      if (this.etatlieuxRequestArray.length >= 1) {
        $('#clientModal').modal('show');

      }
      else {
        this.toastr.info(' Veuillez selectionnez des livraisons !', "");
        this.checkSelect = [];
        this.allSelected = false;

      }
    }



  }


  resetJob(item) {
    this.manageDeliveryService.updateDeliveryJobStatus(item._id, 1).then(d => {
      item.status = 1
      item.driver = undefined
    })
  }


  getBordereauForEveryJob() {
    let query = {};
    for (let index = 0; index < this.requests.length; index++) {
      query['dropOffjobRequest'] = this.requests[index]._id
      this.manageDeliveryService.getpackingSlip(JSON.stringify(query)).then(d => {
        if (this.requests[index])
          this.requests[index]["packingSlip"] = d[0]
      })
    }


  }
  selectedPackingSlip
  openPackingSlip(item) {

    this.selectedPackingSlip = item.nid
    $('#bordereau').modal('show');

  }

  onKey(ev) {
    this.finalClientName = ev.target.value
    // this.filterBody.name = ev.target.value

    this.p = 1
    this.getAllTherequests()

  }
  onBordereauxKey(ev) {
    this.nid = ev.target.value
    // this.filterBody.name = ev.target.value

    this.p = 1
    this.getAllTherequests()



  }
  onKeyTelPressed(ev) {

    this.finalClientPhone = ev.target.value
    // this.filterBody.name = ev.target.value
    this.p = 1
    this.getAllTherequests()

  }

  askForDropOffAddress(item) {

    this.manageDeliveryService.askUpdateDropOffAddress(item._id).then(d => {


      this.toastr.success('  Message a été envoyé avec succès');

    })
  }

  edit(id) {
    this.router.navigate(['/manageDelivery/edit'], { queryParams: { jobToEdit: id } });

  }




  groupAssign(e) {
    this.rqs = [];
    for (let c = 0; c < this.checkSelect.length; c++) {
      if (this.checkSelect[c] == true) {
        let id = this.requests[c]._id;
        this.rqs.push({ _id: id });
      }
      if (this.rqs.length)
        $('#assignDriver4Deliveries').modal('show');
    }
  }

  groupAssignToDriver() {
    this.updateDriverSubmitted = true;
    this.submitted = true;

    if (this.newselectedDriver) {
      for (let i = 0; i < this.rqs.length; i++) {
        this.rqs[i].driver = this.newselectedDriver;
        this.rqs[i].status = 2
      }

      this.manageDeliveryService.assignDriver2Delivery({ deliveryRequests: this.rqs }).then(d => {
        $('#assignDriver4Deliveries').modal('toggle');
        this.getAllTherequests()
        this.submitted = false
        this.newselectedDriver = undefined
        this.rqs = [];
        this.checkSelect = [];
        this.allSelected = false;
        this.updateDriverSubmitted = false;
      })
    }


  }
  selectJobInHistoryModal
  openJobHistory(item) {

    this.selectJobInHistoryModal = item;
    $('#history').modal('show');

  }


  /*
    receivingMoneyFromDriver(item) {
  
  
  
      this.manageDeliveryService.receivingMoneyFromDriver(item).then(d => {
  
      })
    }
    editGivingMoneyToClient(item) {
      this.manageDeliveryService.editGivingMoneyToClient(item).then(d => {
  
      })
    }
  */


  addQueryParams(query) {
    query.pickUpJob = undefined
    // query.date = query.date
    if (query["date"]?.$gte)
      query.startDate = query["date"].$gte.toISOString()

    if (query["date"]?.$lte)
      query.endDate = query["date"].$lte.toISOString()

    query.date = undefined
    query.city = undefined

    // query = JSON.stringify(query)
    console.log(query);

    this.router.navigate(['/livraison'], { queryParams: query });

  }
}



