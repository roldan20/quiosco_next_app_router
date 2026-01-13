import Link from 'next/link'

type ProductsPaginationProps = {
    page: number
    totalPages: number
}

export default function ProductPagination({ page, totalPages }: ProductsPaginationProps) {
    return (
        <nav className='flex justify-center py-10'>

            {page > 1 && (
                <Link href={`/admin/products?page=${page - 1}`}
                    className='bg-white px-4 py-2 text-sm text-gray-900 ring-1 ring-inset ring-gray-300 focus:z-20 focus:outline-offset-0'
                >&laquo;</Link>
            )}
            {/* Números */}
            {Array.from({ length: totalPages }).map((_, i) => {
                const pageNumber = i + 1;

                return (
                    <Link
                        key={pageNumber}
                        href={`/admin/products?page=${pageNumber}`}
                        className={`px-4 py-2 text-sm text-gray-900 ring-1 ring-inset ring-gray-300 focus:z-20 focus:outline-offset-0 ${page === pageNumber
                                ? "bg-black text-white"
                                : "bg-white"
                            }`}
                    >
                        {pageNumber}
                    </Link>
                );
            })}


            {page < totalPages && (
                <Link href={`/admin/products?page=${page + 1}`}
                    className='bg-white px-4 py-2 text-sm text-gray-900 ring-1 ring-inset ring-gray-300 focus:z-20 focus:outline-offset-0'
                >&raquo;</Link>
            )}

        </nav>
    )
}
