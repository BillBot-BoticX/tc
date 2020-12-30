const activeWindows = require("active-windows");
var current_window,
  window,
  idle = 0,
  idleTime = 0,
  windowtime = 0,
  oldwindow;

setInterval(function () {
  idle = activeWindows.getActiveWindow().idleTime;
  if (idle > 30) {
    idleTime = idleTime + 1;
  }
  window = activeWindows.getActiveWindow().windowPid;
  windowclass = activeWindows.getActiveWindow().windowClass;
  if (current_window == window) {
    windowtime = windowtime + 1;
    oldwindow = windowclass;
  } else {
    //   console.log(oldwindow + ":" + windowtime + ":" + idleTime);
    windowtime = 0;
    current_window = window;
    var AppName = document.getElementById("AppName");
    AppName.innerText = windowclass + ":" + windowtime;
    console.log(activeWindows.getActiveWindow());
  }
  // console.log(windowclass + ":" + windowtime);
}, 1000);

setInterval(function () {
  idleTime = 0;
  console.log(idle);
  app.whenReady().then(showNotification);
}, 60000);

const { Notification } = require("electron");
function showNotification() {
  const notification = {
    title: "TIME CAPTURE",
    body: windowclass,
    icon: "./Images/TC LOGO PNG 3X.png",
  };
  new Notification(notification).show();
}
