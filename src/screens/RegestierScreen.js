import React from 'react'
import { NavLink } from 'react-router-dom'
import '../css/RegisterScreen.css'

const RegisterScreen = () => {
    return (
        <>
           <div className='row contain'>
                <div className='col-lg-12 col-12 signInCart' >
                    <div className='signInDetails registerDetails'>
                        <ul className='formDetails'>
                            <li>
                                <h1>Register </h1>
                            </li>
                            
                            <li>
                                <label for='fname'>First Name</label>
                                <input type='text' name='fname' required='required' />
                            </li>

                            <li>
                                <label for='lanme'>Last Name</label>
                                <input type='text' name='lname' required='required' />
                            </li>

                            <li>
                                <label for='mobile'>Mobile No</label>
                                <input type='phone' name='mobile' required='required' />
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
                                <button type='submit' className=''> Register</button>
                            </li>

                            <div className="new-user">
                                Already account ?
                                <NavLink to="/signin"><span> Signin User</span> </NavLink>
                            </div>

                        </ul>
                    </div>
                </div>
           </div>
        </>
    )
}

export default RegisterScreen
