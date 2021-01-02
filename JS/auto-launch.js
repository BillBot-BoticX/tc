var AutoLaunch = require("auto-launch");
var autoLauncher = new AutoLaunch({
  name: "TimeCapture",
});
// Checking if autoLaunch is enabled, if not then enabling it.
autoLauncher
  .isEnabled()
  .then(function (isEnabled) {
    if (isEnabled) return;
    autoLauncher.enable();
  })
  .catch(function (err) {
    throw err;
  });
