/* eslint-disable react-hooks/exhaustive-deps */
import React ,  {useEffect , useContext} from 'react'

import { Context } from "./context";

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