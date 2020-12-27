import { NgModule } from '@angular/core';

import { PickupsRoutingModule } from './pickups-routing.module';
import { ListPickupsComponent } from './list-pickups/list-pickups.component';
import { CommonModule } from '@angular/common';
import { AgmCoreModule } from '@agm/core';
import { SharedModule } from "./../../shared/shared.module";
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModalsModule } from "./../../shared-modals/shared-modals.module";
import { NgxPaginationModule } from 'ngx-pagination'; // <-- import the module
import { DpDatePickerModule } from 'ng2-date-picker';



@NgModule({
  declarations: [ListPickupsComponent],
  imports: [
    CommonModule,
    PickupsRoutingModule,
    CommonModule,
    NgSelectModule,
    SharedModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCt9Lwn6l5eA5BiKC2uoz4I9w-qEAygNrM',
      libraries: ['places', 'drawing', 'geometry'],
    }),
    FormsModule, ReactiveFormsModule,
    SharedModalsModule,
    NgxPaginationModule,
    DpDatePickerModule
  ]
})
export class PickupsModule { }
