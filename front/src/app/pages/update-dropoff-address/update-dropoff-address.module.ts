import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainDropOffAddressUpdateRoutingModule } from './update-dropoff-address-routing.module';
import { MainDropOffAddressUpdateComponent } from './main-dropoff-address-update/main-dropoff-address-update.component';

import { AgmCoreModule } from '@agm/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatGoogleMapsAutocompleteModule } from '@angular-material-extensions/google-maps-autocomplete';


@NgModule({
  declarations: [MainDropOffAddressUpdateComponent],
  imports: [
    CommonModule,
    MainDropOffAddressUpdateRoutingModule,
    FormsModule, ReactiveFormsModule,
    MatGoogleMapsAutocompleteModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCt9Lwn6l5eA5BiKC2uoz4I9w-qEAygNrM',
      libraries: ['places']
    }),

  ]
})
export class MainDropOffAddressUpdateModule { }
