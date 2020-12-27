import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManageConciergerieRoutingModule } from './manage-conciergerie-routing.module';
import { ConciergerieRequestsComponent } from './conciergerie-requests/conciergerie-requests.component';
import { AddConciergerieComponent } from './addConciergerie/addConciergerie.component';
import { ConciergerieService } from "./conciergerie.service";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AgmCoreModule } from '@agm/core';
import { MatGoogleMapsAutocompleteModule } from '@angular-material-extensions/google-maps-autocomplete';

import { NgSelectModule } from '@ng-select/ng-select';
import { ScheduleComponent } from './schedule/schedule.component';
import {NgxPaginationModule} from 'ngx-pagination'; // <-- import the module
import {NgxMaterialTimepickerModule} from 'ngx-material-timepicker';

import { DpDatePickerModule } from 'ng2-date-picker';
import { SharedModule } from "./../../shared/shared.module";

import { ConfirmationPopoverModule } from 'angular-confirmation-popover';

@NgModule({
  declarations: [ConciergerieRequestsComponent, ScheduleComponent, AddConciergerieComponent],
  imports: [
    CommonModule,
    ManageConciergerieRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCt9Lwn6l5eA5BiKC2uoz4I9w-qEAygNrM',
      libraries: ['places']
    }),
    MatGoogleMapsAutocompleteModule,
    NgSelectModule,
    DpDatePickerModule,
    NgxPaginationModule,
    NgxMaterialTimepickerModule,
    SharedModule,
    ConfirmationPopoverModule.forRoot({
      confirmButtonType: 'danger', // set defaults here
    })

  ],
  providers: [ConciergerieService]
})
export class ManageConciergerieModule { }
