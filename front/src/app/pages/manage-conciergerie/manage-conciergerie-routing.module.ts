import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ConciergerieRequestsComponent } from './conciergerie-requests/conciergerie-requests.component';
import { ScheduleComponent } from './schedule/schedule.component';
import { AddConciergerieComponent } from './addConciergerie/addConciergerie.component';

const routes: Routes = [
  {
    path: "list",
    component: ConciergerieRequestsComponent
  }, {
    path: "add",
    component: AddConciergerieComponent
  }, {
    path: "schedule",
    component: ScheduleComponent
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManageConciergerieRoutingModule { }
