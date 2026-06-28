import React from 'react'
import {Routes,Route} from 'react-router'
import axios from 'axios'
import { useState,useEffect } from 'react'
import './App.css'
import { HomePage } from './pages/Homepage/HomePage'
import { CheckoutPage } from './pages/checkout/CheckoutPage'
import {OrdersPage} from "./pages/OrdersPage"
import { TrackingPage } from './pages/TrackingPage'
import { PageNotFound } from './pages/PageNotFound'

function App() {
  const [cart,setCart]=useState([])
  const fetchCart=async()=>{
      const response=await axios.get('https://mohdnazeer-backend.onrender.com/api/cart-items?expand=product')
      setCart(response.data)
    }
  useEffect(()=>{
    fetchCart()
  },[])
  return (
    <>
    <Routes>
      <Route path='/' element={<HomePage cart={cart} fetchCart={fetchCart}/>}></Route>
      <Route path='/checkout' element={<CheckoutPage cart={cart} fetchCart={fetchCart}/>}></Route>
      <Route path='/orders' element={<OrdersPage cart={cart}/>}></Route>
      <Route path='/tracking/:orderId/:productId' element={<TrackingPage cart={cart}/>}></Route>
      <Route path='*' element={<PageNotFound cart={cart}/>}></Route>
    </Routes>
    </>
  )
}

export default App
