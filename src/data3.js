
import { v4 as uuid } from 'uuid';

const data = [
    {
        id : uuid(),
        name : "StarterList",
        startlist :true,
        edit : true,
        pinned :  true,
        cards : [{
            id : uuid(),
            url : "https://www.google.com/",
            title :  "Banana Cat Dog Elephant",
            comment : ""
        }, 
        {
            id : uuid(),
            url : "https://www.google.com/",
            title :  "Banana Cat Dog Elephant",
            comment : ""
        },
        {
            id : uuid(),
            url : "https://www.google.com/",
            title :  "Banana Cat Dog Elephant",
            comment : ""
        },{
            id : uuid(),
            url : "https://www.google.com/",
            title :  "Banana Cat Dog Elephant",
            comment : ""
        }]
    },
    {
        id : uuid(),
        name : "new List 2",
       
        cards : [{
            id : uuid(),
            url : "https://www.google.com/",
            title :  "Hello world",
            comment : "This is a comment"
        }, 
        {
            id : uuid(),
            url : "https://www.google.com/",
            title :  "Banana Cat Dog Elephant",
            comment : ""
        },
        {
            id : uuid(),
            url : "https://www.google.com/",
            title :  "Banana Cat Dog Elephant",
            comment : ""
        },{
            id : uuid(),
            url : "https://www.google.com/",
            title :  "Banana Cat Dog Elephant",
            comment : ""
        }]
    }
    ,
    {
        id : uuid(),
       
        name : "new List 3",
        cards : [{
            id : uuid(),
            url : "https://www.google.com/",
            title :  "Banana Cat Dog Elephant",
            comment : ""
        }, 
        {
            id : uuid(),
            url : "https://www.google.com/",
            title :  "Banana Cat Dog Elephant",
            comment : ""
        },
        {
            id : uuid(),
            url : "https://www.google.com/",
            title :  "Banana Cat Dog Elephant",
            comment : ""
        },{
            id : uuid(),
            url : "https://www.google.com/",
            title :  "Banana Cat Dog Elephant",
            comment : ""
        }]
    },
    {
        id : uuid(),
        name : "new List 4",
        cards : [{
            id : uuid(),
            url : "https://www.google.com/",
            title :  "Banana Cat Dog Elephant",
            comment : ""
        }, 
        {
            id : uuid(),
            url : "https://www.google.com/",
            title :  "Banana Cat Dog Elephant",
            comment : ""
        },
        {
            id : uuid(),
            url : "https://www.google.com/",
            title :  "Banana Cat Dog Elephant",
            comment : ""
        },{
            id : uuid(),
            url : "https://www.google.com/",
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