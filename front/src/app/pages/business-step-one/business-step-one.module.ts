import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BusinessStepOneRoutingModule } from './business-step-one-routing.module';
import { MainBusinessStepOneComponent } from './main-business-step-one/main-business-step-one.component';
import { AgmCoreModule } from '@agm/core';
import { MatGoogleMapsAutocompleteModule } from '@angular-material-extensions/google-maps-autocomplete';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BusinessStepZeroComponent } from './business-step-zero/business-step-zero.component';

@NgModule({
  declarations: [MainBusinessStepOneComponent,BusinessStepZeroComponent],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    BusinessStepOneRoutingModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCt9Lwn6l5eA5BiKC2uoz4I9w-qEAygNrM',
      libraries: ['places']
    }),
    MatGoogleMapsAutocompleteModule,
  ]
})
export class BusinessStepOneModule { }
