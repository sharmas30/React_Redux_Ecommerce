import React, { useEffect } from 'react'
import { useState } from 'react';
import { useHistory } from 'react-router';
import { NavLink } from 'react-router-dom/cjs/react-router-dom.min';
import { getUserInfo } from '../localStorage';
import Loader from '../components/Loader';
import "../css/OrderListScreen.css";
import fire from '../config/fire';
import { getDatabase, ref, set, onValue } from "firebase/database";
import { connectStorageEmulator } from 'firebase/storage';

const OrderListScreen = () => {
    const history = useHistory();
    const [allOrders, setOrders] = useState([]);
    const [loadingState, setLoadingState] = useState(true);

    const db = getDatabase();
    useEffect(()=>{
        const userRef = ref(db, 'orders/');
        onValue(userRef, (snapshot) => {
            const data = snapshot.val();
            const allOrderData = Object.values(data);
            console.log("GET USERSSSS__111 ", allOrderData);
            setOrders(allOrderData);
            setLoadingState(false);
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
                        {
                            loadingState ? <Loader />: ''
                        }
                        <div className='adminOrder2'>
                            {
                                allOrders.length === 0 
                                ? <h3>Loading... </h3>
                                : allOrders.map((order, index) => {
                                    return (
                                    <div key={index}>
                                        <ul>
                                            <li className='orderListIndex'>
                                                <h5>Order No. {index + 1}
                                                <NavLink to="/"><span><i className='fa fa-remove hide' style={{fontSize:"20px", color:"rgb(219, 52, 80)"}}></i></span></NavLink>
                                                </h5>
                                            </li>
                                            <li className='orderListName'>
                                                <strong>Customer Name : </strong> <span>{order.shipping.fullName} </span>
                                            </li>
                                            <li className='orderListDate'>
                                                <strong>Order Date : </strong> <span>{order.orderDate} </span>
                                            </li>
                                            <li className='orderListDetailsButton'>
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
