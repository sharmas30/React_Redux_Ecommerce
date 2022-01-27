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
import UserProfileScreen from './screens/UserProfilrScreen';
import ContactScreen from './screens/ContactScreen';
import AboutUsScreen from './screens/AboutUsScreen';
import MainPageScreen from './screens/MainPageScreen';

function App() {

    return (
        <BrowserRouter>
            <div className="App grid-container">
                <header>
                    <div>
                        <NavLink to="/">Tammas</NavLink>
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
                        <Route path= '/' component = {MainPageScreen} exact></Route>
                        <Route path= '/home/:id' component = {HomeScreen} exact></Route>
                        <Route path= '/product/:id' component={ProductScreen} exact ></Route>
                        <Route path= '/cart' component={cartScreen} exact ></Route>
                        <Route path= '/signin' component={SigninScreen} exact></Route>
                        <Route path= '/register' component={RegisterScreen} exact></Route>
                        <Route path= '/shipping' component={ShippingScreen}exact ></Route>
                        <Route path= '/payment' component={PaymentScreen} exact></Route>
                        <Route path= '/placeorder' component={PlaceOrderScreen} exact></Route>
                        <Route path= '/productcreate' component={ProductCreateScreen} exact></Route>
                        <Route path= '/dashboard' component={DashboardScreen} exact></Route>
                        <Route path= '/orderlist' component={OrderListScreen} exact></Route>
                        <Route path= '/productlist' component={ProductListScreen} exact></Route>
                        <Route path= '/productedit/:id' component={ProductEditScreen} exact></Route>
                        <Route path= '/order/:id' component={OrderScreen} exact></Route>
                        <Route path= '/userprofile' component={UserProfileScreen} exact></Route>
                        <Route path= '/contact' component={ContactScreen} exact></Route>
                        <Route path= '/aboutus' component={AboutUsScreen} exact></Route>

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
