import React ,  {useEffect , useContext} from 'react'

import { Context } from "./context";
import mydata from "./data3"
const Container = ({children}) => {

     const { data ,   SaveAllData  } = useContext(Context);
    useEffect(()=>{
   
        SaveAllData(data)
    
      } , [])
  return (
    <div>{
        
     children   
    }</div>
  )
}

export default Container