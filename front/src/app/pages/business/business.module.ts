import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BusinessRoutingModule } from './business-routing.module';
import { MainBusinessComponent } from './main-business/main-business.component';
import { AgmCoreModule } from '@agm/core';
import { MatGoogleMapsAutocompleteModule } from '@angular-material-extensions/google-maps-autocomplete';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BusinessService } from "./business.service";
import { LivraisonComponent } from './livraison/livraison.component';
import { ConciergerieComponent } from './conciergerie/conciergerie.component';
import { ClientsConciergerieRequestsComponent } from './conciergerie-requests/clients-conciergerie-requests';
import { DpDatePickerModule } from 'ng2-date-picker';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { NgxPaginationModule } from 'ngx-pagination'; // <-- import the module
import { SharedModule } from "./../../shared/shared.module";
import { SharedModalsModule } from "./../../shared-modals/shared-modals.module";
import { DeliveriesRequestsComponent } from './deliveries-requests/deliveries-requests.component';
import { LivraisonExpressComponent } from "./livraison-express/livraison-express.component";
import { ExpressRequestsComponent } from './express-requests/express-requests.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { EditPackComponent } from "./editPack/edit-pack.component";
import { ClientsConciergerieHistoriqueComponent } from "./conciergerie-historique/clients-conciergerie-historique";
@NgModule({
  declarations: [
    LivraisonExpressComponent,
    MainBusinessComponent,
    LivraisonComponent,
    ConciergerieComponent,
    ClientsConciergerieRequestsComponent,
    DeliveriesRequestsComponent,
    ExpressRequestsComponent,
    EditPackComponent,
    ClientsConciergerieHistoriqueComponent
    ],
  imports: [
    CommonModule,
    BusinessRoutingModule,
    MatGoogleMapsAutocompleteModule,
    FormsModule, ReactiveFormsModule,
    NgSelectModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCt9Lwn6l5eA5BiKC2uoz4I9w-qEAygNrM',
      libraries: ['places']
    }),
    DpDatePickerModule,
    NgxMaterialTimepickerModule,
    NgxPaginationModule,
    SharedModule,
    SharedModalsModule
  ],
  providers: [BusinessService]
})
export class BusinessModule { }
