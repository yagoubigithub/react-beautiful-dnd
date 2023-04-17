import React from 'react'

import styled from '@xstyled/styled-components';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import CardItem from './CardItem2';

const grid =8;
const scrollContainerHeight = 250;

const DropZone = styled.div`
  /* stop the list collapsing when empty */
  min-height: ${scrollContainerHeight}px;
  /*
    not relying on the items for a margin-bottom
    as it will collapse when the list is empty
  */
  padding-bottom: ${grid}px;
`;
const InnerList = ({cards , dropProvided , title}) => {
  return (
    <DropZone ref={dropProvided.innerRef}>
        {cards.map((card , cardindex)=>{
        
            return (<Draggable key={card.id} draggableId={card.id} index={cardindex}>


{(dragProvided, dragSnapshot) =>{

    return (<CardItem   key={card.id}
        card={card}
        isDragging={dragSnapshot.isDragging}
        isGroupedOver={Boolean(dragSnapshot.combineTargetFor)}
        provided={dragProvided} />)
}}

            </Draggable>)
        })}

        </DropZone>
  )
}

export default InnerList