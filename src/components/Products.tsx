import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router';

export interface ProductState {
  id: number;
  title: string;
  images: string;
  description: string;
  price: number
}

const Products = () => {

  const [products, setProducts] = useState<ProductState[]>([]);
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true)
    const fetchProducts = async () => {
      try {
        const response = await fetch('https://dummyjson.com/products');
        if (!response.ok) {
          throw new Error("Unable to fetch")
        }
        const json = await response.json();
        setProducts(json.products)
      } catch (err) {
        if (err instanceof Error) {
          throw new Error(err.message)
        }
      } finally {
        setLoading(false)
      }
    }
    fetchProducts();
  }, [])

  const checkProductDetail = (productId: number) => {
    navigate(`/product/${productId}`)
  }

  if (loading) {
    return (
      <div>Loading...</div>
    )
  }

  return (
    <div>
      <h2>Product List</h2>
      <div className='product-container'>
        {
          products.length > 0 ? (
            products.map((product: ProductState) => {
              return (
                <div key={product.id} className='product-Item' onClick={() => checkProductDetail(product.id)}>
                  <img src={product.images[0]} alt='' />
                  <h4>{product.title}</h4>
                  <p>{product.description.substring(0, 100) + "..."}</p>
                </div>
              )
            })
          ) : (
            <div>No Product Found</div>
          )
        }
      </div>
    </div>
  )
}

export default Products