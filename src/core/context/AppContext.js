import React from "react"

const AppContext = React.createContext()

export default AppContext

export const useAppContext = ()=>{
   return React.useContext(AppContext);
}