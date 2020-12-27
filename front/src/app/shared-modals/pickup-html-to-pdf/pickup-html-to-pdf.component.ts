import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { SharedModalService } from "./../shared-modal.service";
import jspdf from 'jspdf';
import html2canvas from 'html2canvas';
declare var $

@Component({
  selector: 'pickup-packaging-html-to-pdf',
  templateUrl: './pickup-html-to-pdf.component.html',
  styleUrls: ['./pickup-html-to-pdf.component.scss']
})
export class PickUpHtmlToPdfComponent implements OnChanges {
  @Input() deliveryRequests = null
  @Input() groupIds = null

  slices = []

  constructor(private sharedModalService: SharedModalService) { }



  ngOnChanges() {
     this.getAllTherequests();

  }

  getAllTherequests() {
     this.sliceRequests()
    setTimeout(() => {

      this.getPDF()

    }, 1000);
  }

  sliceRequests() {
    let maxItem = 10
    let j = 0
    let k = 0
 
    for (let index = 0; index < this.deliveryRequests.length; index++) {
       if (k == 0) {
        this.slices[j] = {}
        this.slices[j]["requests"] = []
        this.slices[j]["qrCode"] = ""
      }
      if (k < maxItem-1) {
    
        this.slices[j].requests.push(this.deliveryRequests[index])
 
        this.slices[j]["qrCode"] = this.slices[j]["qrCode"] + this.deliveryRequests[index]._id + ",";

        k++;

      } else {
        this.slices[j].requests.push(this.deliveryRequests[index])
 
        this.slices[j]["qrCode"] = this.slices[j]["qrCode"] + this.deliveryRequests[index]._id + ",";

        j++;
        k = 0;
   

      }
    }
 

  }



  page_section
  HTML_Width
  HTML_Height
  top_left_margin
  PDF_Width
  PDF_Height
  canvas_image_width
  canvas_image_height

  calculatePDF_height_width(selector, index) {
    this.page_section = $(selector).eq(index);
    this.HTML_Width = this.page_section.width();
    this.HTML_Height = this.page_section.height();
    this.top_left_margin = 30;
    this.PDF_Width = this.HTML_Width + (this.top_left_margin * 2);
    this.PDF_Height = (this.PDF_Width * 1.2) + (this.top_left_margin * 2);
    this.canvas_image_width = this.HTML_Width;
    this.canvas_image_height = this.HTML_Height;
  }
  pdf = new jspdf('p', 'mm', 'a4');

  getPDF(index = 0) {
    $("#genmsg").show();


    if (index == this.slices.length) {

      //Save PDF Doc	
      this.pdf.save("HTML-Document.pdf");

      //Generate BLOB object
      var blob = this.pdf.output("blob");

      //Getting URL of blob object
      var blobURL = URL.createObjectURL(blob);

      //Showing PDF generated in iFrame element
      var iframe /* Defining element */

      iframe = document.getElementById('sample-pdf');
      iframe.src = blobURL;

      //Setting download link
      var downloadLink
      downloadLink = document.getElementById('pdf-download-link');
      downloadLink.href = blobURL;

      $("#sample-pdf").slideDown();


      $("#downloadbtn").show();
      $("#genmsg").hide();

      return;

    }





    html2canvas($(".print-wrap:eq(" + index + ")")[0], { allowTaint: true }).then((canvas) => {

      this.calculatePDF_height_width(".print-wrap", index)
      var imgData = canvas.toDataURL("image/png", 0.6);
 
      if (index == 0) {
        this.pdf = new jspdf('p', 'pt', [this.PDF_Width, this.PDF_Height]);
        this.pdf.addImage(imgData, 'JPG', this.top_left_margin, this.top_left_margin, this.HTML_Width, this.HTML_Height);

      }

      if (index != 0) {
        this.pdf.addPage();
        this.pdf.addImage(imgData, 'JPG', this.top_left_margin, this.top_left_margin, this.HTML_Width, this.HTML_Height);
      }
      index++;

      this.getPDF(index);

    });



  }





}
