import React, { useContext } from "react";
import styled from "@xstyled/styled-components";

import { Context } from "./context";

import { v4 as uuid } from "uuid";
import { CiEdit } from "react-icons/ci";

const Container = styled.div`
  /* Headbar color */

  background: #213641;
  height: 34px;
  color: white;
  display: flex;
  align-items: center;
`;
const Title = styled.div`
  font-family: "Zen Maru Gothic";
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  line-height: 23px;
  margin-left: 22px;
`;

const Header = () => {
  const { setData, data, SaveAllData } = useContext(Context);

  const addList = () => {
    const _data = [...data];
    _data.push({
      id: uuid(),
      name: "New List",
      cards: [],
      edit: true,
    });

    SaveAllData(_data);
    setData(_data);
  };
  const unselect =()=>{
    const selection = window.getSelection();
    selection.removeAllRanges();
  }
  function selectElementContents(el) {
    const range = document.createRange();
    range.selectNodeContents(el);
  
    const sel = window.getSelection();
    sel.removeAllRanges();
    sel.addRange(range);
  }

  const skipeditmode = (event ) => {

    if(event.target !== event.currentTarget) return;

  

    const _data = JSON.parse(localStorage.getItem("data"));
     
    const newData = _data.map((list) => {
     
      return {
        ...list,
        editmode :false
      }
    });
    unselect()

    SaveAllData(newData);
    setData(newData);

    document.removeEventListener("click", (event )=> skipeditmode(event ));

   
  };
  const setEditMode = () => {
    const _data = [...data];
    let id = "";
    document.getElementById("board").addEventListener("click", (event )=> skipeditmode(event ));
    const newData = _data.map((list) => {
      // if (list.edit) {
      //   console.log("set edit mode");
      //   id = `edit-name-${list.id}`;
      //   setTimeout(() => {
      //     const el = document.getElementById(id)
        
      //     selectElementContents(el);

      //     document.addEventListener("click", (event )=> skipeditmode(event , el));
      //   }, 200);
      //   return {
      //     ...list,
      //     editmode: true,
      //   };
      // } else {
      //   return {
      //     ...list,
      //     editmode :false
      //   };
      // }

    
   if(list.edit){
    console.log("set edit mode");
    id = `edit-name-${list.id}`;
    
      const el = document.getElementById(id)
    
      selectElementContents(el);
   }

      return {
        ...list,
        editmode :true
      };
    });

    SaveAllData(newData);
    setData(newData);
  };
  return (
    <Container>
      <Title>APP</Title>

      <span
        style={{
          color: "white",
          fontSize: 30,
          cursor: "pointer",
          marginLeft: 40,
        }}
        onClick={addList}
      >
        +
      </span>

      <span
        style={{
          cursor: "pointer",
          marginLeft: 30,
        }}
        onClick={setEditMode}
      >
        <CiEdit color="#fff" size="25" />
      </span>
    </Container>
  );
};

export default Header;
