import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListPickupsComponent } from './list-pickups/list-pickups.component';

const routes: Routes = [
  {
    path: "",
    component: ListPickupsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PickupsRoutingModule { }
