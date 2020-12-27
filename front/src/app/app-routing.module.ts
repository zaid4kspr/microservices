import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IntiGoAuthGuardService } from './authentification/auth-guard-intiGoTeam.service';
import { ClientAuthGuardService } from './authentification/auth-guard-client.service';
import { MyRouterGuardService } from './authentification/routerGuard';
import { simpleAuthGuardService } from "./authentification/simpleAuthGuard";
const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () =>
      import('./pages/auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'groups',
    loadChildren: () =>
      import('./pages/groups/groups.module').then((m) => m.GroupsModule),
    canActivate: [IntiGoAuthGuardService],
  },
  {
    path: 'users',
    loadChildren: () =>
      import('./pages/users/users.module').then((m) => m.UsersModule),
    canActivate: [IntiGoAuthGuardService],
  },
  // {
  //   path: 'permissions',
  //   loadChildren: () =>
  //     import('./pages/permission/permission.module').then((m) => m.PermissionModule),
  //   canActivate: [IntiGoAuthGuardService],
  // },
  {
    path: 'business',
    loadChildren: () =>
      import('./pages/business/business.module').then((m) => m.BusinessModule),
    canActivate: [ClientAuthGuardService],
  }
  , {
    path: 'stepOne',
    loadChildren: () =>
      import('./pages/business-step-one/business-step-one.module').then((m) => m.BusinessStepOneModule),
  },
{
    path: 'profile',
    loadChildren: () =>
      import('./pages/profile/profile.module').then((m) => m.ProfileModule),
      canActivate: [simpleAuthGuardService],

  },
  {
    path: 'manageConciergerie',
    loadChildren: () =>
      import('./pages/manage-conciergerie/manage-conciergerie.module').then((m) => m.ManageConciergerieModule),
    canActivate: [IntiGoAuthGuardService],
  }, {
    path: 'payment',
    loadChildren: () =>
      import('./pages/payment/payment.module').then((m) => m.PaymentModule),
  },
  {
    path: 'driverPosition',
    loadChildren: () =>
      import('./pages/driver-position/driver-position.module').then((m) => m.DriverPositionModule),
  },
  {
    path: 'notifs',
    loadChildren: () =>
      import('./pages/list-notifications/list-notifications.module').then((m) => m.ListNotificationsModule),
  },
  {
    path: 'manageDelivery',
    loadChildren: () =>
      import('./pages/manage-delivery-request/manage-delivery-request.module').then((m) => m.ManageDeliveryRequestModule),
    canActivate: [IntiGoAuthGuardService],
  },
  {
    path: 'pickups',
    loadChildren: () =>
      import('./pages/pickups/pickups.module').then((m) => m.PickupsModule),
    canActivate: [IntiGoAuthGuardService],
  },
  {
    path: 'livraison',
    loadChildren: () =>
      import('./pages/livraison/livraison.module').then((m) => m.LivraisonModule),
    canActivate: [IntiGoAuthGuardService],
  },
  {
    path: 'unsuccessfulDelivery',
    loadChildren: () =>
      import('./pages/manage-unsuccessful-deliveries/manage-unsuccessful-deliveries.module').then((m) => m.ManageUnsuccessfulDeliveriesModule),
    canActivate: [IntiGoAuthGuardService],
  },
/*
  {
    path: 'noaddresses',
    loadChildren: () =>
      import('./pages/manage-noaddresses-deliveries/manage-noaddresses-deliveries.module').then((m) => m.ManageNoaddressesDeliveriesModule),
    canActivate: [IntiGoAuthGuardService],
  },
*/
  {
    path: 'updatepickuplocation',
    loadChildren: () =>
      import('./pages/update-pickup-address/update-pickup-address.module').then((m) => m.MainPickUpAddressUpdateModule),
  },
  {
    path: 'updatedropofflocation',
    loadChildren: () =>
      import('./pages/update-dropoff-address/update-dropoff-address.module').then((m) => m.MainDropOffAddressUpdateModule),
  },

  {
    path: 'packagingSlip',
    loadChildren: () =>
      import('./pages/packaging-slip/packaging-slip.module').then((m) => m.PackagingSlipModule),
    canActivate: [IntiGoAuthGuardService],
  },




  { path: '', pathMatch: 'full', children: [], canActivate: [MyRouterGuardService] }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
