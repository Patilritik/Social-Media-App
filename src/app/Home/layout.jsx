import React from 'react'
import Navbar from '../Components/Navbar'

export default function layout({children}) {
  return (
    <div>
      <Navbar/>
      {children}
    </div>
  )
}
