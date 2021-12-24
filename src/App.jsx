import React, { useEffect } from 'react';
import { BrowserRouter, NavLink } from 'react-router-dom';
import { Route, Switch } from 'react-router-dom'
import './css/App.css'
import fire from '../src/config/fire';
import { getDatabase, ref, set, onValue } from "firebase/database";
import cartScreen from './screens/CartScreen';
import DashboardScreen from './screens/DashboardScreen';
import HomeScreen from './screens/HomeScreen';
import PaymentScreen from './screens/PaymentScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import ProductCreateScreen from './screens/ProductCreateScreen';
import ProductScreen from './screens/ProductScreen';
import RegisterScreen from './screens/RegestierScreen';
import ShippingScreen from './screens/ShippingScreen';
import Sidebar from './screens/Sidebar';
import SigninScreen from './screens/SigninScreen';
import OrderListScreen from './screens/OrderListScreen';
import { useState } from 'react';
import ProductListScreen from './screens/ProductListScreen';
import ProductEditScreen from './screens/ProductEditScreen';
import OrderScreen from './screens/OrderScreen';

function App() {

    return (
        <BrowserRouter>
            <div className="App grid-container">
                <header>
                    <div>
                        <NavLink to="/">Sharmas</NavLink>
                    </div>
                    <div className='cartIcon'>
                        <div className='cart_icon'>
                            <NavLink to="/cart"><i className='fa fa-shopping-cart'></i></NavLink>
                        </div>
                        <div className='hamburger'><Sidebar /></div>
                    </div>
                </header>

                <main className='mainContent'>
                    <Switch>
                        <Route path= '/' component = {HomeScreen} exact></Route>
                        <Route path= '/product/:id' component={ProductScreen} ></Route>
                        <Route path= '/cart' component={cartScreen} ></Route>
                        <Route path= '/signin' component={SigninScreen} ></Route>
                        <Route path= '/register' component={RegisterScreen} ></Route>
                        <Route path= '/shipping' component={ShippingScreen} ></Route>
                        <Route path= '/payment' component={PaymentScreen} ></Route>
                        <Route path= '/placeorder' component={PlaceOrderScreen} ></Route>
                        <Route path= '/productcreate' component={ProductCreateScreen} ></Route>
                        <Route path= '/dashboard' component={DashboardScreen} ></Route>
                        <Route path= '/orderlist' component={OrderListScreen} ></Route>
                        <Route path= '/productlist' component={ProductListScreen} ></Route>
                        <Route path= '/productedit/:id' component={ProductEditScreen} ></Route>
                        <Route path= '/order/:id' component={OrderScreen} ></Route>
                    </Switch>
                </main>

                <footer>
                    All rights reserved @2020
                </footer>      
            </div>
        </BrowserRouter>
    );
}

export default App;
