import React from 'react'
import '../css/UserProfileScreen.css'
import fire from '../config/fire';
import { getDatabase, ref, set, onValue, remove } from "firebase/database";
import {getAuth, signOut } from "firebase/auth"
import { useEffect } from 'react';
import { useState } from 'react';
import { clearUser, getUserInfo } from '../localStorage';
import { useHistory } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UserProfilrScreen = () => {

    const [userOrder, setUserOrder] = useState([]);
    const history = useHistory();

    const db = getDatabase();
    const userInfo = getUserInfo()

    useEffect(()=>{
        const userRef = ref(db, 'orders/');
        onValue(userRef, (snapshot) => {
            const data = snapshot.val();
            const AllOrders = Object.values(data);
            const userOrder =  AllOrders.filter(x => x.user_id == userInfo.userId )
            setUserOrder(userOrder.reverse());
        })
    },[])

    const userSignOut = () => {

        if(window.confirm("Want To LogOut ?")){
            const auth = getAuth();

            signOut(auth).then(() => {
                toast.success("User SignOut Successfully...!",
                {position: toast.POSITION.TOP_CENTER});
                setTimeout(()=>{
                    clearUser()
                    history.push('/');
                }, 2500)
              }).catch((error) => {
                toast.error("Error... Try Again!",
                {position: toast.POSITION.TOP_CENTER});
              });
        }
    }

    return (
        <>
        <ToastContainer />   
        <div className='productListContainer'>
            <div className="container content">
                <div className='row'>
                    <div className='col-lg-4 col-12 '>
                        <div className='userProfileDetails'>
                            <ul className='userformDetails'>
                                <li>
                                    <h1>User Profile</h1>
                                </li>

                                <li>
                                    <label for='name'>Name</label>
                                    <input type="text" name="name" value={userInfo.fname} />
                                </li>

                                <li>
                                    <label for='email'>Email</label>
                                    <input type="email" name="email" value={userInfo.email} />
                                </li>

                                <li>
                                    <button type='submit' onClick={userSignOut} > SignOut</button>
                                </li>
                            </ul>
                        </div>
                        
                    </div>

                    <div className="col-lg-8 col-12 orderHistoryListParent">
                            <h2>Order History</h2>
                            <div className='orderHistoryList'>
                                <table className='' style={{width:"100%", height:"20%"}}>
                                    <thead>
                                        <tr className='orderHistoryListTable'>
                                            <th>Sr. No</th>
                                            <th>Order Id</th>
                                            <th>Total</th>
                                            <th>Delivered</th>
                                            <th>ACTION</th>
                                        </tr>
                                    </thead>

                                    <tr className="cartHorizLine">
                                        <td>
                                            <span className='line'></span>
                                        </td>
                                        <td>
                                            <span className='line'></span>
                                        </td>
                                        <td>
                                            <span className='line'></span>
                                        </td>
                                        <td>
                                            <span className='line'></span>
                                        </td>
                                        <td>
                                            <span className='line'></span>
                                        </td>
                                    </tr>

                                    <tbody className='orderHistoryListBody'>
                                        {
                                            userOrder.length === 0 
                                            ?   <>
                                                    <tr><td colSpan="7"> No Product Found</td></tr>
                                                    <tr> 
                                                        <td colSpan="7" className="orderHistoryListLoader">
                                                            <h2>Please wait... loading all orders...</h2>
                                                        </td>
                                                    </tr>
                                                </>
                                            : userOrder.map((order, index) =>{
                                                return(
                                                    <>
                                                        <tr key={index + 1}>
                                                            <td>{(userOrder.length) - index}</td>
                                                            <td>{order.order_id}</td>
                                                            <td>{order.totalPrice}</td>
                                                            <td>{!order.deliveredAt ? "Not Delivered":order.deliveredAt }</td>
                                                            <td className='adminProduct'>
                                                                <button className="deleteButton" onClick={()=>history.push(`/order/${order.order_id}`)}>Action</button>
                                                            </td>
                                                        </tr>
                                                    </>
                                                )
                                            })
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                </div>
            </div> 
        </div>
                   
        </>
    )
}

export default UserProfilrScreen
