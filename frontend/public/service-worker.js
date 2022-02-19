const CACHE_NAME = "static-cache-v1.0.0";
const FILES_TO_CACHE = [
  "/offline.html",
  "/favicon.ico",
  "/logo/logo.png",
  "/logo/logo-128.png",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(FILES_TO_CACHE))
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keyList) =>
      Promise.all(
        keyList.map((key) => {
          if (CACHE_NAME !== key) return caches.delete(key);
        })
      )
    )
  );
});

self.addEventListener("fetch", (event) => {
  "navigate" === event.request.mode &&
    event.respondWith(
      fetch(event.request).catch(() =>
        caches.open(CACHE_NAME).then((cache) => cache.match("/offline.html"))
      )
    );
});

self.addEventListener("push", (event) => {
  try {
    const data = JSON.parse(event.data.text());
    const obj = {
      body: data.body,
      icon: data.image,
      data: {
        to: data.to,
      },
    };

    if (data.thumbnail) {
      obj.image = data.thumbnail;
    } else {
      obj.badge = "https://coderland.dev/logo/logo-128.png";
    }

    self.registration.showNotification(data.title, obj);
  } catch (err) {
    const data = event.data.text();

    self.registration.showNotification(data, {
      body: data,
      icon: "https://coderland.dev/logo/logo-128.png",
      badge: "https://coderland.dev/logo/logo-128.png",
      data: {
        to: "https://coderland.dev/",
      },
    });
  }
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();

  event.waitUntil(
    // eslint-disable-next-line no-undef
    clients
      .matchAll({
        type: "window",
      })
      .then(function (clientList) {
        const { to } = event.notification.data;
        const len = clientList.length;

        for (let i = 0; i < len; i++) {
          const client = clientList[i];
          if (client.url === to && "focus" in client) return client.focus();
        }
        // eslint-disable-next-line no-undef
        if (clients.openWindow) return clients.openWindow(to);
      })
  );
});

self.addEventListener(
  "pushsubscriptionchange",
  (event) => {
    let user = localStorage.getItem("user");

    try {
      user = JSON.parse(user);
    } catch (err) {
      user = { name: null };
    }

    event.waitUntil(
      self.registration.pushManager
        .subscribe({
          userVisibleOnly: true,
          applicationServerKey:
            "BDAr5MqR9Ov4EXPQs6_4mz2VMfJuPF8OCqdBDpWWm1yoTjYxTPhC9qTVcdEFSmRE_g-Usy3Rp3qIbfaQvm_fbMc",
        })
        .then((subscription) => {
          let subscriptionString = JSON.stringify(subscription);
          if (user.name) {
            subscriptionString = subscriptionString.replace(
              "{",
              `{"name":"${user.name}",`
            );
          }
          return fetch("https://coderland.dev/api/user/push", {
            method: "POST",
            body: subscriptionString,
          });
        })
    );
  },
  false
);
