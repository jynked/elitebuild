import React from 'react'
import Navbar from '@/src/Sections/Navbar/Navbar'
import DeliveryInfo from '@/src/Sections/DeliveryInfo/DeliveryInfo'
import LeaveRequestForm from '../src/Sections/LeaveRequestForm/LeaveRequestForm'
import Footer from '../src/Sections/Footer/Footer'

const Delivery = () => {
  return (
    <>
      <Navbar/>
      <DeliveryInfo />
      <LeaveRequestForm />                   
      <Footer />    
    </>
  )
}

export default Delivery

/*
http://localhost:3000/Delivery
*/