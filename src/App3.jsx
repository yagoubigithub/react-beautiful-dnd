import React from 'react'
import Dnd from './Dnd3'
import Header from './Header3'
import { ContextProvider } from "./context";
import { IconContext } from "react-icons";


const App = () => {
  return (
    <ContextProvider>
        <Header />
        <Dnd />
    </ContextProvider>
  )
}

export default App