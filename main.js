const { app, BrowserWindow, ipcMain } = require("electron");

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
  // mainWindow.webContents.openDevTools();
  mainWindow.loadURL("https://www.google.co.in/");
  mainWindow.loadFile("./HTML/index.html");

  childWindow = new BrowserWindow({
    width: 300,
    height: 500,
    parent: mainWindow,
    dialog: true,
    frame: false,
  });
  childWindow.loadFile("./HTML/Activation.html");

  mainWindow.on("closed", function () {
    mainWindow = null;
  });
  autoUpdater.checkForUpdatesAndNotify();
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

//git init
//git remote add origin https://github.com/[YOUR USERNAME]/[YOUR REPO NAME].git

// git add .
// git commit -m "Create auto-updating app"
// git push -u origin master

//git add .
//git commit -m "Version 1.0.1 update"
//git push origin master
//npm run deploy
