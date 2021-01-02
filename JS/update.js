const Mwindow = require("electron").remote.getCurrentWindow();
const app = require("electron").remote;
document.getElementById("close").addEventListener("click", function () {
  Mwindow.close();
});

document.getElementById("max").addEventListener("click", function () {
  Mwindow.maximize();
});
document.getElementById("min").addEventListener("click", function () {
  Mwindow.minimize();
});
