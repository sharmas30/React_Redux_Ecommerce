import React from 'react'
import '../css/PaymentScreen.css'
import { setPayment } from '../localStorage'
import { checkoutSteps } from '../utils'
import { useHistory } from 'react-router';

const PaymentScreen = () => {

    const history = useHistory();

    const getPaymentInfo = (e) => {
        setPayment({paymentMethod: e.target.value});
    }

    return (
        <>
            <div className='row contain'>
            <div className="shipping-status">
                {checkoutSteps({step1: true, step2: true, step3: true})}
            </div>   
                <div className='col-lg-12 col-12' >
                    <div className='paymentDetails'>
                        <ul className='paymentformDetails' onChange={(e)=>getPaymentInfo(e)}>
                            <li>
                                <h1>Payment Method</h1>
                            </li>
                            <p> We accept payment at your door stape with method you select </p>
                            
                            <li>
                                <input type='radio' name='payment_method' value='Google Pay' required='required'  />
                                <label for='pay'>Google Pay</label>
                            </li>

                            <li>
                                <input type='radio' name='payment_method' value='Phone Pay' required='required' />
                                <label for='pay'>Phone Pay</label>
                            </li>

                            <li>
                                <input type='radio' name='payment_method' value='Cash' required='required' />
                                <label for='pay'>Cash On Delivery</label>
                            </li>

                            <li className='paymentformButton'>
                                <button type='submit' className='paymentContinue' onClick={()=> history.push('/placeorder')} > Continue <i class='fas fa-arrow-right'></i></button>
                            </li>
                        </ul>
                    </div>
                </div>
           </div>  
        </>
    )
}

export default PaymentScreen
