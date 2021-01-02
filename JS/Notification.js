window.addEventListener("offline", showOfflineNotification);

function showOfflineNotification() {
  const { app } = require("electron").remote;

  const myNotification = new Notification("offline", {
    body: "Time Capture is running offline",
    icon: "../TC LOGO PNG 3X.png",
  });
  app.setAppUserModelId(".");
  myNotification.onclick = () => {
    console.log("Notification clicked");
  };
}

window.addEventListener("online", showOnlineNotification);

function showOnlineNotification() {
  const { app } = require("electron").remote;

  const myNotification = new Notification("Online", {
    body: "Time Capture is running online",
    icon: "../TC LOGO PNG 3X.png",
  });
  app.setAppUserModelId(".");
  myNotification.onclick = () => {
    console.log("Notification clicked");
  };
}
