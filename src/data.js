import { colors } from "@atlaskit/theme";
import finnImg from "./dnd/static/finn-min.png";
import bmoImg from "./dnd/static/bmo-min.png";
import princessImg from "./dnd/static/princess-min.png";
import jakeImg from "./dnd/static/jake-min.png";

const data = [
  {
    id: "1",
    name: "Jake",
    url: "http://adventuretime.wikia.com/wiki/Jake",
    avatarUrl: jakeImg,
    colors: {
      soft: colors.Y50,
      hard: colors.N400A,
    },
    cards: [{
        id: "2",
        content:
          "Sucking at something is the first step towards being sorta good at something.",
          author : "jake"
        
      } , {
        id: "3",
        content: "You got to focus on what's real, man",
        author : "jake"
     
      }],
  },
  {
    id: "2",
    name: "BMO",
    url: "http://adventuretime.wikia.com/wiki/BMO",
    avatarUrl: bmoImg,
    colors: {
      soft: colors.G50,
      hard: colors.N400A,
    },
    cards: [
        {
            id: "1",
            content: "Sometimes life is scary and dark",
            author :  "bmo"
          
          }
    ],
  },
  {
    id: "3",
    name: "Finn",
    url: "http://adventuretime.wikia.com/wiki/Finn",
    avatarUrl: finnImg,
    colors: {
      soft: colors.B50,
      hard: colors.N400A,
    },
    
    cards : [{
        id: "4",
        content: "Is that where creativity comes from? From sad biz?",
        author: "finn"
      } ,  {
        id: "5",
        content: "Homies help homies. Always",
        author: "finn"
      },
      {
        id: "8",
        content:
          "People make mistakes. It's all a part of growing up and you never really stop growing",
        author: "finn"
      },
      {
        id: "9",
        content: "Don't you always call sweatpants 'give up on life pants,' Jake?",
        author: "finn"
      }
    
    ],
  },

  {
    id: "4",
    name: "Princess bubblegum",
    url: "http://adventuretime.wikia.com/wiki/Princess_Bubblegum",
    avatarUrl: princessImg,
    colors: {
      soft: colors.P50,
      hard: colors.N400A
    },
    cards : [{
        id: "6",
        content: "Responsibility demands sacrifice",
        author: "princess"
      } , {
        id: "7",
        content: "That's it! The answer was so simple, I was too smart to see it!",
        author: "princess"
      } , 
      {
        id: "10",
        content: "I should not have drunk that much tea!",
        author: "princess"
      },
      {
        id: "11",
        content: "Please! I need the real you!",
        author: "princess"
      },
      {
        id: "12",
        content: "Haven't slept for a solid 83 hours, but, yeah, I'm good.",
        author: "princess"
      }
    
    ]
  }
];
export default data.map(d=>{
    return {
        ...d,
        cards : d.cards.map(card => {
            return {
                ...card,
                name: d.name,
                url: d.url,
                avatarUrl: d.avatarUrl,
                colors : d.colors
                
            }

        })
    }
});
