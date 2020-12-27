import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DriverPositionRoutingModule } from './driver-position-routing.module';
import { MainDriverPositionComponent } from './main-driver-position/main-driver-position.component';

import { AgmCoreModule } from '@agm/core';
import { ShareYourPositionWhithDriverComponent } from './share-your-position-whith-driver/share-your-position-whith-driver.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatGoogleMapsAutocompleteModule } from '@angular-material-extensions/google-maps-autocomplete';
import { DriverJourneyComponent } from "./driver-journey/driver-journey.component";

@NgModule({
  declarations: [MainDriverPositionComponent, ShareYourPositionWhithDriverComponent,DriverJourneyComponent],
  imports: [
    CommonModule,
    DriverPositionRoutingModule,
    FormsModule, ReactiveFormsModule,
    MatGoogleMapsAutocompleteModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCt9Lwn6l5eA5BiKC2uoz4I9w-qEAygNrM',
      libraries: ['places']
    }),

  ]
})
export class DriverPositionModule { }
