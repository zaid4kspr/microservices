import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainDriverPositionComponent } from './main-driver-position/main-driver-position.component';
import { ShareYourPositionWhithDriverComponent } from './share-your-position-whith-driver/share-your-position-whith-driver.component';
import { DriverJourneyComponent } from "./driver-journey/driver-journey.component";

const routes: Routes = [

{
  path:":jobRequest",
  component:MainDriverPositionComponent
},{
  path:"journey/:journeyId",
  component:DriverJourneyComponent
},
{
  path:"shareYourPosition/:jobRequest",
  component:ShareYourPositionWhithDriverComponent
}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DriverPositionRoutingModule { }
