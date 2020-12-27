importScripts('https://www.gstatic.com/firebasejs/7.19.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/7.19.1/firebase-messaging.js');

firebase.initializeApp({
  apiKey: "AIzaSyAzZ2Mr5tGHT2hDP99eoXPZ-oTkvc4Dkz8",
  authDomain: "intigo-notifications.firebaseapp.com",
  databaseURL: "https://intigo-notifications.firebaseio.com",
  projectId: "intigo-notifications",
  storageBucket: "intigo-notifications.appspot.com",
  messagingSenderId: "19182138526",
  appId: "1:19182138526:web:5aeed682d4da0f4e0bf78f",
  measurementId: "G-DY2XP7WWMZ"
});
const messaging = firebase.messaging();
messaging.setBackgroundMessageHandler(function (payload) {
  console.log('Handling background message ', payload.data);

  const promiseChain = clients
    .matchAll({
      type: "window",
      includeUncontrolled: true
    })
    .then(windowClients => {
      for (let i = 0; i < windowClients.length; i++) {
        const windowClient = windowClients[i];
        windowClient.postMessage(payload.data);
      }
    })
    .then(() => {
      return self.registration.showNotification(payload.data.title, { body: payload.data.body })
    });
  return promiseChain;

});