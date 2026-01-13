import { create } from 'zustand'
import { OrderItem } from './types'
import { Product } from '@/app/generated/prisma'

interface Store {
    order: OrderItem[]
    addToCart: (product: Product) => void
    increaseQuantity: (id: Product['id']) => void
    decreaseQuantity: (id: Product['id']) => void
    removeItem: (id: Product['id']) => void
    clearStore: ()=>void
}
export const useStore = create<Store>((set, get) => ({
    order: [],
    addToCart: (product) => {
        const { categoryId, image, ...data } = product
        let order: OrderItem[] = []
        if (get().order.find(item => item.id === product.id)) {
            order = get().order.map(item => item.id == product.id ? {
                ...item,
                quantity: item.quantity + 1,
                subtotal: item.price * (item.quantity + 1)
            } : item)
        } else {
            order = [...get().order, {
                ...data,
                quantity: 1,
                subtotal: 1 * product.price
            }]

        }

        set(() => ({
            order
        }))

    },
    increaseQuantity: (id) => {
        set((state) => ({
            order: state.order.map(item => item.id == id ? {
                ...item,
                quantity: item.quantity + 1,
                subtotal: item.price * (item.quantity + 1)
            } : item)
        }))
    },
    decreaseQuantity: (id) => {
        set((state) => ({
            order: state.order
                .map(item => {
                    if (item.id === id) {
                        const newQuantity = item.quantity - 1
                        if (newQuantity <= 0) return null
                        return {
                            ...item,
                            quantity: newQuantity,
                            subtotal: item.price * newQuantity
                        }
                    }
                    return item
                })
                .filter(Boolean) as OrderItem[] // filtramos nulls
        }))
    },
    removeItem: (id) => {
        set((state) => ({
            order: state.order.filter(item => item.id !== id)
        }))
    },
    clearStore:()=>{
        set((state)=>({
            order:[]
        }))
    }
}))