import { useState } from 'react'

const initialProducts = [
    { id: 1, name: "Shampoo", description: "Gentle and refreshing", price: 200 },
    { id: 2, name: "Soap", description: "Fragrant and foamy", price: 50 },
    { id: 3, name: "Toothpaste", description: "Whitening and minty", price: 100 },
    { id: 4, name: "Conditioner", description: "Smooth and silky", price: 150 },
];

const ProductCart = () => {

    const [cart, setCart] = useState(initialProducts.map((p) => (
        {...p, qty: 1}
    )))

    return (
        <div>
            <h1>Shopping Cart</h1>
            <div className='add-product-container'>
                <h3>Add New Product</h3>
                <div className='input-detail'>
                    <div>
                        <span>Product Name:</span><br />
                        <input type="text" placeholder='Enter product name' />
                    </div>
                    <div>
                        <span>Price(₹):</span><br />
                        <input type="text" placeholder='Enter price' />
                    </div>
                    <div>
                        <span>Quantity:</span><br />
                        <input type="number" />
                    </div>
                    <div>
                        <span>Description:</span><br />
                        <input type="text" placeholder='Enter product description' />
                    </div>
                    <button>Add Product</button>
                </div>
            </div>
            <div>
                {
                    cart.map((product: any) => {
                        return (
                            <div className='product-display'>
                                <div>
                                    <span style={{ fontWeight: 'bold'}}>{product.name}</span><br />
                                    <span style={{ color: 'gray'}}>{product.description}</span><br />
                                    <span style={{ fontWeight: 'bold'}}>Price: ₹{product.price}</span>
                                    <div>
                                        Quantity:
                                        <button>-</button>
                                        <span style={{
                                            backgroundColor: 'white',
                                            padding: '2px 5px',
                                            borderRadius: '5px',
                                            margin: '5px',
                                            border: '1px solid grey'
                                            
                                        }}>{product.qty}</span>
                                        <button>+</button>
                                    </div>
                                    <h3>Subtotal: ₹{0}</h3>
                                </div>
                                <button>Remove</button>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default ProductCart