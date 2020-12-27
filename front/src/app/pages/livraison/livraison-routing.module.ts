import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListLivraisionComponent } from "./list-livraison/list-livraison.component";
import { LivraisonStatsComponent } from './livraison-stats/livraison-stats.component';
import { ListLivraisonHistoryComponent } from "./list-livraisonHistory/list-livraisonHistory.component";
import { EtatJournalComponent } from "./etat-journal/etat-journal.component";
const routes: Routes = [
  {
    path: "",
    component: ListLivraisionComponent
  }, {
    path: "stats",
    component: LivraisonStatsComponent
  },
   {
    path: "acceptedByDate",
    component: ListLivraisonHistoryComponent
  } , {
    path: "etatJournal",
    component: EtatJournalComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LivraisonRoutingModule { }
