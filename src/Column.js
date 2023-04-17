import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";





const getItemStyle = (isDragging, draggableStyle) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: "none",
  background: "white",
  display: "flex",
  flexDirection: "column",
  margin: `${grid}px`,
  border: `${grid}px`,
  paddingBottom: 0,
  transition: "background-color 0.2s ease, opacity 0.1s ease",
  width: "250px",

  // change background colour if dragging

  // styles we need to apply on draggables
  ...draggableStyle,
});

const grid = 8;
const getBackgroundColor = (isDraggingOver, isDraggingFrom) => {
  if (isDraggingOver) {
    return "#FFEBE6";
  }
  if (isDraggingFrom) {
    return "#E6FCFF";
  }
  return "#EBECF0";
};
const getColumStyle = (isDraggingOver, isDraggingFrom) => ({
  background: getBackgroundColor(isDraggingOver, isDraggingFrom),

  padding: grid,
  width: 280,
  margin: 4,
  height: "100vh",
  maxHeight: "100vh",
  overflowX: "hidden",
  overflowY: "auto",
});

const Column = ({ind , el , move , reorder , state , setState , edit , deleteComment , addComment , _provided  , _snapshot  }) => {
  
      function onDragEnd(result) {
        const { source, destination } = result;
    
        // dropped outside the list
        if (!destination) {
          return;
        }
        const sInd = +source.droppableId;
        const dInd = +destination.droppableId;
    
        if (sInd === dInd) {
          const items = reorder(state[sInd], source.index, destination.index);
          const newState = [...state];
          newState[sInd] = items;
          setState(newState);
        } else {
          const result = move(state[sInd], state[dInd], source, destination);
          const newState = [...state];
          newState[sInd] = result[sInd];
          newState[dInd] = result[dInd];
    
          setState(newState.filter((group) => group.length));
        }
      }
      const open = (url) => {
        window.electron.openUrl({ url });
      };
     
  return (
   <div>
       
       <h1  ref={_provided.innerRef}
      
        {..._provided.droppableProps} style={{background : "white" , margin : 0}}>{el[el.length -1].name}</h1>
    <Droppable key={ind} droppableId={`${ind}`}>
    {(provided, snapshot) => (
      <div
        ref={provided.innerRef}
        style={getColumStyle(
          snapshot.isDraggingOver,
          snapshot.isDraggingFrom
        )}
        {...provided.droppableProps}
      >
        
        {el.map((item, index) => (
          <Draggable
            key={item.id}
            draggableId={item.id}
            index={index}
          >
            {(provided, snapshot) => (
              <div
                ref={provided.innerRef}
                {...provided.draggableProps}
                {...provided.dragHandleProps}
                style={getItemStyle(
                  snapshot.isDragging,
                  provided.draggableProps.style
                )}
                onClick={() => open(item.url)}
              >
                <div style={{ display: "flex" }}>
                  <img
                    style={{
                      width: 35,
                      height: 35,
                      borderRadius: "50%",
                      margin: 5,
                    }}
                    src={`./img/${item.author}.png`}
                  />
                
                  <div style={{ padding: 5 }}>
                  <h3> {item.title}</h3>
                    {item.comments.map((comment, commentIndex) => (
                      <div>
                        
                        {comment && (
                          <>
                            <blockquote
                              contenteditable="true"
                              onClick={(event) =>
                                event.stopPropagation()
                              }
                              onInput={() =>
                                edit(
                                  `comment${commentIndex}-${item.id}`,
                                  ind,
                                  index,
                                  commentIndex
                                )
                              }
                              id={`comment${commentIndex}-${item.id}`}
                            >
                              <p>{comment}</p>
                            </blockquote>
                            <button
                              onClick={(event) =>
                                deleteComment(
                                  event,
                                  ind,
                                  index,
                                  commentIndex
                                )
                              }
                            >
                              delete
                            </button>
                          </>
                        )}
                      </div>
                    ))}

                  <div style={{ display : "flex" , justifyContent :"flex-end", alignItems : "center", height : 40}}>
                  <button onClick={(event) =>
                                addComment(
                                  event,
                                  ind,
                                  index
                                )
                              }>add comment</button>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <div className="author">{item.author}</div>
                      <div>{item.id}</div>
                    </div>
                  </div>

                
                </div>
              </div>
            )}
          </Draggable>
        ))}
        {provided.placeholder}
      </div>
    )}
  </Droppable>
   </div>
  )
}

export default Column