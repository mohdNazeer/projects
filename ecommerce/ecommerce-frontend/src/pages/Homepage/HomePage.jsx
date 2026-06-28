/* eslint-disable react/prop-types */
import React from 'react'
import '../../index.css'
import axios from 'axios'
import { Product } from './product'
import { useState, useEffect } from 'react'
import './HomePage.css'
import { Header } from '../../components/Header'
export function HomePage({ cart,fetchCart }) {
    const [products, setProducts] = useState([])
    useEffect(() => {
        const getHomeData = async () => {
            const response=await axios.get('/api/products')
                    setProducts(response.data)
                }
        getHomeData()
    }, [])
    return (
        <>
            <link rel="icon" type="image/svg+xml" href="home-favicon.png" />
            <title>HomePage</title>
            <Header cart={cart} />
            <div className="home-page">
                <div className="products-grid">
                    {products.map((product) => {
                        return (
                            <Product key={product.id} product={product} fetchCart={fetchCart}/>
                        )
                    })}
                </div>
            </div>
        </>
    )
}