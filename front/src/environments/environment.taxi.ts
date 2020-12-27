export const environment = {

  production: true,
  api: {
    user: 'https://taxi-auth.intigo.tn/api/v1',
    userFromBackend: 'https://taxi-app.intigo.tn/api/users',
    group: 'https://taxi-app.intigo.tn/api/group',
    permission: 'https://taxi-app.intigo.tn/api/permission',
    business: 'https://taxi-app.intigo.tn/api/business',
    deliveryRequest: 'https://taxi-app.intigo.tn/api/deliveryRequest',
    pickUp: 'https://taxi-app.intigo.tn/api/pickup',
    conciergerieRequest: 'https://taxi-app.intigo.tn/api/conciergerieRequest',
    workingDay: 'https://taxi-app.intigo.tn/api/workingday',
    notificationsBackend: 'https://taxi-app.intigo.tn/api/notification',
    fcmTokens: 'https://taxi-notif.intigo.tn/api/v1/fcmtokens',
    payment: 'https://app.paymee.tn',
    jobRequest: 'https://taxi-app.intigo.tn/api/jobRequests',
    jobPositions: 'https://taxi-app.intigo.tn/api/jobPositions',
    jobRequestHistory: 'https://taxi-app.intigo.tn/api/jobRequestHistory',
    frontEndUrl: "https://taxicom.intigo.tn",
    packingSlip: 'https://taxi-app.intigo.tn/api/packingSlip',
    serverUrl: 'https://taxi-app.intigo.tn/api'

  },
  paymentVendor: '7986',
  paymentApiKey: '782a497b2798a2ef45f5afda374beb9992dc0cf8',
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
