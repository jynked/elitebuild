import React from 'react'
import Navbar from '@/src/Sections/Navbar/Navbar'
import Header from '../src/Sections/Header/Header'
import ProductAction from '../src/Sections/ProductAction/ProductAction'
import DeliveryOptions from '../src/Sections/DeliveryOptions/DeliveryOptions'
import PaymentOptions from '../src/Sections/PaymentOptions/PaymentOptions'
import LeaveRequestForm from '../src/Sections/LeaveRequestForm/LeaveRequestForm'
import Footer from '../src/Sections/Footer/Footer'

const HomePage = () => {
  return (
    <>
      <Navbar/>
      <Header/> 
      <ProductAction />
      <DeliveryOptions />
      <PaymentOptions />
      <LeaveRequestForm />                   
      <Footer />    
    </>
  )
}

export default HomePage

/*
http://localhost:3000/
*/