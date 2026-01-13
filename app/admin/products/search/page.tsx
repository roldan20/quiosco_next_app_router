import ProductSearchForm from '@/components/products/ProductSearchForm'
import ProductTable from '@/components/products/ProductsTable'
import Heading from '@/components/ui/Heading'
import { prisma } from '@/src/lib/prisma'
import Link from 'next/link'
import React from 'react'

async function searchProducts(searchTerm: string) {
    const products = await prisma.product.findMany({
        where: {
            name: {
                contains: searchTerm,
                mode: 'insensitive'
            }
        }, include: {
            category: true
        }
    })
    return products

}

export default async function searchPage({ searchParams }: any) {
    const search = searchParams?.search ?? ''
    const products = await searchProducts(search)

    return (
        <>
            <Heading>Resultados de búsqueda</Heading>

             <div className="flex  flex-col lg:flex-row lg:justify-between gap-5">
                <Link href={'/admin/products/new'} className='bg-amber-400 w-full lg:w-auto text-xl px-10 py-3 text-center font-bold cursor-pointer'>
                Crear Producto
                </Link>
                <ProductSearchForm/>
            </div>
            {products.length > 0 ?( <ProductTable products={products} />):
            <p className='text-center'>No hay productos</p>
            }
           
        </>
    )
}
