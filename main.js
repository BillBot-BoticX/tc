const { app, BrowserWindow, ipcMain } = require("electron");
const { autoUpdater } = require("electron-updater");
let mainWindow, childWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 700,
    frame: false,
    icon: "./Images/TC LOGO PNG 3X.png",
    title: "Time Capture app",
    webPreferences: {
      nodeIntegration: true,
    },
  });

  mainWindow.webContents.openDevTools();
  mainWindow.loadURL("https://www.google.co.in/");
  mainWindow.loadFile("./HTML/index.html");
  autoUpdater.checkForUpdatesAndNotify();
  // childWindow = new BrowserWindow({
  //   width: 300,
  //   height: 500,
  //   parent: mainWindow,
  //   dialog: true,
  //   frame: false,
  // });
  // childWindow.loadFile("./HTML/Activation.html");

  mainWindow.on("closed", function () {
    mainWindow = null;
  });
}

app.on("ready", () => {
  createWindow();
});

app.on("window-all-closed", function () {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", function () {
  if (mainWindow === null) {
    createWindow();
  }
});

ipcMain.on("app_version", (event) => {
  event.sender.send("app_version", { version: app.getVersion() });
});

autoUpdater.on("update-available", () => {
  mainWindow.webContents.send("update_available");
});

autoUpdater.on("update-downloaded", () => {
  mainWindow.webContents.send("update_downloaded");
});

ipcMain.on("restart_app", () => {
  autoUpdater.quitAndInstall();
});

const { Menu, Tray } = require("electron");
let tray = null;

app.whenReady().then(() => {
  tray = new Tray("./Images/TC LOGO PNG 3X.png");
  const contextMenu = Menu.buildFromTemplate([
    { label: "DISABLE", type: "radio" },
    { label: "LOGOUT", type: "radio" },
    { label: "RESTART", type: "radio", checked: true },
    { label: "OPEN", type: "radio" },
  ]);
  tray.setToolTip("TIME CAPTURE");
  tray.setContextMenu(contextMenu);
  console.log(contextMenu.items[2].checked);
});

setInterval(function () {
  app.whenReady().then(showNotification);
}, 10000);

const { Notification } = require("electron");
function showNotification() {
  const notification = {
    title: "TIME CAPTURE",
    body: windowclass,
    icon: "./Images/TC LOGO PNG 3X.png",
  };
  new Notification(notification).show();
}

//git init
//git remote add origin https://github.com/[YOUR USERNAME]/[YOUR REPO NAME].git

// git add .
// git commit -m "Create auto-updating app"
// git push -u origin master

//git add .
//git commit -m "Version 1.0.1 update"
//git push origin master
//npm run deploy
