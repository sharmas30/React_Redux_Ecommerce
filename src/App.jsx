import React from 'react';
import { BrowserRouter, NavLink } from 'react-router-dom';
import { Route, Switch } from 'react-router-dom'
import './css/App.css'
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';

function App() {
    return (
        <BrowserRouter>
            <div className="App grid-container">
                <header>
                    <div>
                        <NavLink to="/">Sharmas</NavLink>
                    </div>
                    <div>
                        <NavLink to="/signin">Signin</NavLink>
                        <NavLink to="/cart">Cart</NavLink>
                    </div>
                </header>

                <main className='mainContent'>
                    <Switch>
                        <Route path= '/product/:id' component={ProductScreen} ></Route>
                        <Route path= '/' component = {HomeScreen} exact></Route>
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
