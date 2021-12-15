import React, { useEffect } from 'react'
import { useState } from 'react';
import { useHistory } from 'react-router';
import { NavLink } from 'react-router-dom/cjs/react-router-dom.min';
import { getUserInfo } from '../localStorage';
import "../css/OrderListScreen.css";
import fire from '../config/fire';
import { getDatabase, ref, set, onValue } from "firebase/database";
import { connectStorageEmulator } from 'firebase/storage';

const OrderListScreen = () => {
    const history = useHistory();
    const [allOrders, setOrders] = useState([]);

    const db = getDatabase();
    useEffect(()=>{
        const userRef = ref(db, 'orders/');
        onValue(userRef, (snapshot) => {
            const data = snapshot.val();
            const allOrderData = Object.values(data);
            console.log("GET USERSSSS__111 ", allOrderData);
            setOrders(allOrderData);
        })
    },[])

    const menu = (props) =>{
        return(
            <div className='dashboard-menu'>
                <ul>
                    <li className={props.selected === 'dashboard' ? 'selected' : ''}>
                        <NavLink to="/dashboard" > <span>Dashboard</span></NavLink>
                    </li>
                    <li className={props.selected === 'orders' ? 'selected' : ''}>
                        <NavLink to="/orderlist" ><span>Orders</span></NavLink>
                    </li>
                    <li className={props.selected === 'products' ? 'selected' : ''}>
                        <NavLink to="/productlist"><span>Products</span> </NavLink>
                    </li>
                </ul>
            </div>            
        )
    }

    if(!getUserInfo().isAdmin)
        history.push('/');

    return (
        <>
        <div className='orderListContent'>
            <div className="container content">
                <div className='row '>
                    <div className="col-lg-3 col-12 dashboard1">
                        {menu({ selected: 'orders' })}
                    </div>

                    <div className="col-lg-9 col-12 orderListHeader">
                        <h2>Orders</h2>
                        <div className='adminOrder2'>
                            {
                                allOrders.length === 0 
                                ? `<tr><td colspan="6">No Order Found.</tr>`
                                : allOrders.map((order, index) => {
                                    return (<div key={index}>
                                        <ul>
                                            <li>
                                                <h5>Order No. {index + 1}</h5>
                                            </li>
                                            <li>
                                                <span>Customer Name : {order.shipping.name}</span>
                                            </li>
                                            <li>
                                                <span>order date : {order.orderDate}</span>
                                            </li>
                                            <li>
                                                <button type='submit'>Order Details</button>
                                            </li>
                                        </ul>
                                    </div>)
                                })
                            }
                        </div>
                    </div>
                </div>
            </div>
            </div>
        </>
    )
}

export default OrderListScreen
