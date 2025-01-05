self.addEventListener("push", (event) =>  {
    const pushNotification = event.data.json().notification;

    event.waitUntil(self.registration.showNotification(pushNotification.title, {
        body: pushNotification.body,
        icon: pushNotification.image,
    }));
});

self.addEventListener("notificationclick", (event) => {
    event.waitUntil(clients.openWindow("./challenges.html"));
    //event.waitUntil(clients.openWindow("https://devweb2023.cis.strath.ac.uk/~ftb21135/MadTwo Group 16/madtwo-group16/challenges.html"));
});