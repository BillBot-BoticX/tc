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
