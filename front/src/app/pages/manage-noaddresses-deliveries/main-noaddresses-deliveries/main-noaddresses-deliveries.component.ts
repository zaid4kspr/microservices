import { Component, OnInit } from '@angular/core';
import { NoaddressesDelivService } from "./../noaddresses-deliv.service";
declare var $: any
@Component({
  selector: 'app-main-noaddresses-deliveries',
  templateUrl: './main-noaddresses-deliveries.component.html',
  styleUrls: ['./main-noaddresses-deliveries.component.scss']
})

export class MainNoaddressesDeliveriesComponent implements OnInit {
  total
  message
  packingSlip
 noaddressesDelivries = []
  p = 1
  selectedItem
  constructor(private noaddressesDelivService: NoaddressesDelivService) { }

  ngOnInit(): void {
    this.getAllTherequests()
  }

  getAllTherequests(event = null) {

    this.noaddressesDelivService.getNoAddresspackingSlip(this.p).then(d => {
      this.total = d.totalCount
      this.packingSlip = d.docs
    })


  }

  changePage($event) {
    this.p = $event
     

    this.getAllTherequests();

  }

    
askForPickUpAddress(item){
    this.noaddressesDelivService.askUpdatePickUpAddress(item.pickUpjobRequest._id).then(d => {
      this.message = d.body.message
    })   
}  
askForDropOffAddress(item){
    this.noaddressesDelivService.askUpdateDropOffAddress(item.dropOffjobRequest._id).then(d => {
      this.message = d.body.message
    })   
}  

    
  openDecideModal(item) {
    $('#decideModal').modal('show');
    this.selectedItem = item
  }

  decide(param) {
    // param == 1 try again

    //param == 2 returning the package to client

    this.noaddressesDelivService.processDeliveryRequest({ decide: param, id: this.selectedItem._id }).then(d => {
      $('#decideModal').modal('toggle');
      this.getAllTherequests()
    })

  }

}
