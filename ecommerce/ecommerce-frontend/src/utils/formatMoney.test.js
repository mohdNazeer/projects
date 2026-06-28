import {it,expect} from 'vitest'
import { formatMoney } from './formatMoney'
it('formats 0 to $0.00',()=>{
expect(formatMoney(0)).toBe('$0.00')
})
it('formats negative numbers',()=>{
    expect(formatMoney(-999)).toBe('-$9.99')
    expect(formatMoney(-100)).toBe('-$1.00')
})