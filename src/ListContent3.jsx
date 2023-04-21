import React from "react";
import Card from "./Card3";

import { Droppable, Draggable } from "react-beautiful-dnd";


import styled from "@xstyled/styled-components";

const getBackgroundColor = (isDraggingOver, isDraggingFrom ) => {
  
  if (isDraggingOver) {
    return "#FFEBE6";
  }
  if (isDraggingFrom) {
    return "#E6FCFF";
  }
  return "#EBECF0";
};

const Container = styled.div`
  padding-top: 8px;
  background-color: ${(props) =>
    getBackgroundColor(props.isDraggingOver, props.isDraggingFrom )};

  min-height: calc(480px - 42px);
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  opacity: ${({ isDropDisabled }) => (isDropDisabled ? 0.5 : "inherit")};

  padding-bottom: 0;
  transition: background-color 0.2s ease, opacity 0.1s ease;
  user-select: none;
`;
const ListContent = ({ list, listIndex, listType, snapshot }) => {
  return (
    <Droppable
      droppableId={`${list.id}`}
      type="QUOTE"
      key={`${list.name}`}
      ignoreContainerClipping={true}
      isCombineEnabled={true}
    >
      {(dropProvided, dropSnapshot) => {
        return (
          <Container
            ref={dropProvided.innerRef}
          
            isDraggingOver={dropSnapshot.isDraggingOver}
            isDropDisabled={false}
            isDraggingFrom={Boolean(dropSnapshot.draggingFromThisWith)}
            {...dropProvided.droppableProps}
          >
            {list.cards &&
              list.cards.map((card, cardIndex) => {
                return (
                  <Wrapper key={`${card.id}`}>
                    <Draggable draggableId={`${card.id}`} index={cardIndex}>
                      {(dragProvided, dragSnapshot) => {
                        return (
                          <span>
                            <Card
                              provided={dragProvided}
                              editmode={list.editmode}
                              listId={list.id}
                              startlist={list.startlist}
                              listIndex={listIndex}
                              card={card}
                              cardIndex={cardIndex}
                            />
                          </span>
                        );
                      }}
                    </Draggable>
                  </Wrapper>
                );
              })}
            {dropProvided.placeholder}
          </Container>
        );
      }}
    </Droppable>
  );
};

export default ListContent;
