import { Component, OnInit } from '@angular/core';
import { BusinessService } from "./../business.service";
import { FormBuilder, Validators } from '@angular/forms';
import { AuthServiceZ } from "../../../authentification/auth-service.service";
import { PushNotificationService } from "../../../shared/push-notification.service";
declare var $
@Component({
  selector: 'app-conciergerie-requests',
  templateUrl: './clients-conciergerie-requests.component.html',
  styleUrls: ['./clients-conciergerie-requests.component.scss']
})
export class ClientsConciergerieRequestsComponent implements OnInit {
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

    this.pushNotificationService.refreshListOfRequests.subscribe(d => {
      this.p = 1
      this.getAllTherequests();
    })
    this.pushNotificationService.requestPermission()

    this.getAllTherequests();
  }

  getAllTherequests() {
    if (this.authService.credentials.user.business) {
   
      var query = {
        business: JSON.parse(localStorage.getItem("connectedAdmin")).user.business,
        service: 1

      }
      var populate = [{ "path": "business" }, { "path": "createdBy" }, { "path": "pickUp" }, { "path": "driver" }]
      this.businessService.getAllTheConciergerieRequest4Client(query, JSON.stringify(populate), this.p).then(d => {
        this.total = parseInt(d.headers.get('x-total-count'))
        this.requests = d.body

      })
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





  changePage($event) {
    this.p = $event

    this.getAllTherequests();

  }
}
