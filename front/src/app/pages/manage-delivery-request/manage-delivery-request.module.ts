import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManageDeliveryRequestRoutingModule } from './manage-delivery-request-routing.module';
import { ManageDeliveryRequestMapComponent } from './manage-delivery-request-map/manage-delivery-request-map.component';
import { AgmCoreModule } from '@agm/core';
import { SharedModule } from "./../../shared/shared.module";
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModalsModule } from "./../../shared-modals/shared-modals.module";
import { FilterDeliveryRequestsComponent } from "./filter-delivery-requests/filter-delivery-requests.component"
import { NgxPaginationModule } from 'ngx-pagination'; // <-- import the module
import { DpDatePickerModule } from 'ng2-date-picker';
import { EditJobComponent } from "./edit-job/edit-job.component";
import { MatGoogleMapsAutocompleteModule } from '@angular-material-extensions/google-maps-autocomplete';

@NgModule({
  declarations: [ManageDeliveryRequestMapComponent, FilterDeliveryRequestsComponent,EditJobComponent],
  imports: [
    CommonModule,
    ManageDeliveryRequestRoutingModule,
    NgSelectModule,
    SharedModule,
    AgmCoreModule.forRoot({
      
      apiKey: 'AIzaSyCt9Lwn6l5eA5BiKC2uoz4I9w-qEAygNrM',
      libraries: ['places', 'drawing', 'geometry'],
    }),
    MatGoogleMapsAutocompleteModule,
    FormsModule, ReactiveFormsModule,
    SharedModalsModule,
    NgxPaginationModule,
    DpDatePickerModule
  ],
  providers: []

})
export class ManageDeliveryRequestModule { }
