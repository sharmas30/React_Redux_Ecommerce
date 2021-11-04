import React from 'react'
import { NavLink } from 'react-router-dom'
import '../css/SigninScreen.css'

const SigninScreen = () => {
    return (
        <>
           <div className='row contain'>
                <div className='col-lg-12 col-12 signInCart' >
                    <div className='signInDetails'>
                        <ul className='formDetails'>
                            <li>
                                <h1>Sign In</h1>
                            </li>
                            
                            <li>
                                <label for='email'>Email</label>
                                <input type='email' name='email' required='required' />
                            </li>

                            <li>
                                <label for='password'>Password</label>
                                <input type='password' name='password' required='required' />
                            </li>

                            <li>
                                <button type='submit' className=''> SignIn</button>
                            </li>

                            <div className="forget-pass"> 
                                <NavLink to='/'> <span> Forget Password </span> </NavLink>
                            </div>
                            <div className="new-user">
                                New User ?
                                <NavLink to="/register"> <span> Create Your Account</span>  </NavLink>
                            </div>

                        </ul>
                    </div>
                </div>
           </div>
        </>
    )
}

export default SigninScreen
