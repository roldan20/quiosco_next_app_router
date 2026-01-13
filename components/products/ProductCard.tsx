import { Product } from "@/app/generated/prisma"
import { formatCurrency, getImagePath } from "@/src/utils"
import Image from "next/image"
import AddProductButton from "./AddProductButton"

type ProductCardProps = {
    product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
    return (
        <div className="border-0 bg-white">
            <Image width={400} height={500} quality={100} src={getImagePath(product.image)} alt={`Imagen ${product.name}`} />
            <div className="p-5">
                <h3 className="text-2xl font-bold">{product.name}</h3>
                <p className="mt-5 font-black text-4xl text-amber-500">
                    {formatCurrency(product.price)}
                </p>
              <AddProductButton product={product} />
            </div>
        </div>
    )
}
