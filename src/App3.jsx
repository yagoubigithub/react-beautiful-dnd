import React , {useEffect} from 'react'
import Dnd from './Dnd3'
import Header from './Header3'
import { ContextProvider } from "./context";
import  Container  from './Container';



const App = () => {
  
  
  return (
    <ContextProvider>
      <Container>
        <Header />
        <Dnd />
       </Container>
    </ContextProvider>
  )
}

export default App