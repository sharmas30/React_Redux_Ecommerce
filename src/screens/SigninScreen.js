import React from 'react'
import { NavLink } from 'react-router-dom'
import { useState } from 'react/cjs/react.development'
import '../css/SigninScreen.css'
import fire from '../config/fire';
import {getAuth, signInWithEmailAndPassword } from "firebase/auth"
import { getDatabase, ref, set, onValue } from "firebase/database";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { setUserInfo } from '../localStorage';

const SigninScreen = () => {

    const [userzSiginin, setUserzSignin] = useState({})

    const signInUser = () => {
        const auth = getAuth();
        signInWithEmailAndPassword(auth, userzSiginin.email, userzSiginin.password).then((userCredential) => {
            const uid = userCredential.user.uid;
            toast.success("User Signin Successfully...!",
            {position: toast.POSITION.TOP_CENTER});

            const db = getDatabase();
            const userRef = ref(db, 'users/' + uid);
            onValue(userRef, (snapshot) => {
                const data = snapshot.val();
                setUserInfo(data);
            })

        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            toast.error(errorCode,
            {position: toast.POSITION.TOP_CENTER});
        })
    }

    return (
        <>
           <ToastContainer />      
           <div className='row contain'>
                <div className='col-lg-12 col-12 signInCart' >
                    <div className='signInDetails'>
                        <ul className='formDetails'>
                            <li>
                                <h1>Sign In</h1>
                            </li>
                            
                            <li>
                                <label for='email'>Email</label>
                                <input type='email' name='email' name='email' value={userzSiginin.email} onChange={(e)=> setUserzSignin({...userzSiginin, email : e.target.value})} required='required' />
                            </li>

                            <li>
                                <label for='password'>Password</label>
                                <input type='password' name='password' name='password' value={userzSiginin.password} onChange={(e)=> setUserzSignin({...userzSiginin, password : e.target.value})} required='required' />
                            </li>

                            <li>
                                <button type='submit' className='' onClick={signInUser} > SignIn</button>
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
