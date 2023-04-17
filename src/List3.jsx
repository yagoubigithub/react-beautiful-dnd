import React  , { useContext} from "react";

import { Draggable } from "react-beautiful-dnd";
import styled from "@xstyled/styled-components";

import { GrAdd } from "react-icons/gr";
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
  overflow-x: auto;
`;
const Header = styled.div`
  display: flex;
  justify-content: space-between;
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
  const { setData, data } = useContext(Context);

  const addCard = () => {
    const _data = [...data];
    setData(_data.map(_list=>{
      if(_list.id === list.id){
        _list.cards = [..._list.cards.map(card=>{
          return {...card, edit : false}
        }), {
          id: uuid(),
          title: "My Title",
          url : "www.google.com",
          comment : "",
          edit : true,
        }]
      }
      return _list;
    }))
  }
  const setEdit =  (list) => {

    console.log("edit" , list , listIndex)
    const _data = [...data];
   
    setData(_data.map(_list=>{
      if(list.id === _list.id){
        return {
          ..._list,
          edit : true,

        }
      }
      else{
        return {
          ..._list,
          edit : false,

        }
      }

    }))
  }
  return (
    <Draggable draggableId={`${list.id}`} index={listIndex}>
      {(provided, snapshot) => {
        return (
          <Container
            ref={provided.innerRef}
            {...provided.draggableProps}
            style={getStyle(provided, {boxShadow : list.edit ? "0px 5px 10px black" :  ""})}
          >
            <Header {...provided.dragHandleProps} onClick={()=>setEdit(list)}>
              <>
                <span>
                  {/* {list.pinned && <TbPinned />} */}

                  <h5
                    contentEditable={true}
                    style={{
                      margin: 0,
                      padding: 0,
                    }}
                    suppressContentEditableWarning={true}
                  >
                    {list.name}
                  </h5>
                </span>

                    <span  onClick={addCard} style={{cursor : "pointer !important"}}>

                    <GrAdd />
                    </span>
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
