import React from 'react'
import Navbar from '@/src/Sections/Navbar/Navbar'
import ProductInfo from '../src/Sections/ProductInfo/ProductInfo'
import RelatedProducts from '../src/Sections/RelatedProducts/RelatedProducts'
import PopularProducts from '../src/Sections/PopularProducts/PopularProducts'
import ProductAccessories from '../src/Sections/ProductAccessories/ProductAccessories'
import Footer from '../src/Sections/Footer/Footer'

const ProductPage = () => {
  return (
    <>
      <Navbar/>
      <ProductInfo  /> 
      <RelatedProducts />
      <PopularProducts />   
      <ProductAccessories />   
      <Footer />    
    </>
  )
}

export default ProductPage

/*
http://localhost:3000/ProductPage
*/