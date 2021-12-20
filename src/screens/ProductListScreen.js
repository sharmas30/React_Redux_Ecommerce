import React, { useState } from 'react'
import { NavLink, useHistory } from 'react-router-dom';
import "../css/ProductListScreen.css";
import fire from '../config/fire';
import { getDatabase, ref, set, onValue, remove } from "firebase/database";
import { useEffect } from 'react';
import Loader from '../components/Loader';
import { deleteObject, ref as sRef, getStorage } from 'firebase/storage';
import ReactJsAlert from "reactjs-alert"; 


const ProductListScreen = () => {

    const [allProduct, setAllProduct] = useState([])
    const history = useHistory();

    const [productDeleteAlert, setProductDeleteAlert] = useState({
        type: 'warning',
        status: false,
        title: "Please Select Size",
        quote: "Something went wrong. Please try again!",
    })

    const db = getDatabase();
    const storage = getStorage();

    useEffect(()=>{
        var allProductData = null;
        var userRef = ref(db, 'allProducts/');
        onValue(userRef, (snapshot) => {
            var data = snapshot.val();
            allProductData = data ? allProductData = Object.values(data) : [] 
            console.log("GET Products__222 ", allProductData);
            setAllProduct(allProductData);
            // setLoadingProductState(false);
        })
    },[])

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
                    <li className={props.selected === 'productsList' ? 'selected' : ''}>
                        <NavLink to="/productlist"><span>Products</span> </NavLink>
                    </li>
                </ul>
            </div>            
        )
    }

    const deleteProduct = (id) =>{
        const storageRef = sRef(storage, 'images/' + id + ".png");
        const realtimeRef = ref(db, 'allProducts/' + id);

           if(window.confirm("want to delete it ?"))
           {
            deleteObject(storageRef).then(() => {
                remove(realtimeRef).then(() => {
                    setProductDeleteAlert({
                        type: 'error',
                        status: true,
                        title: "Product deleted successfully",
                    })
                }).catch((error) => {
                    alert("Please try again");
                });
            }).catch((error) => {
                alert("Please try again__!");
            });
        }
    }

    console.log("DDDDDDDD___ ", allProduct);

    return (
        <>
        <ReactJsAlert
            status={productDeleteAlert.status} // true or false
            type={productDeleteAlert.type} // success, warning, error, info
            title={productDeleteAlert.title}
            Close={() => setProductDeleteAlert({ status: false })}
            />    
            <div className='orderListContent productListContainer'>
                <div className="container content">
                    <div className='row '>
                        <div className="col-lg-3 col-12 dashboard1">
                            {menu({ selected: 'productsList' })}
                        </div>

                        <div className="col-lg-9 col-12 productListParent">
                            <h2>Prodeuct List</h2>
                            <button className='primary createProductButton' onClick={()=>history.push("/productcreate")}> Create Product</button>
                            <div className='productList'>
                                <table className='productListTable' style={{width:"100%", height:"20%"}}>
                                    <thead>
                                        <tr>
                                            <th>Sr. No</th>
                                            <th>PRODUCT ID</th>
                                            <th>NAME</th>
                                            <th>PRICE</th>
                                            <th>CATEGORY</th>
                                            <th>BRAND</th>
                                            <th>ACTION</th>
                                        </tr>
                                    </thead>

                                    <tbody className='productListBody'>
                                        {
                                            allProduct.length === 0 
                                            ?   <>
                                                    <tr><td colSpan="7"> No Product Found</td></tr>
                                                    <tr> 
                                                        <td colSpan="7" className="productListLoader">
                                                            <h2>Please wait... loading all products...</h2>
                                                        </td>
                                                    </tr>
                                                </>
                                            : allProduct.map((product, index) =>{
                                                return(
                                                    <>
                                                        <tr key={index}>
                                                            <td>{index + 1}</td>
                                                            <td>{product.productId}</td>
                                                            <td>{product.productName}</td>
                                                            <td>{product.productPrice}</td>
                                                            <td>{product.productCategory}</td>
                                                            <td>{product.productBrand}</td>
                                                            <td className='adminProduct'>
                                                                <button className="editButton">Edit</button>
                                                                <button className="deleteButton" onClick={()=>deleteProduct(product.productId)}>Delete</button>
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

export default ProductListScreen
