import { Injectable, EventEmitter } from '@angular/core';
import { AngularFireMessaging } from '@angular/fire/messaging';
import { BehaviorSubject } from 'rxjs'
import { HttpClient } from '@angular/common/http';
import { environment } from "./../../environments/environment";
import { mergeMapTo } from 'rxjs/operators';
import { AuthServiceZ } from './../authentification/auth-service.service';


@Injectable({
  providedIn: 'root'
})
export class PushNotificationService {
  // by list i mean list of conciergerie requests
  refreshListOfRequests: EventEmitter<any> = new EventEmitter();
  // by list i mean list of delivery requests
  refreshListOfDeliveryRequests: EventEmitter<any> = new EventEmitter();
  refreshListOfDeliveryRequestsExpress: EventEmitter<any> = new EventEmitter();
  page = 1
  nbNotif = 0
  public notifications = []
  currentMessage = new BehaviorSubject(null);
  constructor(private afMessaging: AngularFireMessaging,
    private authServiceZ: AuthServiceZ,

    private httpClient: HttpClient) {

    if (navigator && navigator.serviceWorker) {
      navigator.serviceWorker.addEventListener('message', this.onReceiveMsg.bind(this));
    } else {


    }

    if (this.authServiceZ.credentials) {
      this.getMyNotifications(this.page)
    }


  }

  nbUnseenNotif() {
    this.nbNotif = this.notifications.filter(item => item.seen == 0).length
  }

  onReceiveMsg(fcmMessage) {

    // let x: HTMLMediaElement = <HTMLVideoElement>document.getElementById("myAudio");
    // x.play();
    console.log("fcmMessage");
    console.log(fcmMessage);
    let notif
    if (fcmMessage?.data?.data?.jobRequest) {
      notif = {
        jobRequest: JSON.parse(fcmMessage?.data?.data?.jobRequest),
        jobStatus:JSON.parse(fcmMessage?.data?.data?.jobRequest).status,
        seen: 0
      }
      this.notifications.unshift(notif)
      this.sendNotifToComponent(notif)
    } else if (fcmMessage.data) {
      let notif = {
        jobRequest: JSON.parse(fcmMessage?.data?.jobRequest),
        jobStatus:JSON.parse(fcmMessage?.data?.jobRequest).status,

        seen: 0
      }
      this.notifications.unshift(notif)
      this.sendNotifToComponent(notif)
    }

    this.nbUnseenNotif()



  }

  sendNotifToComponent(notif) {
    if (notif.jobRequest.service == 1) {
      this.refreshListOfRequests.emit()

    } else if (notif.jobRequest.service == 2) {
      this.refreshListOfDeliveryRequests.emit()
    }
    else if (notif.jobRequest.service == 4) {
      this.refreshListOfDeliveryRequestsExpress.emit()
    }
  }

  receiveMessage() {
    this.afMessaging.messages.subscribe(
      (payload) => {
        console.log("new message received. ", payload);
        this.currentMessage.next(payload);
      })
  }




  requestPermission() {
    this.afMessaging.requestPermission
      .pipe(mergeMapTo(this.afMessaging.tokenChanges))
      .subscribe(
        (token) => {

          this.httpClient
            .post(environment.api.fcmTokens + "/", {
              "user": (localStorage).connectedAdmin ? JSON.parse((localStorage).connectedAdmin).user._id : null,
              "token": token
            })
            .toPromise().then(d => {

            }).catch(err => {

            })

          console.log('Permission granted! Save to the server!', token);

        },
        (error) => { console.error(error); },
      );
  }



  getMyNotifications(page): any {

    let query = {
      "user": this.authServiceZ?.credentials?.user?._id,
      "category": "fcm"
    }
    let populate = [
      { "path": "jobRequest", populate: { "path": "createdBy business pickUp dropOff" } }
    ]

    var skip = 0;
    var limit = (page) * 10;


    return this.httpClient
      .get<any>(environment.api.notificationsBackend + "?sort=-createdAt&populate=" + JSON.stringify(populate) + "&query=" + JSON.stringify(query) + '&skip=' + skip + "&limit=" + limit)
      .toPromise().then(d => {
        this.notifications = d
        this.nbUnseenNotif()
      })


  }







}
