import { Component, OnInit } from '@angular/core';
import { PackagingSlipService } from "./../packaging-slip.service";
import { PushNotificationService } from "./../../../shared/push-notification.service";
import { SharedService } from "../../../shared/shared.service";


declare var $
@Component({
  selector: 'app-main-packaging-slip',
  templateUrl: './main-packaging-slip.component.html',
  styleUrls: ['./main-packaging-slip.component.scss']
})
export class MainPackagingSlipComponent implements OnInit {
  total
  packingSlip = []
  p = 1
  selectedPackingSlip
  itemsPerPage = 25
  constructor(private packagingSlipService: PackagingSlipService, private pushNotificationService: PushNotificationService, public sharedService: SharedService) { }

  ngOnInit(): void {
    this.getAllTherequests()
    this.pushNotificationService.refreshListOfDeliveryRequests.subscribe(d => {
      this.getAllTherequests()

    })
  }


  errorPMsg = undefined
  getAllTherequests() {

    var query = {}
    var populate = [{ "path": "pickUpjobRequest", "populate": [{ "path": "business createdBy pickUp" }] }, { "path": "dropOffjobRequest", "populate": [{ "path": "dropOff" }] }]
    this.packagingSlipService.getAllpackingSlip(JSON.stringify(query), JSON.stringify(populate), this.p, this.sharedService.itemsPerPage).then(d => {
      this.total = parseInt(d.headers.get('x-total-count'))
      this.packingSlip = d.body



    }).catch(d => {
      this.errorPMsg = "Une erreur s'est produite. Veuillez essayer plus tard ou contactez-nous."
    })


  }

  changePage($event) {
    this.p = $event
     

    this.getAllTherequests();

  }

  openPackingSlip(item) {
 
    this.selectedPackingSlip = item.pickUpjobRequest.nid
    $('#bordereau').modal('show');

  }









}
