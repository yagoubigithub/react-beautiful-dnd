import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import Column from "./Column";

const getItems = (count, offset = 0, name) =>
  Array.from({ length: count }, (v, k) => k).map((k) => ({
    id: `G-${k + offset}-item`,

    url: "https://github.com/atlassian/react-beautiful-dnd/",

    comments: [
      "Is that where creativity comes from? From sad biz?",
      "Homies help homies. Always",
      "Responsibility demands sacrifice",
    ],
    title: "My title",
    author: name,
    name,
  }));

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const move = (source, destination, droppableSource, droppableDestination) => {
  const sourceClone = Array.from(source);
  const destClone = Array.from(destination);
  const [removed] = sourceClone.splice(droppableSource.index, 1);

  destClone.splice(droppableDestination.index, 0, removed);

  const result = {};
  result[droppableSource.droppableId] = sourceClone;
  result[droppableDestination.droppableId] = destClone;

  return result;
};
const grid = 8;

const getListStyle = () => ({
  background: "lightblue",
  flexDirection: "row",
  width: "100vw",
  height: "100vh",
  display: "flex",
});
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

const App = () => {
  const [state, setState] = useState([
    getItems(5, 1, "finn"),
    getItems(5, 10, "bmo"),
    getItems(5, 199, "jake"),
  ]);

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
  const edit = (id, ind, index, commentIndex) => {
    const _state = [...state];
    const comments = [..._state[ind][index].comments];
    comments[commentIndex] = document.getElementById(id).innerText;
    _state[ind][index].comments = comments;

    setState(_state);
  };

  const deleteComment = (event, ind, index, commentIndex) => {
    event.stopPropagation();
    const _state = [...state];
    const comments = [..._state[ind][index].comments];
    comments[commentIndex] = null;
    _state[ind][index].comments = comments;
    setState(_state);
  };

  const addComment = (event, ind, index) => {
    event.stopPropagation();
    const _state = [...state];
    const comments = [..._state[ind][index].comments];
    comments.push("new Comment....");
    _state[ind][index].comments = comments;
    setState(_state);
  };
  return (
    <div>
      <div style={getListStyle()}>
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable
            droppableId="board"
            type="COLUMN"
            direction="horizontal"
            ignoreContainerClipping={true}
            isCombineEnabled={true}
          >
            {(provided, snapshot) => {
              return (
                <div
                  ref={provided.innerRef}
                  style={getListStyle(
                    snapshot.isDraggingOver,
                    snapshot.isDraggingFrom
                  )}
                  {...provided.droppableProps}
                >
                  {state.map((el, ind) => (
                    <Draggable key={ind} draggableId={ind} index={ind}>
                      {(_provided, _snapshot) => (
                        <Column
                          _provided={_provided}
                          _snapshot={_snapshot}
                          ind={ind}
                          el={el}
                          move={move}
                          reorder={reorder}
                          state={state}
                          setState={setState}
                          edit={edit}
                          deleteComment={deleteComment}
                          addComment={addComment}
                        />
                      )}
                    </Draggable>
                  ))}
                </div>
              );
            }}
          </Droppable>
        </DragDropContext>
      </div>
    </div>
  );
};

export default App;
