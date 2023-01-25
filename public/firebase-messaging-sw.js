importScripts('https://www.gstatic.com/firebasejs/9.1.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.1.0/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: 'AIzaSyA4HNrhL5bgqcqSO6f7F4LKDiEiU4-zR7o',
  authDomain: 'rewarder-4f640.firebaseapp.com',
  databaseURL: 'https://rewarder-4f640.firebaseio.com',
  projectId: 'rewarder-4f640',
  storageBucket: 'rewarder-4f640.appspot.com',
  messagingSenderId: '224818239562',
  appId: '1:224818239562:web:ddb2dadaf044accdc82eb3'
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage(function (payload) {
  const { title, body } = payload.data;

  self.registration.showNotification(title, {
    body,
    badge: '/push-badge.png',
    icon: '/android-chrome-256x256.png'
  });
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();

  event.waitUntil(
    clients
      .matchAll({
        includeUncontrolled: true,
        type: 'window'
      })
      .then(async function (clientList) {
        const todayEntriesUrl = `/entries/${new Date().toISOString().slice(0, 10)}`;

        if (clientList && clientList.length > 0) {
          for (const client of clientList) {
            if ('focus' in client) {
              await client.focus();
              await client.postMessage({ url: todayEntriesUrl });
            }
          }
        } else {
          if ('openWindow' in clients) {
            return clients.openWindow(todayEntriesUrl);
          }
        }
      })
  );
});
