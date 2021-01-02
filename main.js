const { app, BrowserWindow, ipcMain } = require("electron");
//const { autoUpdater } = require("electron-updater");

const { autoUpdater } = require("electron");
const server = "https://update.electronjs.org";
const feed = `${server}/OWNER/REPO/${process.platform}-${
  process.arch
}/${app.getVersion()}`;

autoUpdater.setFeedURL("https://github.com/BillBot-BoticX/Time-Capture_test");
setInterval(() => {
  autoUpdater.checkForUpdates();
}, 1 * 60 * 1000);

//module1 = require("./Database.js");

module1 = require("./JS/Timer.js");
module2 = require("./JS/auto-launch.js");

let mainWindow, childWindow;
function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 700,
    frame: false,
    icon: __dirname + "/Images/LOGO.ico",
    title: "Time Capture app",
    webPreferences: {
      nodeIntegration: true,
    },
  });

  mainWindow.webContents.openDevTools();
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

  mainWindow.on("close", function (ev) {
    //  mainWindow = null;
    ev.preventDefault(); // prevent quit process
    ev.sender.hide();
  });
  return mainWindow;
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

// System Tray
const { Menu, Tray } = require("electron");
let tray = null;
app.whenReady().then(() => {
  tray = new Tray(__dirname + "/TC LOGO PNG 3X.png");
  const contextMenu = Menu.buildFromTemplate([
    {
      label: "Show",
      type: "checkbox",
      click: function () {
        mainWindow.show();
      },
    },
    {
      label: "Quit",
      type: "checkbox",
      click: function () {
        mainWindow.destroy();
      },
    },
  ]);
  tray.setToolTip("TIME CAPTURE");
  tray.setContextMenu(contextMenu);
  tray.on("click", function () {
    console.log("clicked");
  });
});
// Tray end

//git init
//git remote add origin https://github.com/[YOUR USERNAME]/[YOUR REPO NAME].git

// git add .
// git commit -m "Create auto-updating app"
// git push -u origin master

//git add .
//git commit -m "Version 1.0.1 update"
//git push origin master
//npm run deploy
