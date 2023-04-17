import React from "react";
import { Droppable, Draggable } from "react-beautiful-dnd";
import styled from "@xstyled/styled-components";
import { colors } from "@atlaskit/theme";
import Cards2 from "./Cards2";
const grid = 8;

const Container = styled.div`
  margin: ${grid}px;
  display: flex;
  flex-direction: column;
  background: white;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border-top-left-radius: ${2}px;
  border-top-right-radius: ${2}px;
  background-color: ${({ isDragging }) =>
    isDragging ? colors.G50 : colors.N30};
  transition: background-color 0.2s ease;
  &:hover {
    background-color: ${colors.G50};
  }
`;
const Title = styled.h4`
  padding: ${grid}px;
  transition: background-color ease 0.2s;
  flex-grow: 1;
  user-select: none;
  position: relative;
  &:focus {
    outline: 2px solid #998dd9;
    outline-offset: 2px;
  }
`;

const Column = ({ indexColumn, draggableId, title  , cards}) => {
  return (
    <Draggable draggableId={draggableId} index={indexColumn}>
      {(provided, snapshot) => {
        return (
          <Container ref={provided.innerRef} {...provided.draggableProps}>
            <Header isDragging={snapshot.isDragging}>
              <Title
                isDragging={snapshot.isDragging}
                {...provided.dragHandleProps}
                aria-label={`${title} quote list`}
              >
                {title}
              </Title>
            </Header>
            <Cards2
            
            
            listId={indexColumn}
            title={title}
            listType="QUOTE"
            style={{
              backgroundColor: snapshot.isDragging ? colors.G50 : null
            }}
            cards={cards}
            internalScroll={true}
            isCombineEnabled={true}
            useClone={true}
            />
          </Container>
        );
      }}
    </Draggable>
  );
};

export default Column;
