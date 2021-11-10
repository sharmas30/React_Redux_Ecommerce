import React from 'react'
import { NavLink } from 'react-router-dom'
import { useState } from 'react/cjs/react.development'
import '../css/RegisterScreen.css'
import fire from '../config/fire';
import {getAuth, createUserWithEmailAndPassword } from "firebase/auth"
import { getDatabase, ref, set, onValue } from "firebase/database";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getCartItems, setUserInfo } from '../localStorage';
import { useHistory } from 'react-router';

const RegisterScreen = () => {

    const [userRegister, setuserRegister] = useState({})
    const history = useHistory();

    const createUser = () => {
        const auth = getAuth();
        createUserWithEmailAndPassword(auth, userRegister.email, userRegister.password).then((userCredential)=>{
            console.log("FIREBASE_UID ", userCredential.user.uid);
            const uid = userCredential.user.uid;
            const db = getDatabase();
            set(ref(db, 'users/' + uid), {...userRegister, isAdmin: false, userId: uid})

            toast.success("User Added Successfully...!",
            {position: toast.POSITION.TOP_CENTER});

            const userRef = ref(db, 'users/' + uid);
            onValue(userRef, (snapshot) => {
                const data = snapshot.val();
                console.log("GET DATA_1 ", data);
                setUserInfo(data);
                redirectUser();
            })

        }).catch((err)=>{
            console.log(err);
            toast.error("Something weng wrong!",
            {position: toast.POSITION.TOP_CENTER});
        })
    }

    const redirectUser = () =>{
        if(getCartItems().length !== 0){
            history.push('/shipping');
        } else{
            history.push('/');
        }
    }

    return (
        <>
           <ToastContainer />      
           <div className=' row contain'>
                <div className='col-lg-12 col-12 registerCard' >
                    <div className='signInDetails registerDetails'>
                        <ul className='formDetails'>
                            <li>
                                <h1>Register </h1>
                            </li>
                            
                            <li>
                                <label for='fname'>First Name</label>
                                <input type='text' name='fname' value={userRegister.fname} onChange={(e)=> setuserRegister({...userRegister, fname : e.target.value})} required='required' />
                            </li>

                            <li>
                                <label for='lanme'>Last Name</label>
                                <input type='text' name='lname' value={userRegister.lname} onChange={(e)=> setuserRegister({...userRegister, lname : e.target.value})} required='required' />
                            </li>

                            <li>
                                <label for='mobile'>Mobile No</label>
                                <input type='phone' name='mobile' value={userRegister.mobile} onChange={(e)=> setuserRegister({...userRegister, mobile : e.target.value})} required='required' />
                            </li>

                            <li>
                                <label for='email'>Email</label>
                                <input type='email' name='email' value={userRegister.email} onChange={(e)=> setuserRegister({...userRegister, email : e.target.value})} required='required' />
                            </li>

                            <li>
                                <label for='password'>Password</label>
                                <input type='password' name='password' value={userRegister.password} onChange={(e)=> setuserRegister({...userRegister, password : e.target.value})} required='required' />
                            </li>

                            <li>
                                <button type='submit' className='' onClick={createUser} > Register</button>
                            </li>

                            <div className="new-user-register">
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
