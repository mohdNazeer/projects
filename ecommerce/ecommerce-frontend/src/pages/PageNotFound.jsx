/* eslint-disable react/prop-types */
import React from "react";
import './PageNotFound.css'
import {Header} from '../components/Header'
export function PageNotFound({cart}){
    return(
        <>
            <Header cart={cart}/>
            <p>Page not found</p>
        </>
    )
}