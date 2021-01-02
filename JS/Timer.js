const activeWindows = require("active-windows");
const module1 = require("../Database.js");
let windowData = [];
let TimeData = [];

const fs = require("fs");
let configdata = fs.readFileSync("config.json");
const config = JSON.parse(configdata);

let Wrawdata = fs.readFileSync("Wdata.json");
const Wdata = JSON.parse(Wrawdata);
if (Wdata.length > 0) {
  for (var l = 0; l < Wdata.length; l++) {
    windowData.push(Wdata[l]);
  }
}
let rawdata = fs.readFileSync("Data.json");
const Tdata = JSON.parse(rawdata);
if (Tdata.length > 0) {
  for (var lg = 0; lg < Tdata.length; lg++) {
    TimeData.push(Tdata[lg]);
  }
}

var current_window,
  window,
  idle = 0,
  idleTime = 0,
  windowtime = 0,
  oldwindow,
  oldwindowtime,
  oldwindowName;

setInterval(function () {
  idle = activeWindows.getActiveWindow().idleTime;
  if (idle > 30) {
    idleTime = idleTime + 1;
  }
  window = activeWindows.getActiveWindow().windowPid;
  windowclass = activeWindows.getActiveWindow().windowClass;
  windowName = activeWindows.getActiveWindow().windowName;

  if (current_window == window) {
    windowtime = windowtime + 1;
    oldwindowtime = windowtime;
    oldwindow = windowclass;
    oldwindowName = windowName;
  } else {
    if (oldwindow !== undefined && windowtime > 0) {
      pushWindowData(
        oldwindow,
        oldwindowtime,
        idleTime,
        oldwindowName,
        windowData
      );
    }
    windowtime = 0;
    current_window = window;
  }
  // console.log(windowclass + ":" + windowtime);
}, 1000);

setInterval(function () {
  pushTimeData(idle, idleTime);
  idleTime = 0;
}, 5000);

async function pushWindowData(
  oldwindow,
  oldwindowtime,
  idleTime,
  oldwindowName
) {
  windowData.push({
    oldwindow: oldwindow,
    oldwindowtime: oldwindowtime,
    idleTime: idleTime,
    oldwindowName: oldwindowName,
  });
  await writeWindowJson(windowData);
  for (let i = 0; i < windowData.length; i++) {
    const { Client } = require("pg");
    const db = new Client({
      host: config[0].host,
      user: config[0].user,
      password: config[0].password,
      database: config[0].database,
      port: config[0].port,
    });
    await db.connect((err) => {
      if (err) {
      } else {
        sql =
          " insert into spybot_title (app_name,active_time,idle_time,windowtitle) values('" +
          windowData[i].oldwindow +
          "','" +
          windowData[i].oldwindowtime +
          "','" +
          windowData[i].idleTime +
          "','" +
          windowData[i].oldwindowName +
          "')";
        db.query(sql, function (err, result, fields) {
          // if (err) throw err;
          db.end();
        });
        var b = windowData.length - 1;
        if (i === windowData.length - 1) {
          windowData = [];
          writeWindowJson(windowData);
        }
      }
    });
  }
}

async function pushTimeData(idle, idleTime) {
  TimeData.push({
    idle: idle,
    idleTime: idleTime,
  });
  await writeJson(TimeData);
  for (let x = 0; x < TimeData.length; x++) {
    const { Client } = require("pg");
    const db = new Client({
      host: config[0].host,
      user: config[0].user,
      password: config[0].password,
      database: config[0].database,
      port: config[0].port,
    });
    await db.connect(async (err) => {
      if (err) {
      } else {
        var sqlT =
          " insert into spybot (idle,idle_interval,active_interval,total_time) values('" +
          TimeData[x].idle +
          "','" +
          TimeData[x].idleTime +
          "','" +
          (60 - TimeData[x].idleTime) +
          "','" +
          60 +
          "')";

        await db.query(sqlT, function (err, result, fields) {
          // if (err) throw err;
          db.end();
        });

        if (x == TimeData.length - 1) {
          TimeData = [];
          await writeJson(TimeData);
        }
      }
    });
  }
}

function writeJson(Wdata) {
  var fs = require("fs");
  fs.writeFile("Data.json", JSON.stringify(Wdata), function (err) {
    //  if (err) throw err;
  });
}

function writeWindowJson(data) {
  var fs = require("fs");
  fs.writeFile("Wdata.json", JSON.stringify(data), function (err) {
    // if (err) throw err;
  });
}
