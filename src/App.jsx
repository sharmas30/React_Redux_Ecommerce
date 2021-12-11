import React from 'react';
import { BrowserRouter, NavLink } from 'react-router-dom';
import { Route, Switch } from 'react-router-dom'
import './css/App.css'
import cartScreen from './screens/CartScreen';
import HomeScreen from './screens/HomeScreen';
import PaymentScreen from './screens/PaymentScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import ProductCreateScreen from './screens/ProductCreateScreen';
import ProductScreen from './screens/ProductScreen';
import RegisterScreen from './screens/RegestierScreen';
import ShippingScreen from './screens/ShippingScreen';
import SigninScreen from './screens/SigninScreen';

function App() {
    return (
        <BrowserRouter>
            <div className="App grid-container">
                <header>
                    <div>
                        <NavLink to="/">Sharmas</NavLink>
                    </div>
                    <div className='cartIcon'>
                        {/* <NavLink to="/signin">Signin</NavLink> */}
                        <NavLink to="/cart"><i className='fa fa-shopping-cart'></i></NavLink>
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
