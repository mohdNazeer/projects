import React from "react"
import { it, expect, describe,vi,beforeEach } from 'vitest'
import { render,screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import axios from "axios"
import { Product } from './Product'
describe('product component', () => {
    vi.mock('axios')
    let product
    let fetchCart
    beforeEach(()=>{
        product= {
        id: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
        image: "images/products/athletic-cotton-socks-6-pairs.jpg",
        name: "Black and Gray Athletic Cotton Socks - 6 Pairs",
        rating: {
            stars: 4.5,
            count: 87
        },
        priceCents: 1090,
        keywords: ["socks", "sports", "apparel"]
    }
    fetchCart=vi.fn()
    })
    it('can select a quantity', async() => {
        render(<Product product={product} fetchCart={fetchCart}/>)
        let quantitySelector = screen.getByTestId('select-element')
        expect(quantitySelector).toHaveValue('1')
        let user = userEvent.setup()
        await user.selectOptions(quantitySelector,'3')
        expect(quantitySelector).toHaveValue('3')
        const addToCartBtn = screen.getByTestId('add-to-cart-button')
        await user.click(addToCartBtn)
        expect(axios.post).toHaveBeenCalledWith('/api/cart-items', {
                    productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
                    quantity: 3
                })
        expect(fetchCart).toHaveBeenCalled()
    })
})