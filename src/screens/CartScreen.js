import { NavLink } from 'react-router-dom';
import '../css/CartScreen.css';
import { getCartItems, setCartItems } from '../localStorage';
import { useHistory } from 'react-router';

const CartScreen = () => {
    const cartProducts = getCartItems();
    const history = useHistory();

    const quantitySelect = (qty, product) => {
        const item = cartProducts.find((x) => x._id == product._id)
        sendItemToCart({...item, qty: Number(qty.target.value)}, true)
    }

    const sendItemToCart = (item, forceUpdate = false) => {
        let cartItems = getCartItems();
            const existItem = cartItems.find((x) => x._id === item._id );
            if(existItem){
                if (forceUpdate) {
                    cartItems = cartItems.map((x) =>
                        x._id === existItem._id ? item : x
                    );
                }
            }
            else{
                cartItems = [...cartItems, item]
            }
            setCartItems(cartItems);
            history.push('/cart');
    }

    const removeFromCart = (item) => {
       setCartItems(getCartItems().filter(x => x._id !== item._id))
       history.push('/cart');
    }

    return (
        <>
            <div className='row'>
                <div className='col-lg-8 col-12 cartRight'>
                    <table className='cartTable'>
                        <tr className='tableHeading'>
                            <th>Shopping</th>
                            <th></th>
                            <th>Price</th> 
                        </tr>
                        {cartProducts.length === 0
                        ? <div className='cartEmpatData'><h3>Cart is empty <span> <NavLink to="/">Go Shopping</NavLink></span></h3></div>
                        : cartProducts.map((product) => (
                        <>
                            <tr className="cartHorizLine">
                                <td>
                                    <span className='line'></span>
                                </td>
                                <td>
                                    <span className='line'></span>
                                </td>
                                <td>
                                    <span className='line'></span>
                                </td>
                            </tr>
                            <tr>
                                <td className='cartImage'>
                                    <img src= {product.image}/> 
                                </td>
                                <td className='cartQuantityDetails'>
                                    <ul className="cartProductDetail">
                                        <li>
                                            <h2>{product.name}</h2>
                                        </li>
                                        <div className="cartQuantity">
                                            <span> Qty : </span> 
                                            <input type="number" className="qty-select" name="quantity" min="1" max="15" value={product.qty} onChange={(e)=>quantitySelect(e, product)} step="1"/>
                                            <button type="button" onClick={()=>removeFromCart(product)}>
                                                Delete
                                            </button>
                                        </div>
                                    </ul>
                                </td>
                                <td className='cartProductPrice'>
                                    Rs. {product.price}
                                </td>
                            </tr>                     
                        </>
                        ))}
                    </table>
                </div>
                <div className='col-lg-4 col-12 cartLeft'>
                    <div className='subTotal'>Subtotal ({cartProducts.reduce((a, c) => a + c.qty, 0)} items)
                    : Rs. {cartProducts.reduce((a, c) => a + c.qty * c.price, 0)}</div>
                    <button className='proceedToCheckout' onClick={()=>history.push('/signin')}>Proceed To Checkout</button>
                </div>
            </div>
        </>
    )
}

export default CartScreen;