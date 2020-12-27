import { Component, OnInit } from '@angular/core';
import { UnsuceessfulDelivService } from "./../unsuceessful-deliv.service";
declare var $: any
@Component({
  selector: 'app-main-unsuccessful-deliveries',
  templateUrl: './main-unsuccessful-deliveries.component.html',
  styleUrls: ['./main-unsuccessful-deliveries.component.scss']
})

export class MainUnsuccessfulDeliveriesComponent implements OnInit {
  total
  errorPMsg = undefined
  unsuceessfulDelivries = []
  p = 1
  selectedItem
  constructor(private unsuceessfulDelivService: UnsuceessfulDelivService) { }

  ngOnInit(): void {
    this.getAllTherequests()
  }




  getAllTherequests(event = null) {

    var query = {

      service: 2,
      status: 9
    }



    var populate = [{ "path": "business" }, { "path": "createdBy" }, { "path": "pickUp" }, { "path": "dropOff" }, { "path": "driver" }]
    this.unsuceessfulDelivService.getAllThefailedDeliveryRequest(JSON.stringify(query), JSON.stringify(populate), this.p).then(d => {
      this.total = parseInt(d.headers.get('x-total-count'))
      this.unsuceessfulDelivries = d.body


    }).catch(d => {
      this.errorPMsg = "Une erreur s'est produite. Veuillez essayer plus tard ou contactez-nous."
    })


  }

  changePage($event) {
    this.p = $event
     

    this.getAllTherequests();

  }

  openDecideModal(item) {
    $('#decideModal').modal('show');
    this.selectedItem = item
  }

  decide(param) {
    // param == 1 try again

    //param == 2 returning the package to client
    if (param == 1) {
      this.unsuceessfulDelivService.processDeliveryRequest({ decide: param, id: this.selectedItem._id }).then(d => {
        $('#decideModal').modal('toggle');
        this.getAllTherequests()
      })
    } else {
      this.unsuceessfulDelivService.updateDeliveryJobStatus(this.selectedItem._id, 16).then(d => {
        $('#decideModal').modal('toggle');

        this.getAllTherequests()

      })

    }


  }

}
