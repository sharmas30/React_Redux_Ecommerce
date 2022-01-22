import React from 'react'
import '../css/OrderScreen.css'
import { cleanCart, getCartItems, getPayment, getShippingInfo, getUserInfo } from '../localStorage'
import { checkoutSteps } from '../utils'
import { useHistory } from 'react-router';
import { useParams } from 'react-router-dom';
import fire from '../config/fire';
import { getDatabase, ref, set, onValue, update } from "firebase/database";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useState } from 'react';
import { useEffect } from 'react';
import Loader from '../components/Loader';

var flag = true;

const OrderScreen = () => {

    const [receiveOrder, setReceiveOrder] = useState({})
    const [loadingState, setLoadingState] = useState(true);
    const history = useHistory();
    const param = useParams()
    const { isAdmin } = getUserInfo();

    const db = getDatabase();
    debugger
    useEffect(()=>{
        var userRef = ref(db, `orders/${param.id}`);
        onValue(userRef, (snapshot) => {
            var data = snapshot.val();
            setReceiveOrder(data);
            setTimeout(() => {
                setLoadingState(false);                
            }, 800);
        })
    },[])

    const deliverOrder = (orderId) => {
        var d = new Date();
        var deliverDate = d.toLocaleString();
        update(ref(db, 'orders/' + orderId), {
            deliveredAt: deliverDate,
            isDelivered: true,
        })
    }

    console.log('GGGGGG___', receiveOrder);

    return (
        <>
        <ToastContainer />      
        <div className="container content orderLoadingText">
        {loadingState ?<h3 className='loadingText'>Loading... </h3> : ''}
        {
            loadingState ? <Loader />: 
            <>

                <div className='orderSummery'>
                    <h2>Your Order</h2>
                </div> 
                <div className='row previewOrder'>
                <div className='col-lg-8 col-12 order'>
                    <span className='orderId'> Order Id : {receiveOrder.order_id}</span>
                    <div className="customer_info">
                        <h4>Customer Details</h4>
                        <div className='customer_details'>
                            <h5>
                                {receiveOrder.shipping.fullName}, {receiveOrder.shipping.mobile}
                            </h5>
                        </div>
                    </div>
                    <div className="address_info">
                        <h4>Shipping Address</h4>
                        <div className='address_details'>
                            <h5>
                            {receiveOrder.shipping.address}, {receiveOrder.shipping.city}, {receiveOrder.shipping.country},
                            {receiveOrder.shipping.postalCode}  
                            </h5>

                            {
                            receiveOrder.isDelivered
                            ? <div className="Deliveredsuccess">Delivered at {receiveOrder.deliveredAt}</div>
                            : <div className="Deliverederror">Not Delivered</div>
                    }

                        </div>
                    </div>

                    <div className="payment_info">
                        <h4>Payment</h4>
                        <div className='payment_details'>
                            <h5>
                                Payment Method : {receiveOrder.payment.paymentMethod}
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

                            {receiveOrder.orderItems.map((item) => 
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
                                    <img src= {item.Productimage} alt={item.productName}/> 
                                </td>
                                <td className='shoppingCartDetails'>
                                    <h4>{item.productName}</h4>
                                    <span> Qty : {item.qty} </span>     
                                </td>

                                <td className='shippingcartProductPrice'>
                                    Rs. {item.productPrice}
                                </td>
                            </tr>
                            </>
                            )}
                        </table>
                    </div>

                </div>

                <div className = {`${ isAdmin ? receiveOrder.isDelivered ? "col-lg-4 col-12 total_price_not totalPrice_1" : "col-lg-4 col-12 total_price totalPrice_1" : "col-lg-4 col-12 total_price_not totalPrice_1" }`} >
                    <h4>Order Summery</h4>
                    <table className="total_price_table">
                        <tr className='total_price_row_1 total_price_1'>
                            <td>Items</td>
                            <td>Rs. <span>{receiveOrder.totalItemsPrice}</span></td>
                        </tr>

                        <tr className='total_price_1'>
                            <td>Shipping Charge</td>
                            <td>Rs. <span>{receiveOrder.shippingPrice}</span></td>
                        </tr>

                        <tr className='total_price_1'>
                            <td>Tax</td>
                            <td>Rs. <span>{receiveOrder.taxPrice}</span></td>
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
                            <td>Rs. <span>{receiveOrder.totalPrice}</span></td>
                        </tr>
                    </table>
                    <div className="final_button">
                        {
                            isAdmin && !receiveOrder.isDelivered
                            ? <button type='submit' className='paymentContinue' onClick={()=>deliverOrder(receiveOrder.order_id)}>Delivere Order</button>
                            :""
                        }
                        
                    </div>
                </div>
            </div>   
            </>
        }
            
        </div>

        </>
    )
}

export default OrderScreen
