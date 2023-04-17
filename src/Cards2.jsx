import React from 'react'

import { DragDropContext, Droppable } from "react-beautiful-dnd";

import styled from "@xstyled/styled-components";

import InnerList from "./InnerList2"

const getBackgroundColor = (isDraggingOver, isDraggingFrom) => {
    if (isDraggingOver) {
      return '#FFEBE6';
    }
    if (isDraggingFrom) {
      return '#E6FCFF';
    }
    return '#EBECF0';
  };
  
  const Wrapper = styled.div`
    background-color: ${(props) => getBackgroundColor(props.isDraggingOver, props.isDraggingFrom)};
    display: flex;
    flex-direction: column;
    opacity: ${({ isDropDisabled }) => (isDropDisabled ? 0.5 : 'inherit')};
    padding: ${8}px;
    border: ${8}px;
    padding-bottom: 0;
    transition: background-color 0.2s ease, opacity 0.1s ease;
    user-select: none;
    width: 250px;
  `;

const Cards2 = (props) => {
    const {
        ignoreContainerClipping,
        internalScroll,
        scrollContainerStyle,
        isDropDisabled,
        isCombineEnabled,
        listId = 'LIST',
        listType,
        style,
        quotes,
        title,
        useClone,
        cards
      } = props;
  return (
    <Droppable
    droppableId={listId}
    type={listType}
    ignoreContainerClipping={ignoreContainerClipping}
    isDropDisabled={isDropDisabled}
    isCombineEnabled={isCombineEnabled}
    
  >

      {(dropProvided, dropSnapshot)=>{
        return (   <Wrapper
            style={style}
            isDraggingOver={dropSnapshot.isDraggingOver}
            isDropDisabled={isDropDisabled}
            isDraggingFrom={Boolean(dropSnapshot.draggingFromThisWith)}
            {...dropProvided.droppableProps}
          >
               <InnerList cards={cards} title={title} dropProvided={dropProvided} />
 
              </Wrapper>)
      }}

    </Droppable>
  )
}

export default Cards2