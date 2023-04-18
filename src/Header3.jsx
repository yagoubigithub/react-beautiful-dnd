import React, { useContext } from "react";
import styled from "@xstyled/styled-components";

import { Context } from "./context";

import { v4 as uuid } from "uuid";

const Container = styled.div`
  /* Headbar color */

  background: #213641;
  height: 34px;
  color: white;
  display: flex;
  align-items: center;
`;
const Header = () => {
  const { setData, data , SaveAllData } = useContext(Context);

  const addList = () => {
    const _data = [...data];
    _data.unshift({
      id: uuid(),
      name: "New List",
      cards: [],
      edit: true,
    });
    
    SaveAllData(_data)
    setData(_data);
  };
  return (
    <Container>
      <h3 style={{ color: "white", margin: 0, padding: 0, marginLeft: 40 }}>
        App
      </h3>

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
    </Container>
  );
};

export default Header;
