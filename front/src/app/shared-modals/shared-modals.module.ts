import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JobRequestHistoryComponent } from './job-request-history/job-request-history.component';
import { SharedModalService } from './shared-modal.service';
import { SharedModule } from "./../shared/shared.module";
import { PackagingHtmlToPdfComponent } from "./packaging-html-to-pdf/packaging-html-to-pdf.component";
import { PickUpHtmlToPdfComponent } from "./pickup-html-to-pdf/pickup-html-to-pdf.component";
import { RetourHtmlToPdfComponent } from "./retour-html-to-pdf/retour-html-to-pdf.component";
import { DriverHtmlToPdfComponent } from "./driver-html-to-pdf/driver-html-to-pdf.component";
import { EtatLieuxClientComponent } from './etat-lieux-client/etat-lieux-client.component';


@NgModule({
  declarations: [
    JobRequestHistoryComponent,
    PackagingHtmlToPdfComponent,
    PickUpHtmlToPdfComponent,
    RetourHtmlToPdfComponent,
    DriverHtmlToPdfComponent,
    EtatLieuxClientComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  providers: [SharedModalService],
  exports: [JobRequestHistoryComponent, PackagingHtmlToPdfComponent, PickUpHtmlToPdfComponent, RetourHtmlToPdfComponent,
    DriverHtmlToPdfComponent,
    EtatLieuxClientComponent


  ]
})
export class SharedModalsModule { }
