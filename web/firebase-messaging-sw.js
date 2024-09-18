importScripts("https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/8.10.1/firebase-messaging.js");

firebase.initializeApp({
  apiKey: "AIzaSyCEKnQE3GOJKSeXdMPveVqT1m02rgLNmKM",
  authDomain: "clubedoproduto-a1564.firebaseapp.com",
  projectId: "clubedoproduto-a1564",
  storageBucket: "clubedoproduto-a1564.appspot.com",
  messagingSenderId: "148121296226",
  appId: "1:148121296226:web:ced2803a777db81163e03b",
  databaseURL: "...",
});

const messaging = firebase.messaging();

messaging.setBackgroundMessageHandler(function (payload) {
    const promiseChain = clients
        .matchAll({
            type: "window",
            includeUncontrolled: true
        })
        .then(windowClients => {
            for (let i = 0; i < windowClients.length; i++) {
                const windowClient = windowClients[i];
                windowClient.postMessage(payload);
            }
        })
        .then(() => {
            const title = payload.notification.title;
            const options = {
                body: payload.notification.score
              };
            return registration.showNotification(title, options);
        });
    return promiseChain;
});
self.addEventListener('notificationclick', function (event) {
    console.log('notification received: ', event)
});