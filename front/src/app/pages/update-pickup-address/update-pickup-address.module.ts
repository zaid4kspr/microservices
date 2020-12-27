import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainPickUpAddressUpdateRoutingModule } from './update-pickup-address-routing.module';
import { MainPickUpAddressUpdateComponent } from './main-pickup-address-update/main-pickup-address-update.component';

import { AgmCoreModule } from '@agm/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatGoogleMapsAutocompleteModule } from '@angular-material-extensions/google-maps-autocomplete';


@NgModule({
  declarations: [MainPickUpAddressUpdateComponent],
  imports: [
    CommonModule,
    MainPickUpAddressUpdateRoutingModule,
    FormsModule, ReactiveFormsModule,
    MatGoogleMapsAutocompleteModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCt9Lwn6l5eA5BiKC2uoz4I9w-qEAygNrM',
      libraries: ['places']
    }),

  ]
})
export class MainPickUpAddressUpdateModule { }
