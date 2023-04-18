import React, { useContext } from "react";

import { Draggable } from "react-beautiful-dnd";
import styled from "@xstyled/styled-components";

import { GrAdd } from "react-icons/gr";
import { RiDeleteBin6Line } from "react-icons/ri";

import ListContent from "./ListContent3";
import { TbPinned } from "react-icons/tb";

import { Context } from "./context";

import { v4 as uuid } from "uuid";

const Container = styled.div`
  background: #ebecf0;
  width: 300px;
  height: 480px;

  margin: 8px;
  padding: 8px;
  padding-top: 0;
  overflow-x: auto;
`;
const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 32px;
`;
const Title = styled.div`
  font-family: "Zen Maru Gothic";
  font-style: normal;
  font-weight: 700;
  font-size: 12px;
  line-height: 17px;
  display: flex;
  align-items: center;

  color: #000000;
  width: 225px;
  outline:none;
  &::selection {
    background: rgba(64, 70, 116, 0.2);
    color: #92929D;
  }
`;
function getStyle(provided, style) {
  if (!style) {
    return provided.draggableProps.style;
  }

  return {
    ...provided.draggableProps.style,
    ...style,
  };
}

const List = ({ list, listIndex }) => {
  const { setData, data, SaveAllData } = useContext(Context);

  const addCard = () => {
    const _data = [...data];
    const newData = _data.map((_list) => {
      if (_list.id === list.id) {
        _list.cards = [
          ..._list.cards.map((card) => {
            return { ...card, edit: false };
          }),
          {
            id: uuid(),
            title: "My Title",
            url: "www.google.com",
            comment: "",
            edit: true,
          },
        ];
      }
      return _list;
    });

    setData(newData);

    SaveAllData(newData);
  };
  const setEdit = (list) => {
    
    const _data = [...data];
    const newData = _data.map((_list) => {
      if (list.id === _list.id) {
        return {
          ..._list,
          edit: true,
        };
      } else {
        return {
          ..._list,
          edit: false,
        };
      }
    });

    setData(newData);
    SaveAllData(newData);
  };

  const hoverAddButtton = (event) => {
    event.target.style.cursor = "pointer";
  };
  const deleteList = (event , id) => {
    event.stopPropagation();
    const _data = [...data];

    const removeIndex = _data.map((item) => item.id).indexOf(id);
    console.log(removeIndex)

    if(removeIndex >= 0){
   const remeved =    _data.splice(removeIndex, 1);
   console.log(remeved)
    }
    
   

    setData([..._data]);
    SaveAllData([..._data]);
  };
  return (
    <Draggable draggableId={`${list.id}`} index={listIndex}>
      {(provided, snapshot) => {
        return (
          <Container
            ref={provided.innerRef}
            {...provided.draggableProps}
            style={getStyle(provided, {})}
          >
            <Header {...provided.dragHandleProps}
            
             onClick={() => setEdit(list)}
            
            >
              <>
                <span>
                  {/* {list.pinned && <TbPinned />} */}

                  <Title
                   contentEditable={list.editmode}
                   suppressContentEditableWarning={true}
                   id={`edit-name-${list.id}`}
                   
                  >
                  
                    {list.name}
                  </Title>
                </span>

                <span
                  onMouseOver={hoverAddButtton}
                  onClick={addCard}
                  style={{ color: "#92929D" }}
                >
                  <GrAdd className="list-icon"  size="12" />
                </span>

                {list.editmode ? <span
                  onMouseOver={hoverAddButtton}
                  onClick={(event) => deleteList(event , list.id)}
                  style={{ color: "#92929D" }}
                  id={`delete-list-icon-${list.id}`}
                >
                  <RiDeleteBin6Line className="list-icon"  size="12" />
                </span> : <span></span>}
              </>
            </Header>
            <ListContent
              list={list}
              listIndex={listIndex}
              snapshot={snapshot}
            />
          </Container>
        );
      }}
    </Draggable>
  );
};

export default List;
