import EditProductForm from '@/components/products/EditProductForm'
import ProductForm from '@/components/products/ProductForm'
import GoBackButton from '@/components/ui/GoBackButton'
import Heading from '@/components/ui/Heading'
import { prisma } from '@/src/lib/prisma'
import { notFound } from 'next/navigation'

async function getProductId(id: number) {
  const product = await prisma.product.findUnique({
    where: { id },
  })

  if (!product) notFound()
  return product
}

export default async function Page({
  params,
}: {
  params: any
}) {
  const productId = Number(params.id)
  const product = await getProductId(productId)

  return (
    <>
      <Heading>Editar Producto: {product.name}</Heading>
      <GoBackButton />
      <EditProductForm productId={productId}>
        <ProductForm product={product} />
      </EditProductForm>
    </>
  )
}
