// Copyright 2022-2023 eContriver, LLC


const {contextBridge, shell , ipcRenderer , dialog} = require('electron');
const util = require("util");


contextBridge.exposeInMainWorld('electron', {

  

  
    openUrl: async ({url } ) => {
     
       
       shell.openExternal(url).then(()=>{

       })
       .then(()=>{

        
       })
       .catch((error)=>{
           ipcRenderer.send(":message" ,  {
            title : "error",
            message : "invalid url we can't open this url"
        } )
          
           
       })


      
        
        
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
    