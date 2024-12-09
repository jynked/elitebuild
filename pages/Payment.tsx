import React from 'react'
import Navbar from '@/src/Sections/Navbar/Navbar'
import PaymentInfo from '@/src/Sections/PaymentInfo/PaymentInfo'
import PaymentOptions from '@/src/Sections/PaymentOptions/PaymentOptions'
import Footer from '../src/Sections/Footer/Footer'

const Payment = () => {
  return (
    <>
      <Navbar/>
      <PaymentInfo />   
      <PaymentOptions />           
      <Footer />    
    </>
  )
}

export default Payment

/*
http://localhost:3000/Payment
*/