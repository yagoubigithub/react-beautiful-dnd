
const path = require("path");

let mainWindow = require("./windows/mainWindow");

const { app, ipcMain } = require("electron");
const { v4 : uuid}  =  require("uuid");

const data = [
    {
        id : uuid(),
        name : "new List 1",
        edit : true,
        cards : [{
            id : uuid(),
            url : "bbc.com/index.html",
            title :  "Banana Cat Dog Elephant",
            comment : ""
        }, 
        {
            id : uuid(),
            url : "bbc.com/index.html",
            title :  "Banana Cat Dog Elephant",
            comment : ""
        },
        {
            id : uuid(),
            url : "bbc.com/index.html",
            title :  "Banana Cat Dog Elephant",
            comment : ""
        },{
            id : uuid(),
            url : "bbc.com/index.html",
            title :  "Banana Cat Dog Elephant",
            comment : ""
        }]
    },
    {
        id : uuid(),
        name : "new List 2",
       
        cards : [{
            id : uuid(),
            url : "tt.com/index.php",
            title :  "Hello world",
            comment : "This is a comment"
        }, 
        {
            id : uuid(),
            url : "bbc.com/index.html",
            title :  "Banana Cat Dog Elephant",
            comment : ""
        },
        {
            id : uuid(),
            url : "bbc.com/index.html",
            title :  "Banana Cat Dog Elephant",
            comment : ""
        },{
            id : uuid(),
            url : "bbc.com/index.html",
            title :  "Banana Cat Dog Elephant",
            comment : ""
        }]
    }
    ,
    {
        id : uuid(),
        pinned :  true,
        name : "new List 3",
        cards : [{
            id : uuid(),
            url : "bbc.com/index.html",
            title :  "Banana Cat Dog Elephant",
            comment : ""
        }, 
        {
            id : uuid(),
            url : "bbc.com/index.html",
            title :  "Banana Cat Dog Elephant",
            comment : ""
        },
        {
            id : uuid(),
            url : "bbc.com/index.html",
            title :  "Banana Cat Dog Elephant",
            comment : ""
        },{
            id : uuid(),
            url : "bbc.com/index.html",
            title :  "Banana Cat Dog Elephant",
            comment : ""
        }]
    },
    {
        id : uuid(),
        name : "new List 4",
        cards : [{
            id : uuid(),
            url : "bbc.com/index.html",
            title :  "Banana Cat Dog Elephant",
            comment : ""
        }, 
        {
            id : uuid(),
            url : "bbc.com/index.html",
            title :  "Banana Cat Dog Elephant",
            comment : ""
        },
        {
            id : uuid(),
            url : "bbc.com/index.html",
            title :  "Banana Cat Dog Elephant",
            comment : ""
        },{
            id : uuid(),
            url : "bbc.com/index.html",
            title :  "Banana Cat Dog Elephant",
            comment : ""
        }]
    },
    {
        
        id : uuid(),
        name : "new List 5",
        cards : []
    }
]

const dbName = "data";
const db = require('electron-db');
const dbLocation  = __dirname


try {
    if (db.valid(dbName , dbLocation)) {
        db.count(dbName, dbLocation, (succ, count) => {
            if (succ) {
                if(count === 0){
    
                   initTable()
                }
            } else {
                console.log('An error has occured.')
                console.log(count)
            }
        })
        
    
    
    }else{
        db.createTable('data', dbLocation, (succ, msg) => {
            // succ - boolean, tells if the call is successful
            if (succ) {
              console.log(msg)
              initTable()
            } else {
              console.log('An error has occured. ' + msg)
            }
          })
    }
    
} catch (error) {
    db.createTable('data', dbLocation, (succ, msg) => {
        // succ - boolean, tells if the call is successful
        if (succ) {
          console.log(msg)
          initTable()
        } else {
          console.log('An error has occured. ' + msg)
        }
      })
}
  
function initTable (){
    for (let i = 0; i < data.length; i++) {
        const list = data[i];
        db.insertTableContent(dbName , dbLocation, list, (succ, msg) => {
         // succ - boolean, tells if the call is successful
         console.log("Success: " + succ);
         console.log("Message: " + msg);
       })
        
    }
}


ipcMain.on(":get-all-data" ,  (event , value)=>{
    db.getAll(dbName ,dbLocation, (succ, data) => {
        // succ - boolean, tells if the call is successful
        // data - array of objects that represents the rows.
        console.log(succ , data)

        mainWindow.webContents.send(":all-data" , data)
      })
      
})
module.exports = db;