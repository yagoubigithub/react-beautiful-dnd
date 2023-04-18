import React, { useContext  , useEffect} from "react";

import styled from "@xstyled/styled-components";

import { DragDropContext, Droppable } from "react-beautiful-dnd";
import List from "./List3";

import { v4 as uuid } from 'uuid';
import { Context } from "./context";

const Container = styled.div`
  background-color: #4c9aff;
  max-height: calc(100vh - 34px);
  height: calc(100vh - 34px);

  min-width: 100vw;
  display: inline-flex;
  flex-wrap: wrap;
  overflow-y: auto;
`;

const Dnd = () => {
  const { data, setData  , save , SaveAllData  } = useContext(Context);


  const handleClick = (event) =>{
   
    save().then(() => {
     console.log("save")
      
    });
  }
 
  useEffect(()=>{
    window.electron.save(()=>{

      save().then(() => {
        console.log("save")
         
       });
    })

    window.electron.create(create)

  } , [])


  const create = async ()=>{

      
    const _data = JSON.parse(localStorage.getItem("data"));

    console.log(_data)
    
    const text = await navigator.clipboard.readText();
   const id  = uuid()
    const card = {
      ...JSON.parse(text),
      comment : "",
      id ,
      edit : true
    }
    
    
    
    const selectedList = _data.filter(list=>list.edit)[0] || {}

    const cards = [...selectedList.cards];
    cards.unshift(card)
    selectedList.cards = cards;
   
    const newData = [..._data.map((list)=>{

    
      list.cards = [...list.cards.map(card=>{
        return {
          ...card,
          edit : card.id === id
        }
      })]
      if(list === selectedList) return selectedList
      return list

    })]
    SaveAllData(newData)
    setData(newData)

  }
  const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
  };
 
  const onDragEnd = (result) => {
    // dropped nowhere
    if (!result.destination) {
      return;
    }

    const source = result.source;
    const destination = result.destination;

    // did not move anywhere - can bail early
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return;
    }

    // reordering column
    if (result.type === "COLUMN") {
      const ordered_data = reorder(data, source.index, destination.index);

      
      setData(ordered_data);
      SaveAllData(ordered_data)

      return;
    }

    const ordered_data = reorderCads(data, result);

    setData(ordered_data);
    SaveAllData(ordered_data)
  };
  const reorderCads = (data, result) => {
    
    const source = result.source;
    const destination = result.destination;

    let removed = null;
    data.map((list) => {
      if (list.id == source.droppableId) {
        const _result = Array.from(list.cards);
        removed = _result.splice(source.index, 1)[0];
        list.cards = [..._result];
      }
    });
    const _data = data.map((list) => {
      if (list.id == destination.droppableId) {
       
        list.cards.splice(destination.index, 0, removed);
      }
      return list;
    });

    return _data;
  };
  return (
    <div onClick={handleClick}>

<DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="board" type="COLUMN" direction="horizontal">
        {(provided, dropSnapshot) => (
          <Container
            ref={provided.innerRef}
            {...provided.droppableProps}
            isDraggingOver={dropSnapshot.isDraggingOver}
            isDropDisabled={false}
            isDraggingFrom={Boolean(dropSnapshot.draggingFromThisWith)}
          >
            {data.map((list, listIndex) => {
              return <List key={list.id} list={list} listIndex={listIndex} />;
            })}
            {provided.placeholder}
          </Container>
        )}
      </Droppable>
    </DragDropContext>
    </div>
  );
};

export default Dnd;
