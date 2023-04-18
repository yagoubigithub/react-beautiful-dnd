// Copyright 2022-2023 eContriver, LLC
const {contextBridge, shell , ipcRenderer} = require('electron');


contextBridge.exposeInMainWorld('electron', {

  
    openUrl:({url}) => {
     console.log(url)
        shell.openExternal(url)
       
        
        
    },
    save: (callback) => {
        
        ipcRenderer.on(":save", callback);
        return () => {
            ipcRenderer.removeListener(":save", callback);
        };
    },
    create: (callback) => {
        
        ipcRenderer.on(":create", callback);
        return () => {
            ipcRenderer.removeListener(":create", callback);
        };
    },
    getAllData: (callback) => {
        
        ipcRenderer.send(":get-all-data", {});
        callback()
       
    },
    allData :  (callback)=>{
        ipcRenderer.on(":all-data", callback);
        return () => {
            ipcRenderer.removeListener(":all-data", callback);
        };
    }

});
    