import React from 'react'
import { useHistory } from 'react-router';
import { NavLink } from 'react-router-dom/cjs/react-router-dom.min';
import { getUserInfo } from '../localStorage';
import "../css/Dashboard.css";
import fire from '../config/fire';
import { getDatabase, ref, set, onValue } from "firebase/database";
import { useEffect, useState} from 'react';

const DashboardScreen = () => {
    const history = useHistory();

    const [totalOrders, setTotalOrders] = useState([]);

    const db = getDatabase();
    useEffect(()=>{
        const userRef = ref(db, 'orders/');
        onValue(userRef, (snapshot) => {
            const data = snapshot.val();
            const allOrderData = Object.values(data);
            setTotalOrders(allOrderData);
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
                        {menu({ selected: 'dashboard' })}
                    </div>

                    <div className="col-lg-9 col-12 dashboard2">
                        <h2>Dashboard</h2>
                        <ul className="summary-items">
                            <li>
                                <div className="summary-title color3">
                                    <span><i className="fa fa-line-chart"></i>
                                        Sales</span>
                                </div>
                                <div className="summary-body">                                
                                    Rs. {totalOrders.reduce((a, c) => a + c.totalPrice, 0).toFixed(1)}
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}

export default DashboardScreen
