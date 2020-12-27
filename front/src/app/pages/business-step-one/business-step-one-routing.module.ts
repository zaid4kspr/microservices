import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainBusinessStepOneComponent } from './main-business-step-one/main-business-step-one.component';
import { BusinessStepZeroComponent } from './business-step-zero/business-step-zero.component';

const routes: Routes = [
  {
    path: 'init',
    component: BusinessStepZeroComponent
  },
  {
    path: '',
    component: MainBusinessStepOneComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BusinessStepOneRoutingModule { }
