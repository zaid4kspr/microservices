import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainGroupsComponent } from './main-groups/main-groups.component';

const routes: Routes = [
  {
    path: '',
    component: MainGroupsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GroupsRoutingModule { }
