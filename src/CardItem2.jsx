import React from 'react';
import styled from '@xstyled/styled-components';
import { CardImgOverlay } from 'reactstrap';

const grid  = 8
const borderRadius = 2;

function getStyle(provided, style) {
  if (!style) {
    return provided.draggableProps.style;
  }

  return {
    ...provided.draggableProps.style,
    ...style,
  };
}


const getBackgroundColor = (isDragging, isGroupedOver, authorColors) => {
  if (isDragging) {
    return authorColors.soft;
  }

  if (isGroupedOver) {
    return '#EBECF0';
  }

  return '#FFFFFF';
};

const getBorderColor = (isDragging, authorColors) =>
  isDragging ? authorColors.hard : 'transparent';

const imageSize = 40;



const Container = styled.a`
  border-radius: ${borderRadius}px;
  border: 2px solid transparent;
  border-color: ${(props) => getBorderColor(props.isDragging, props.colors)};
  background-color: ${(props) =>
    getBackgroundColor(props.isDragging, props.isGroupedOver, props.colors)};
  box-shadow: ${({ isDragging }) => (isDragging ? `2px 2px 1px #A5ADBA` : 'none')};
  box-sizing: border-box;
  padding: ${grid}px;
  min-height: ${imageSize}px;
  margin-bottom: ${grid}px;
  user-select: none;

  /* anchor overrides */
  color: #091e42;

  &:hover,
  &:active {
    color: #091e42;
    text-decoration: none;
  }

  &:focus {
    outline: none;
    border-color: ${(props) => props.colors.hard};
    box-shadow: none;
  }

  /* flexbox */
  display: flex;
`;

const Avatar = styled.img`
  width: ${imageSize}px;
  height: ${imageSize}px;
  border-radius: 50%;
  margin-right: ${grid}px;
  flex-shrink: 0;
  flex-grow: 0;
`;
const Content = styled.div`
  /* flex child */
  flex-grow: 1;
  /*
    Needed to wrap text in ie11
    https://stackoverflow.com/questions/35111090/why-ie11-doesnt-wrap-the-text-in-flexbox
  */
  flex-basis: 100%;
  /* flex parent */
  display: flex;
  flex-direction: column;
`;

const BlockQuote = styled.div`
  &::before {
    content: open-quote;
  }
  &::after {
    content: close-quote;
  }
`;

const Footer = styled.div`
  display: flex;
  margin-top: ${grid}px;
  align-items: center;
`;

const Author = styled.small`
  color: ${(props) => props.colors.hard};
  flex-grow: 0;
  margin: 0;
  background-color: ${(props) => props.colors.soft};
  border-radius: ${borderRadius}px;
  font-weight: normal;
  padding: ${grid / 2}px;
`;

const QuoteId = styled.small`
  flex-grow: 1;
  flex-shrink: 1;
  margin: 0;
  font-weight: normal;
  text-overflow: ellipsis;
  text-align: right;
`;
const CardItem = (props) => {

  
  const { card, isDragging, isGroupedOver, provided, style, isClone, index } = props;


  React.useEffect(()=>{
   // console.log(props)
  }, [])
  return (
    <Container   

    isDragging={isDragging}
    isGroupedOver={isGroupedOver}
    isClone={isClone}
    colors={card.colors}
    ref={provided.innerRef}
    {...provided.draggableProps}
    {...provided.dragHandleProps}
    style={getStyle(provided, style)}
    
    >

<Avatar src={card.avatarUrl} alt={card.name} />

<Content>
        <BlockQuote>{card.content}</BlockQuote>
        <Footer>
          <Author colors={card.colors}>{card.name}</Author>
          <QuoteId>
            id:
            {card.id}
          </QuoteId>
        </Footer>
      </Content>
    </Container>
  )
}

export default CardItem