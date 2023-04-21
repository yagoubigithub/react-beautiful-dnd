
import React, { createContext, useState } from "react";
import data3 from "../data3";

const Context = createContext();



function ContextProvider(props) {
  const [data, setData] = useState([...data3]);
  const [cardEitedPosition, setCardEitedPosition] = useState({
    listId: null,
    cardId: null,
  });
  const [newValue, setNewValue] = useState({});

  

  const enterEditMode = (listId, cardId) => {
    const newData = [
      ...data.map((list) => {
        const _listId = list.id;
       

        return {
          ...list,
          cards: list.cards.map((card, _cardIndex) => {

            if(listId === _listId && cardId === card.id){
              setTimeout(()=>{
                const el = document.getElementById(`card-comment-${card.id}`)
                el.focus()
                window.getSelection().selectAllChildren(el)
                window.getSelection().collapseToEnd()
              }, 333)
            }
            return {
              ...card,
              edit: listId === _listId && cardId === card.id,
            };
          }),
        };
      }),
    ]
    setData(newData);
    SaveAllData(newData)
    setCardEitedPosition({ listId, cardId });
  };

  const disbaleEditMode = () => {
    const newData = [
      ...data.map((list) => {
        return {
          ...list,
          cards: [
            ...list.cards.map((card) => {
              return {
                ...card,
                edit: false,
              };
            }),
          ],
        };
      }),
    ]
    setData(newData);
    SaveAllData(newData)
    setCardEitedPosition({ listId: null, cardId: null });
  };

  const SaveAllData = (_data) => {
    console.log(_data)
    setData([..._data]);

    const jsonstrin = JSON.stringify([..._data]);

    localStorage.setItem("data", jsonstrin);
  };
  const save = () => {
    return new Promise((resolve, reject) => {
      let _data = [...data];
      if (Object.keys(newValue).length > 0) {
        _data = _data.map((list) => {
          if (list.id == cardEitedPosition.listId) {
            const cards = list.cards.map((card) => {
              if (card.id === cardEitedPosition.cardId) {
                return {
                  ...card,
                  ...newValue,
                };
              } else {
                return card;
              }
            });

            list.cards = [...cards];
          }
          return list;
        });

        setData([..._data]);
        SaveAllData([..._data])
       

        setNewValue({});
      }
      resolve();
    });
  };
  return (
    <Context.Provider
      value={{
        data,
        setData,
        enterEditMode,
        cardEitedPosition,
        setCardEitedPosition,
        save,
        newValue,
        setNewValue,

        SaveAllData,
        disbaleEditMode,
      }}
      {...props}
    />
  );
}

export { ContextProvider, Context };
