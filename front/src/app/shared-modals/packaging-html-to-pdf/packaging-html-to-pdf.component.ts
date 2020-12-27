import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { SharedModalService } from "./../shared-modal.service";
import jspdf from 'jspdf';
import html2canvas from 'html2canvas';
declare var $

@Component({
  selector: 'app-packaging-html-to-pdf',
  templateUrl: './packaging-html-to-pdf.component.html',
  styleUrls: ['./packaging-html-to-pdf.component.scss']
})
export class PackagingHtmlToPdfComponent implements OnChanges {
  @Input() deliveryRequest = null
  @Input() nid = null
  packingSlip
  qrwidth=128
  constructor(private sharedModalService: SharedModalService) { }



  ngOnChanges() {
     if(this.isMobile){
      this.qrwidth=85
    }
    this.getAllTherequests()

  }


  getAllTherequests() {
    var query = {}
      query["nid"] = this.nid
 

    var populate = [{ "path": "pickUpjobRequest", "populate": [{ "path": "business createdBy pickUp" }] }, { "path": "dropOffjobRequest", "populate": [{ "path": "dropOff" }] }]

    this.sharedModalService.getAllpackingSlip(JSON.stringify(query), JSON.stringify(populate), 1).then(d => {
      this.packingSlip = d.body[0]
      setTimeout(() => {
        this.generatePDF()

      }, 1000);
    })
  }

  isMobile() {
    if ($(window).width() > 991) {
      return false;
    }
    return true;
  };


  generatePDF() {
    var data = document.getElementById('myPdf');

    html2canvas(data, {
      scrollX: 0,
      scrollY: 0
    }).then(canvas => {
      var imgWidth = 208;
      var imgHeight = canvas.height * imgWidth / canvas.width;
      const contentDataURL = canvas.toDataURL('image/png')
      let pdf = new jspdf('p', 'mm', 'a4');
      var position = 0;
      pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight)
      pdf.save(this.packingSlip.pickUpjobRequest.createdBy.name + '-' + this.packingSlip.pickUpjobRequest.nid + '.pdf');
      $('#bordereau').modal('toggle');

    });
  }



}
