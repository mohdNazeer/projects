/* eslint-disable react/prop-types */
import React, { useState } from "react"
import axios from "axios"
import dayjs from "dayjs"
import { useEffect} from "react"
import { Header } from "../components/Header"
import { useParams } from "react-router"
import { Link } from "react-router"
import './TrackingPage.css'
import '../index.css'
export function TrackingPage({cart}) {
    const {orderId,productId}=useParams();
    const [order,setOrder] = useState(null);
    useEffect(()=>{
        const fetchTrackingData = async ()=>{
            const response = await axios.get(`https://mohdnazeer-backend.onrender.com/api/orders/${orderId}?expand=products`)
            setOrder(response.data)
        }
        fetchTrackingData()
    },[orderId])

    if (!order){
        return null
    }
    const orderProduct = order.products.find((orderProduct) => {
        return orderProduct.productId === productId;
    })
    return (
        <>
            <link rel="icon" type="image/svg+xml" href="tracking-favicon.png" />
            <title>TrackingPage</title>
            <Header cart={cart}/>

            <div className="tracking-page">
                <div className="order-tracking">
                    <Link className="back-to-orders-link link-primary" to="/orders">
                        View all orders
                    </Link>

                    <div className="delivery-date">
                        Arriving on: {dayjs(orderProduct.estimatedDeliveryTimeMs).format('dddd, MMMM D')}
                    </div>

                    <div className="product-info">
                        {orderProduct.product.name}
                    </div>

                    <div className="product-info">
                        Quantity: {orderProduct.quantity}
                    </div>
                    <img className="product-image" src={`/${orderProduct.product.image}`} />

                    <div className="progress-labels-container">
                        <div className="progress-label">
                            Preparing
                        </div>
                        <div className="progress-label current-status">
                            Shipped
                        </div>
                        <div className="progress-label">
                            Delivered
                        </div>
                    </div>

                    <div className="progress-bar-container">
                        <div className="progress-bar"></div>
                    </div>
                </div>
            </div>
        </>
    )
}