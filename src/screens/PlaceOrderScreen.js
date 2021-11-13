import React from 'react'
import '../css/PlaceOrderScreen.css'
import { getCartItems, getPayment, getShippingInfo } from '../localStorage'
import { checkoutSteps } from '../utils'
import { useHistory } from 'react-router';


const PlaceOrderScreen = () => {

    const history = useHistory();

    const convertCartToOrder = () => {
        const orderItems = getCartItems();
        if(orderItems.length === 0){
            history.push('/cart')
        }

        const shipping = getShippingInfo();
        if(shipping.length === 0){
            history.push('/shipping')
        }

        const payment = getPayment();
        console.log("PPP ", payment);
        if (!payment.paymentMethod) {
            document.location.hash = '/payment';
        }

        const totalItemsPrice = orderItems.reduce((a, c) => a + c.price * c.qty, 0);
        const shippingPrice = totalItemsPrice > 200 ? 0 : 50;
        const taxPrice = Math.trunc(Math.round(0.15 * totalItemsPrice * 100) / 100);
        const totalPrice = totalItemsPrice + shippingPrice + taxPrice;
        return {
            orderItems,
            shipping,
            payment,
            totalItemsPrice,
            shippingPrice,
            taxPrice,
            totalPrice
        };
    }

    const {
        orderItems,
        shipping,
        payment,
        totalItemsPrice,
        shippingPrice,
        taxPrice,
        totalPrice,
    } = convertCartToOrder();

    return (
        <>
        <div className="container content">
            <div className='row '>
            <div className="shipping-status">
                {checkoutSteps({step1: true, step2: true, step3: true, step4: true})}
            </div> 
                <div className='col-lg-8 col-12 order'>
                    <div className="address_info">
                        <h2>Shipping Address</h2>
                        <div className='address_details'>
                            <h5>
                            {shipping.address}, {shipping.city}, {shipping.postalCode},
                            {shipping.country}   
                            </h5>
                        </div>
                    </div>

                    <div className="payment_info">
                        <h2>Payment</h2>
                        <div className='payment_details'>
                            <h5>
                                Payment Method : ${payment.paymentMethod}
                            </h5>
                        </div>
                    </div>

                    <div className='shoppingCart_info'>
                        <table className='table_class'>                       
                            <tr className='table_row_1'>
                                <td>Cart Items</td>
                                <tr></tr>
                                <td>Price</td>
                            </tr>

                            {orderItems.map((item) => 
                            <>
                            <tr className='horizontalLine'>
                                <td>
                                    <hr className='line' />
                                </td>
                                <td>
                                    <hr className='line'/>
                                </td>
                                <td>
                                    <hr className='line'/>
                                </td>
                            </tr>

                            <tr className='table_row_3'>
                                <td className='cartImage'>
                                    <img src= {item.image} alt={item.name}/> 
                                </td>
                                <td className='shoppingCartDetails'>
                                    <h4>{item.name}</h4>
                                    <span> Qty : {item.qty} </span>     
                                </td>

                                <td className='cartProductPrice'>
                                    Rs. {item.price}
                                </td>
                            </tr>
                            </>
                            )}
                        </table>
                    </div>

                </div>

                <div className='col-lg-4 col-12 total_price'>
                   <h4>Order Summery</h4>

                   <table className="total_price_table">
                       <tr className='total_price_row_1'>
                           <td>Items</td>
                           <td>Rs. <span>{totalItemsPrice}</span></td>
                       </tr>

                       <tr>
                           <td>Shipping Charge</td>
                           <td>Rs. <span>{shippingPrice}</span></td>
                       </tr>

                       <tr>
                           <td>Tax</td>
                           <td>Rs. <span>{taxPrice}</span></td>
                       </tr>

                       <tr className='horizontalLine'>
                            <td>
                                <hr className='line'></hr>
                            </td>
                            <td>
                                <hr className='line'></hr>
                            </td>
                        </tr>

                        <tr className='final_price'>
                           <td>Order Total</td>
                           <td>Rs. <span>{totalPrice}</span></td>
                       </tr>
                   </table>
                   <div className="final_button">
                           <button type='submit' className='paymentContinue'>Place Order</button>
                    </div>
                </div>
            </div>   
        </div>

        </>
    )
}

export default PlaceOrderScreen
