
const path = require("path");

const { BrowserWindow, app } = require("electron");


const  { createFileRoute, createURLRoute } = require('electron-router-dom')
const { join } = require('path')



const devServerURL = createURLRoute("http://localhost:3000", "main")

const fileRoute = createFileRoute(
  join(__dirname, '../index.html'),
  "main"
)

//our window you can chanege the size  and other

let mainWindow = new BrowserWindow({
  show: true,
  height: 1040,
  width: 1920,
  minWidth : 1920,
  minHeight : 1040,
  useContentSize: true,
  // frame : false,
  webPreferences: {
    preload: path.join(__dirname, "./preload.js"),
    nodeIntegration: true
  },
});




    if(app.isPackaged){
      mainWindow.loadFile(...fileRoute)
      mainWindow.removeMenu()
    }else{
      mainWindow.webContents.openDevTools({ mode: 'detach' })
      mainWindow.loadURL(devServerURL)
    }

    

module.exports = mainWindow;



