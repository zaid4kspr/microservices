import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainBusinessComponent } from './main-business/main-business.component';
import { LivraisonComponent } from './livraison/livraison.component';
import { ConciergerieComponent } from './conciergerie/conciergerie.component';
import { ClientsConciergerieRequestsComponent } from './conciergerie-requests/clients-conciergerie-requests';
import { DeliveriesRequestsComponent } from './deliveries-requests/deliveries-requests.component';
import { LivraisonExpressComponent } from "./livraison-express/livraison-express.component";
import { ExpressRequestsComponent } from './express-requests/express-requests.component';
import { CustomerServicesGuard } from "./../../authentification/customerServicesGuard";
import { EditPackComponent } from "./editPack/edit-pack.component";
import { ClientsConciergerieHistoriqueComponent } from "./conciergerie-historique/clients-conciergerie-historique";

const routes: Routes = [
  {
    path: "",
    component: MainBusinessComponent
  },
  {
    path: "livraison",
    component: DeliveriesRequestsComponent,
    canActivate: [CustomerServicesGuard],

  },
  {
    path: "conciergerie",
    component: ClientsConciergerieRequestsComponent,
    canActivate: [CustomerServicesGuard],

  },  {
    path: "conciergerie/historique",
    component: ClientsConciergerieHistoriqueComponent,
    canActivate: [CustomerServicesGuard],

  },
   {
    path: "express",
    component: ExpressRequestsComponent,
    canActivate: [CustomerServicesGuard],

  },
  {
    path: "conciergerie/add",
    component: ConciergerieComponent,
    canActivate: [CustomerServicesGuard],

  }, {
    path: "livraison/add",
    component: LivraisonComponent,
    canActivate: [CustomerServicesGuard],

  }, {
    path: "livraison/edit",
    component: EditPackComponent,

  }, {
    path: "express/add",
    component: LivraisonExpressComponent,
    canActivate: [CustomerServicesGuard],

  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BusinessRoutingModule { }
