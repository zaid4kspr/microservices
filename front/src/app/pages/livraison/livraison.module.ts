import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LivraisonRoutingModule } from './livraison-routing.module';
import { ListLivraisionComponent } from "./list-livraison/list-livraison.component";
import { AgmCoreModule } from '@agm/core';
import { SharedModule } from "./../../shared/shared.module";
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModalsModule } from "./../../shared-modals/shared-modals.module";
import { NgxPaginationModule } from 'ngx-pagination'; // <-- import the module
import { DpDatePickerModule } from 'ng2-date-picker';
import { LivraisonStatsComponent } from './livraison-stats/livraison-stats.component';
import { ListLivraisonHistoryComponent } from "./list-livraisonHistory/list-livraisonHistory.component";
import { EtatJournalComponent } from "./etat-journal/etat-journal.component";
@NgModule({
  declarations: [ListLivraisionComponent,
    LivraisonStatsComponent,
    ListLivraisonHistoryComponent,
    EtatJournalComponent

  ],
  imports: [
    CommonModule,
    LivraisonRoutingModule,
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
export class LivraisonModule { }
