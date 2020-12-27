import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { GroupsRoutingModule } from './groups-routing.module';
import { MainGroupsComponent } from './main-groups/main-groups.component';

import { GroupsService } from "./groups.service";
import {TranslateModule} from "@ngx-translate/core";
@NgModule({
  declarations: [MainGroupsComponent],
  imports: [
    CommonModule,
    GroupsRoutingModule,
    FormsModule, ReactiveFormsModule,
    TranslateModule

  ],
  providers: [GroupsService]
})
export class GroupsModule { }
