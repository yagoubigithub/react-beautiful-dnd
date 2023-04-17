import React from "react";

import { DragDropContext, Droppable } from "react-beautiful-dnd";
import Column from "./Column2";
import _data from "./data"

import styled from "@xstyled/styled-components";
import { colors } from "@atlaskit/theme";
const grid = 8;

const Container = styled.div`
background-color: ${colors.B100};
min-height: 100vh;
/* like display:flex but will allow bleeding over the window width */
min-width: 100vw;
display: inline-flex;
 
`;


const App2 = () => {
    const [data , setData] = React.useState([..._data])
  const onDragEnd = (result) => {
      console.log(result)
      
     // dropped nowhere
     if (!result.destination) {
        return;
      }

      const column = data[result.source.index];
 

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
        const ordered_data = reorder( data ,  source.index, destination.index);
  
        setData(ordered_data);
  
        return;
      }


      const ordered_data = reorderCads( data ,  result);
  
      setData(ordered_data); 
      //


  };
  const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
  
    return result;
  };
  const reorderCads = (data , result)=>{
    const source = result.source;
    const destination = result.destination;

    const destination_index_list = destination.droppableId;
    
    

    return data;

  }

  return (
    <>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="board" type="COLUMN" direction="horizontal">
          {(provided) => {
            return <Container  ref={provided.innerRef} {...provided.droppableProps}>
                {
                    data.map((columnData , indexColumn)=>{
                        return  <Column
                        key={columnData.id}
                        indexColumn={indexColumn}
                        title={columnData.name}
                        draggableId={`${columnData.id}-column`}
                        cards={columnData.cards}
                        isScrollable={true}
                        isCombineEnabled={true}
                        useClone={true}
                      />
                    })
                }
                {provided.placeholder}


            </Container>;
          }}
        </Droppable>
      </DragDropContext>
    </>
  );
};

export default App2;
