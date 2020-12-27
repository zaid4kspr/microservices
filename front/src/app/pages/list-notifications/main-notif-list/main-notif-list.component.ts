import { Component, OnInit } from '@angular/core';
import { PushNotificationService } from "./../../../shared/push-notification.service";
@Component({
  selector: 'app-main-notif-list',
  templateUrl: './main-notif-list.component.html',
  styleUrls: ['./main-notif-list.component.scss']
})
export class MainNotifListComponent implements OnInit {
  page = 1
  constructor(public notifServ: PushNotificationService) { }

  ngOnInit(): void {
  }

  onScroll() {
    this.page++;
    this.notifServ.getMyNotifications(this.page)

  }

}
