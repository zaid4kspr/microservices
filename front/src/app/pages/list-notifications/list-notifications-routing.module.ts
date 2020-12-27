import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainNotifListComponent } from './main-notif-list/main-notif-list.component';

const routes: Routes = [
  {
    path: "",
    component: MainNotifListComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ListNotificationsRoutingModule { }
