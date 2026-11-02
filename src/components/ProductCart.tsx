import { useState } from 'react'

const initialProducts = [
    { id: 1, name: "Shampoo", description: "Gentle and refreshing", price: 200 },
    { id: 2, name: "Soap", description: "Fragrant and foamy", price: 50 },
    { id: 3, name: "Toothpaste", description: "Whitening and minty", price: 100 },
    { id: 4, name: "Conditioner", description: "Smooth and silky", price: 150 },
];

const ProductCart = () => {

    const [cart, setCart] = useState(initialProducts.map((p) => (
        { ...p, qty: 1 }
    )))
    const [newProduct, setNewProduct] = useState({
        name: "",
        price: "",
        qty: 1,
        description: ""
    })
    const [coupon, setCoupon] = useState('');
    const [isCouponActive, setIsCouponActive] = useState(false)

    const decreaseQty = (item: any) => {
        setCart(prev =>
            prev.map(p => p.id === item.id && item.qty > 1 ? { ...p, qty: p.qty - 1 } : p)
        )
    }

    const increaseQty = (item: any) => {
        setCart(prev =>
            prev.map(p => p.id === item.id ? { ...p, qty: p.qty + 1 } : p)
        )
    }

    const handleDeleteProduct = (id: number) => {
        setCart(prev => prev.filter(p => p.id !== id))
    }

    const handleAddProduct = (e: any) => {
        const { name, value } = e.target;
        setNewProduct(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const handleAddNewProduct = () => {
        const data = {
            id: Date.now(),
            name: newProduct.name,
            price: Number(newProduct.price),
            description: newProduct.description,
            qty: newProduct.qty
        }
        setCart([...cart, data])
        setNewProduct({
            name: "",
            price: "",
            qty: 1,
            description: ""
        })
    }

    let subTotal = cart.reduce((acc, curr) => acc + (curr.price * curr.qty), 0)
    const handleApplyCoupon = () => {
        if (coupon.toUpperCase().includes('GRAB50') && subTotal > 0) {
            setIsCouponActive(true)
            setCoupon('')
        }
    }


    return (
        <div>
            <h1>Shopping Cart</h1>
            <div className='add-product-container'>
                <h3>Add New Product</h3>
                <div className='input-detail'>
                    <div>
                        <span>Product Name:</span><br />
                        <input name='name' value={newProduct.name} onChange={handleAddProduct} type="text" placeholder='Enter product name' />
                    </div>
                    <div>
                        <span>Price(₹):</span><br />
                        <input name='price' value={newProduct.price} onChange={handleAddProduct} type="text" placeholder='Enter price' />
                    </div>
                    <div>
                        <span>Quantity:</span><br />
                        <input name='qty' value={newProduct.qty} onChange={handleAddProduct} type="number" />
                    </div>
                    <div>
                        <span>Description:</span><br />
                        <input name='description' value={newProduct.description} onChange={handleAddProduct} type="text" placeholder='Enter product description' />
                    </div>
                    <button type='submit' onClick={handleAddNewProduct}>Add Product</button>
                </div>
            </div>
            <div>
                {
                    cart.map((product: any) => {
                        return (
                            <div className='product-display'>
                                <div>
                                    <span style={{ fontWeight: 'bold' }}>{product.name}</span><br />
                                    <span style={{ color: 'gray' }}>{product.description}</span><br />
                                    <span style={{ fontWeight: 'bold' }}>Price: ₹{product.price}</span>
                                    <div>
                                        Quantity:
                                        <button className='minus' onClick={() => decreaseQty(product)}>-</button>
                                        <span className={'product-qty'}>{product.qty}</span>
                                        <button className='plus' onClick={() => increaseQty(product)}>+</button>
                                    </div>
                                    <h3>Subtotal: ₹{product.qty * product.price}</h3>
                                </div>
                                <button className='remove-product' onClick={() => handleDeleteProduct(product.id)}>Remove</button>
                            </div>
                        )
                    })
                }
            </div>
            <div className='coupon-container'>
                <span>Coupon Code</span>
                <div className='coupon-col-row'>
                    <input value={coupon} onChange={(e) => setCoupon(e.target.value)} type="text" placeholder='Enter GRAB50 for 50% off' />
                    <button onClick={handleApplyCoupon}>Apply</button>
                </div>
                {isCouponActive && <span className='coupon-applied'>GRAB50 coupon applied successfully!</span>}
                <div className='coupon-col-row'>
                    <span>Subtotal:</span>
                    <span>₹{subTotal}</span>
                </div>
                {isCouponActive && <div className='coupon-col-row coupon-applied'>
                    <span>Discount (GRAB50):</span>
                    <span>-₹{subTotal / 2}</span>
                </div>}
                <div className='coupon-col-row total'>
                    <span>Total:</span>
                    <span>₹{subTotal / 2}</span>
                </div>
            </div>
        </div>
    )
}

export default ProductCart