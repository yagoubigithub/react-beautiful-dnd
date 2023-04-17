
import { v4 as uuid } from 'uuid';

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
export default data;