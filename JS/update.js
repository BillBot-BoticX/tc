const { autoUpdater } = require("electron-updater");
const { app, ipcMain, ipcRenderer } = require("electron");
const version = document.getElementById("version");
const notification = document.getElementById("notification");
const message = document.getElementById("message");
const restartButton = document.getElementById("restart-button");

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

ipcRenderer.send("app_version");
ipcRenderer.on("app_version", (event, arg) => {
  ipcRenderer.removeAllListeners("app_version");
  version.innerText = "Version " + arg.version;
});

ipcRenderer.on("update_available", () => {
  ipcRenderer.removeAllListeners("update_available");
  message.innerText = "A new update is available. Downloading now...";
  notification.classList.remove("hidden");
});

ipcRenderer.on("update_downloaded", () => {
  ipcRenderer.removeAllListeners("update_downloaded");
  message.innerText =
    "Update Downloaded. It will be installed on restart. Restart now?";
  restartButton.classList.remove("hidden");
  notification.classList.remove("hidden");
});

function closeNotification() {
  notification.classList.add("hidden");
}

function restartApp() {
  ipcRenderer.send("restart_app");
}
