import React from 'react'
import Navbar from '@/src/Sections/Navbar/Navbar'
import FavoriteProducts from '../src/Sections/FavoriteProducts/FavoriteProducts'
import Footer from '../src/Sections/Footer/Footer'

const Favorites = () => {
  return (
    <>
      <Navbar/>
      <FavoriteProducts  />    
      <Footer />    
    </>
  )
}

export default Favorites

/*
http://localhost:3000/Favorites
*/