import React, { useContext, useRef } from "react";

import styled from "@xstyled/styled-components";
import { MdOutlinePerson } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import { Context } from "./context";

const Container = styled.div`
  position: relative;

  background-color: ${(props) =>
    props.startlist && props.edit ? "#C0E4FF" : "white"};
  margin-bottom: 8px;
  min-height: 48px;

  padding: 8px;
  padding-left: 10px;
  padding-top: 6px;
  display: flex;
  flex-direction: column;
  gap: 6px;
  outline: none;
`;

const Link = styled.div`
  font-family: "Inter";
  font-style: normal;
  font-weight: 400;

  color: #30976f;
  outline: none;

  white-space: pre-line;

  font-size: 10px;
  line-height: 12px;
`;

const Comment = styled.div`
  font-family: "Inter";
  font-style: normal;
  font-weight: 400;
  font-size: 10px;
  line-height: 12px;
  outline: none;

  color: #4f70ce;
  white-space: pre-line;
`;

const Title = styled.div`
  font-family: "Inter";
  font-style: normal;
  font-weight: 400;
  font-size: 10px;
  line-height: 12px;

  outline: none;
  color: #000000;
  white-space: pre-line;
`;

const DeleteButton = styled.div`
  position: absolute;
  right: 0;
  top: 0;
  background: #676767;
  width: 27px;
  height: 27px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Card = ({ card, listId, provided, editmode, startlist }) => {
  const {
    enterEditMode,
    save,
    newValue,
    setNewValue,
    data,
    setData,
    SaveAllData,
  } = useContext(Context);

  const cardRef = useRef();

  const handleRightClick = (e, listId, cardId) => {
   
    if(card.edit){


      const _data = [...data];
        let index = 0;
        const newData = _data.map((list) => {
          if (list.id === listId) {
            const cards = [...list.cards];
            index = cards.map((item) => item.id).indexOf(cardId);
            list.cards = [...reorder(cards, 0, index)];
          }
          return list;
        });
  
        setData([...newData]);
        SaveAllData([...newData]);
    }else{
      const el = document.getElementById(`card-id-${cardId}`);

      const _skip = (event) => skipeditmode(event, el);
  
      const skipeditmode = (event, el) => {
        console.log(event.target, el);
        if (el.isEqualNode(event.target) || el.contains(event.target)) {
          // Clicked in box
          console.log("Clicked in box");
        } else {
          // Clicked outside the box
          console.log("Clicked outside the box");
          const _data = JSON.parse(localStorage.getItem("data"));
  
          const newData = _data.map((list) => {
            return {
              ...list,
              cards: list.cards.map((card) => {
                return {
                  ...card,
                  edit: false,
                };
              }),
            };
          });
  
          SaveAllData(newData);
          setData(newData);
          document.removeEventListener("click", _skip, true);
        }
      };
  
      if (!startlist) {
        save().then(() => {
          enterEditMode(listId, cardId);
  
          setTimeout(() => {
            document.addEventListener("click", _skip, true);
          }, 200);
        });
      } else {
        const _data = [...data];
        let index = 0;
        const newData = _data.map((list) => {
          if (list.id === listId) {
            const cards = [...list.cards];
            index = cards.map((item) => item.id).indexOf(cardId);
            list.cards = [...reorder(cards, 0, index)];
          }
          return list;
        });
  
        setData([...newData]);
        SaveAllData([...newData]);
      }
    }
  };
  const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const a = result[startIndex];
    const b = result[endIndex];
    result[endIndex] = a;
    result[startIndex] = b;

    return result;
  };

  const handleClick = (e, listId, cardId) => {
    if (startlist) {
      save().then(() => {
        enterEditMode(listId, cardId);
      });
    } else {
    }

    //enter edit mode
  };

  const handleInput = (e, key, id) => {
    setNewValue({
      ...newValue,
      [key]: e.target.innerText,
    });
  };

  const hover = (event) => {
    event.stopPropagation();
    event.target.style.cursor = "pointer";
  };
  const hoverEdit = (event) => {
    event.stopPropagation();
    if (card.edit) {
      event.target.style.cursor = "text";
    }
  };

  const deleteCard = (event, listId, id) => {
    event.stopPropagation();
    const _data = [...data];
    const newData = _data.map((list) => {
      if (list.id === listId) {
        const cards = [...list.cards];
        const removeIndex = cards.map((item) => item.id).indexOf(id);
        if (removeIndex >= 0) {
          cards.splice(removeIndex, 1);
          list.cards = cards;
        }
      }
      return list;
    });

    setData([...newData]);
    SaveAllData([...newData]);
  };
  const open = (url, edit) => {
    if (startlist) {
    } else {
      if (!edit) {
        console.log(url);
        window.electron.openUrl({ url });
        return;
      }
    }
  };

  return (
    <div ref={cardRef}>
      <Container
        edit={card.edit}
        ref={provided.innerRef}
        {...provided.draggableProps}
        {...provided.dragHandleProps}
        onContextMenu={(e) => handleRightClick(e, listId, card.id)}
        onClick={(e) => handleClick(e, listId, card.id)}
        id={`card-id-${card.id}`}
        onMouseOver={hover}
        startlist={startlist}
      >
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div style={{ display: "flex" }}>
            <MdOutlinePerson size="14" style={{ marginRight: 5 }} />
            <Link
              href={card.url}
              onInput={(e) => handleInput(e, "url", card.id)}
              contentEditable={card.edit}
              suppressContentEditableWarning={true}
              id={`card-url-${card.id}`}
              onClick={() => open(card.url, card.edit)}
              onMouseOver={hoverEdit}
            >
              {card.url}
            </Link>
          </div>
          <span
            style={{
              fontStyle: "normal",
              fontWeight: "400",
              fontSize: "10px",
              lineHeight: "12px",
              display: "flex",
              alignItems: "center",
              textAlign: "right",

              color: "#92929D",
            }}
          >
            ID : {card.id.split("-")[0]}
          </span>
        </div>
        <Title
          contentEditable={card.edit}
          suppressContentEditableWarning={true}
          id={`card-title-${card.id}`}
          onInput={(e) => handleInput(e, "title", card.id)}
          onMouseOver={hoverEdit}
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
                onMouseOver={hoverEdit}
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
            onMouseOver={hoverEdit}
          >
            {card.comment}
          </Comment>
        )}

        {card.edit && (
          <DeleteButton
            onMouseOver={hover}
            onClick={(event) => deleteCard(event, listId, card.id)}
          >
            <RiDeleteBin6Line color="#ffffff" size="16" />
          </DeleteButton>
        )}
      </Container>
    </div>
  );
};

export default Card;
