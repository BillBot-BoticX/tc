setInterval(function () {
  showNotification();
}, 10000);

const { Notification } = require("electron");
function showNotification() {
  const notification = {
    title: "TIME CAPTURE",
    body: "Time-Capture",
    icon: __dirname + "/Images/LOGO.ico",
  };
  new Notification(notification).show();
}
