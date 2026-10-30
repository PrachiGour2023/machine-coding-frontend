import { useEffect, useState } from 'react';

interface ProductData {
    id: number;
    images: [string];
    title: string;
}

const PER_PAGE = 10;

const Pagination = () => {

    const [products, setProducts] = useState<ProductData[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(1)
    const start = (currentPage - 1) * PER_PAGE;
    const end = start + PER_PAGE;

    useEffect(() => {
        const fetchProduct = async () => {
            const response = await fetch('https://dummyjson.com/products?limit=200');
            const json = await response.json();
            setProducts(json.products)
        }
        fetchProduct();
    }, [])

    const totalPages = products.length;
    const noOfPages = Math.ceil(totalPages / PER_PAGE)

    const handleCurrentPage = (page: number) => {
        setCurrentPage(page)
    }

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(prev => prev - 1)
        }
    }

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(prev => prev + 1)
        }
    }


    return (
        <div>
            <h2>Product List</h2>

            <div className='pagination'>
                <button disabled={currentPage === 1} onClick={handlePreviousPage}>«</button>
                {[...Array(noOfPages).keys()].map((item) => {
                    return (
                        <button key={item} className={`paginate-btn ${(item + 1) === currentPage ? 'active' : ''}`} onClick={() => handleCurrentPage(item + 1)}>{item + 1}</button>
                    )
                })}
                <button disabled={currentPage === noOfPages} onClick={handleNextPage}>»</button>
            </div>
            <div className='container'>
                {
                    products.slice(start, end).map((product: ProductData) => {
                        return (
                            <div
                                className='product-item'
                                key={product.id}>
                                <img src={product.images[0]} />
                                <p>{product.title}</p>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default Pagination