import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { ManageDeliveryService } from "../../manage-delivery-request/manage-delivery.service";

@Component({
  selector: 'app-livraison-stats',
  templateUrl: './livraison-stats.component.html',
  styleUrls: ['./livraison-stats.component.scss']
})
export class LivraisonStatsComponent implements OnInit {
  datePickerConfig = {
    locale: "fr",
    firstDayOfWeek: "mo",
    format: "YYYY-MM-DD",
  }
  filterStartDate
  filterEndDate
  status = [
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
      name: "declined by admin",
      active: false,
      value: 8
    },
    {
      name: "Retour au magazin",
      active: false,
      value: 9
    },
    {
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


  constructor(
    public manageDeliveryService: ManageDeliveryService
  ) { }

  ngOnInit(): void {
    this.getAllStats()
  }

  getDeliveryStats(reqBody) {
    let index = reqBody.index
    this.manageDeliveryService.getStatsForAdmin(reqBody).then(d => {

      this.status[index]["nbDelivery"] = d.nbDelivery

    })
  }

  getAllStats() {
    let reqBody = {

    }

    for (let index = 0; index < this.status.length; index++) {
      reqBody["status"] = this.status[index].value
      reqBody["index"] = index


      if (this.filterStartDate) {
        let startDate = new Date(this.filterStartDate)
        startDate.setHours(1)
        startDate.setMinutes(0)
        reqBody["startDate"] = startDate

      }

      if (this.filterEndDate) {
        let endDate = new Date(this.filterEndDate)
        endDate.setHours(24)
        endDate.setMinutes(59)
        reqBody["endDate"] = endDate

      }




      this.getDeliveryStats(reqBody)

    }


  }


  deleteFilterStartDate() {
    this.filterStartDate = undefined
    this.getAllStats()
  }
  deleteFilterEndDate() {
    this.filterEndDate = undefined
    this.getAllStats()
  }

}
