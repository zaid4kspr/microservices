import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListNotificationsRoutingModule } from './list-notifications-routing.module';
import { MainNotifListComponent } from './main-notif-list/main-notif-list.component';
import { ConciergerieNotifItemComponent } from './conciergerie-notif-item/conciergerie-notif-item.component';
import { SharedModule } from "./../../shared/shared.module";
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

@NgModule({
  declarations: [MainNotifListComponent, ConciergerieNotifItemComponent],
  imports: [
    CommonModule,
    ListNotificationsRoutingModule,
    InfiniteScrollModule,
    SharedModule
  ]
})
export class ListNotificationsModule { }
