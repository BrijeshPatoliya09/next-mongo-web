import Head from 'next/head'
import React from 'react'
import NavBar from './NavBar'

const Layout = ({children}) => {
  return (
    <>
    <Head>
      
    </Head>
      <NavBar /> 
      {children}
    </>
  )
}

export default Layout
