// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  api: {
    user: 'http://localhost:3300/api/v1',
    userFromBackend: 'http://localhost:3000/api/users',
    group: 'http://localhost:3000/api/group',
    permission: 'http://localhost:3000/api/permission',
    business: 'http://localhost:3000/api/business',
    deliveryRequest: 'http://localhost:3000/api/deliveryRequest',
    pickUp: 'http://localhost:3000/api/pickup',
    conciergerieRequest: 'http://localhost:3000/api/conciergerieRequest',
    workingDay: 'http://localhost:3000/api/workingday',
    notificationsBackend: 'http://localhost:3000/api/notification',
    fcmTokens: 'http://localhost:3100/api/v1/fcmtokens',
    payment: 'https://sandbox.paymee.tn',
    jobRequest: 'http://localhost:3000/api/jobRequests',
    jobPositions: 'http://localhost:3000/api/jobPositions',
    jobRequestHistory: 'http://localhost:3000/api/jobRequestHistory',
    frontEndUrl: "http://localhost:4200",
    packingSlip: 'http://localhost:3000/api/packingSlip',
    serverUrl: 'http://localhost:3000/api'

  },
  paymentVendor: '1495',
  paymentApiKey: '78754c6751b5205c61b448dd8c0a083eed3f013a',
  firebase:
  {
    apiKey: "AIzaSyAzZ2Mr5tGHT2hDP99eoXPZ-oTkvc4Dkz8",
    authDomain: "intigo-notifications.firebaseapp.com",
    databaseURL: "https://intigo-notifications.firebaseio.com",
    projectId: "intigo-notifications",
    storageBucket: "intigo-notifications.appspot.com",
    messagingSenderId: "19182138526",
    appId: "1:19182138526:web:5aeed682d4da0f4e0bf78f",
    measurementId: "G-DY2XP7WWMZ"
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
