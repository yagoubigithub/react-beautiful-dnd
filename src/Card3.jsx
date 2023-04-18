import React, { useContext , useEffect , useRef} from "react";

import styled from "@xstyled/styled-components";
import { MdOutlinePerson } from "react-icons/md";
import { Context } from "./context";




const Container = styled.div`
  background-color: ${(props) => props.edit ? "#C0E4FF" : "white"};


  margin-bottom: 8px;
  min-height :48px;

  padding: 8px;
`;

const Link = styled.div`
  font-family: "Inter";
  font-style: normal;
  font-weight: 400;

  color: #30976F;

  white-space: pre-line;
  
font-size: 10px;
line-height: 12px;
`;


const Comment = styled.div`


 
font-family: 'Inter';
font-style: normal;
font-weight: 400;
font-size: 10px;
line-height: 12px;

color: #4F70CE;
  white-space: pre-line;
  
`;

const Title = styled.div`


  
  font-family: 'Inter';
  font-style: normal;
  font-weight: 400;
  font-size: 10px;
  line-height: 12px;
  
  color: #000000;
  white-space: pre-line;
  
`;


 


const Card = ({ card, listId,provided  }) => {
  
 
  
  const { enterEditMode, save, newValue, setNewValue ,data  , disbaleEditMode} = useContext(Context);


  

  const cardRef = useRef()

 

  const handleRightClick = (e, listId, cardId) => {
    save().then(() => {
      enterEditMode(listId, cardId);
      
    });

    //enter edit mode
  };

  

  const handleInput = (e , key, id) => {
      
     
    setNewValue({
      ...newValue,
      [key]: e.target.innerText,
    });
    
    
  };

 
  return (
    <div ref={cardRef} >
      <Container
   
   edit={card.edit}
    ref={provided.innerRef}
    {...provided.draggableProps}
    {...provided.dragHandleProps}
     
      onContextMenu={(e) => handleRightClick(e, listId, card.id)}
    >
    <div style={{ display: "flex" , justifyContent : "space-between"}}>

    <div style={{ display: "flex"  }}>
        <MdOutlinePerson size="14" style={{marginRight : 5}} />
        <Link
          href={card.url}
          onInput={(e) => handleInput(e,"url", card.id)}
          contentEditable={card.edit}
          suppressContentEditableWarning={true}
          id={`card-url-${card.id}`}
        >
          {card.url}
        </Link>
      </div>
      <span style={{
       
        fontStyle: "normal",
        fontWeight: "400",
        fontSize: "10px",
        lineHeight: "12px",
        display: "flex",
        alignItems: "center",
        textAlign: "right",
        
        color: "#92929D"
        
      }}>ID : {card.id.split("-")[0]}</span>

    </div>
      <Title
        contentEditable={card.edit}
        suppressContentEditableWarning={true}
        id={`card-title-${card.id}`}
        onInput={(e) => handleInput(e, "title", card.id)}
      >
        {card.title}
      </Title>

      {card.comment !== undefined && (
        <>
          {" "}
          {card.comment.trim() === "" && card.edit && (
            <Comment
              contentEditable={card.edit}
              suppressContentEditableWarning={true}
              data-placeholder="Enter comment here"
              id={`card-comment-${card.id}`}
              onInput={(e) => handleInput(e, "comment", card.id)}
            >
              {card.comment}
            </Comment>
          )}
        </>
      )}

      {card.comment.trim() !== "" && (
        <Comment
          contentEditable={card.edit}
          suppressContentEditableWarning={true}
          id={`card-comment-${card.id}`}
          onInput={(e) => handleInput(e, "comment", card.id)}
        >
          {card.comment}
        </Comment>
      )}
    </Container>
    </div>
    
  );
};

export default Card;
