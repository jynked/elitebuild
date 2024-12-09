import React from 'react'
import Navbar from '@/src/Sections/Navbar/Navbar'
import SubcategoryProducts from '../src/Sections/SubcategoryProducts/SubcategoryProducts'
import Footer from '../src/Sections/Footer/Footer'

const Subcategory = () => {
  return (
    <>
      <Navbar/>
      <SubcategoryProducts  />    
      <Footer />    
    </>
  )
}

export default Subcategory

/*
http://localhost:3000/Subcategory
*/