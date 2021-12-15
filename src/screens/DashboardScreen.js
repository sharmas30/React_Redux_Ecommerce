import React from 'react'
import { useHistory } from 'react-router';
import { NavLink } from 'react-router-dom/cjs/react-router-dom.min';
import { getUserInfo } from '../localStorage';
import "../css/Dashboard.css";

const DashboardScreen = () => {
    const history = useHistory();

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
                                {/* Rs ${allOrder.reduce((a, c) => a + c.totalPrice, 0).toFixed(1)} */}
                                    Rs. 7999
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            
        </>
    )
}

export default DashboardScreen
