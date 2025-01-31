import React, { createContext, useState } from 'react'

export const NavbarContext = createContext(null)

const NavbarProvider = ({children}) => {
    const [navbarTitle,setNavbarTitle] = useState("")
  return (
    <NavbarContext.Provider value={{navbarTitle,setNavbarTitle}}>{children}</NavbarContext.Provider>
  )
}

export default NavbarProvider