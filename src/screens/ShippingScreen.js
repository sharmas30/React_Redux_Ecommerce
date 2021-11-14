import React from 'react'
import { useState } from 'react/cjs/react.development'
import '../css/ShippingScreen.css'
import { useHistory } from 'react-router';
import { getShippingInfo, setShippingInfo } from '../localStorage';
import { checkoutSteps } from '../utils';

const ShippingScreen = () => {
    
    const shipping_details = getShippingInfo();
    console.log("NNNN ", shipping_details)
    const [shippingDetails, setShippingDetails] = useState({
        fullName: shipping_details.fullName,
        mobile : shipping_details.mobile,
        address : shipping_details.address,
        city : shipping_details.city,
        postalCode : shipping_details.postalCode,
        country : shipping_details.country
    });
    const history = useHistory();

    console.log("SHHHH_ ", shippingDetails)

    const saveShippingDetails = () => {
        console.log('SHIPPING_ 1', shippingDetails)
        setShippingInfo(shippingDetails);
        history.push('/payment');
    }


    return (
        <>
        <form>
           <div className=' row '>
           <div className="shipping-status">
                {checkoutSteps({step1: true, step2: true})}
            </div> 
                <div className='col-lg-12 col-12 registerCard' >
                    <div className='shippingDetails shippingDetails_1'>
                        <ul className='shippingformDetails'>
                            <li>
                                <h1>Shipping Details</h1>
                            </li>
                            
                            <li>
                                <label for='fname'>Full Name</label>
                                <input type='text' name='fname' value={shippingDetails.fullName} onChange={(e)=> setShippingDetails({...shippingDetails, fullName : e.target.value})} required />
                            </li>

                            <li>
                                <label for='mobile'>Mobile No</label>
                                <input type="tel" name="phone_number" placeholder="9999999999" pattern="[789][0-9]{9}" value={shippingDetails.mobile} onChange={(e)=> setShippingDetails({...shippingDetails, mobile : e.target.value})} required='required' />
                            </li>

                            <li>
                                <label for='address'>Address</label>
                                <textarea type='text' name='address' rows="2" value={shippingDetails.address} onChange={(e)=> setShippingDetails({...shippingDetails, address : e.target.value})} required='required' />
                            </li>

                            <li>
                                <label for='city'>City</label>
                                <input type='text' name='City' value={shippingDetails.city} onChange={(e)=> setShippingDetails({...shippingDetails, city : e.target.value})} required='required' />
                            </li>

                            <li>
                                <label for='email'>Postal Code</label>
                                <input type="text" name="postalCode" placeholder="xxx xxx" value={shippingDetails.postalCode} onChange={(e)=> setShippingDetails({...shippingDetails, postalCode : e.target.value})} required='required' />
                            </li>

                            <li>
                                <label for='Country'>Country</label>
                                <input type='text' name='country' value={shippingDetails.country} onChange={(e)=> setShippingDetails({...shippingDetails, country : e.target.value})} required='required' />
                            </li>

                            <li>
                                <button type='submit' className='shippingContinue' onClick={saveShippingDetails}>Continue <i class='fas fa-arrow-right'></i></button>
                            </li>

                        </ul>
                    </div>
                </div>
           </div>
           </form>
        </>
    )
}

export default ShippingScreen
