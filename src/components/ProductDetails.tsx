import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router';
import type { ProductState } from './Products';

const ProductDetails = () => {
  
  const [productData, setProductData] = useState<ProductState | null>(null);
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const { productId } = useParams();

  
  useEffect(() => {
    setLoading(true)
    const fetchProductDetail = async() => {
        try {
            const response = await fetch (`https://dummyjson.com/products/${productId}`);
            if(!response.ok) throw new Error("Unable to fetch detail")
            const json = await response.json();
            setProductData(json)
        } catch (err) { 
            if (err instanceof Error) {
              throw new Error(err.message)
            }
        } finally {
            setLoading(false)
        }
    }
    fetchProductDetail()
  } , [])

  if(loading) return <p>Loading...</p>
  
  return (
    <div className='product-wrapper'>

    <div className='product-detail'>
       <h3>{productData?.title}</h3>
       <img src={productData?.images?.[0]} alt={productData?.title} />
       <p>{productData?.description}</p>
       <p>Price : $ {productData?.price}</p>

       <span className='back' onClick={() => {navigate("/products", { replace: true})}}>Back to Products</span>
    </div>

    </div>
  )
}

export default ProductDetails