const { app , globalShortcut } = require("electron");



app.on("ready", async () => {
  
 

  let mainWindow = require("./windows/mainWindow");

  //dev tools for installing extention help to develop

  const ret = globalShortcut.register('CommandOrControl+L', () => {
    console.log('CommandOrControl+L is pressed')
    mainWindow.webContents.send(":save",{})
  })

  const copy = globalShortcut.register('CommandOrControl+T', () => {
    console.log('CommandOrControl+T is pressed')
    mainWindow.webContents.send(":create",{})
  })

//   const DevTools = require('./devTools')
//   const devTools = new DevTools(!app.isPackaged);

});


app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
  })