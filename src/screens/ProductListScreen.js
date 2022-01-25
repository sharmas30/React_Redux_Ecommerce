import React, { useState } from 'react'
import { NavLink, useHistory } from 'react-router-dom';
import "../css/ProductListScreen.css";
import fire from '../config/fire';
import { getDatabase, ref, set, onValue, remove } from "firebase/database";
import { useEffect } from 'react';
import Loader from '../components/Loader';
import { deleteObject, ref as sRef, getStorage } from 'firebase/storage';
import ReactJsAlert from "reactjs-alert"; 
import LoaderComponent from './LoaderComponent';
import { getUserInfo } from '../localStorage';


const ProductListScreen = () => {

    const [allProduct, setAllProduct] = useState([])
    const [allProductCatg2, setAllProductCatg2] = useState([])
    const [allProductCatg3, setAllProductCatg3] = useState([])
    const [deleteLoader, setDeleteLoader] = useState(false)
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
        var allProductCatg_2 = null;
        var allProductCatg_3 = null;
        var userRef = ref(db, 'allProducts/');
        onValue(userRef, (snapshot) => {
            var data = snapshot.val();
            allProductData = data ? allProductData = Object.values(data) : [] 
            console.log("GET Products__111 ", allProductData);
            setAllProduct(allProductData);
        })

        var userRefC2 = ref(db, 'allProductsCategory_2/');
        onValue(userRefC2, (snapshot) => {
            var catg2Data = snapshot.val();
            allProductCatg_2 = catg2Data ? allProductCatg_2 = Object.values(catg2Data) : [] 
            console.log("GET Products__222 ", allProductCatg_2);
            setAllProductCatg2(allProductCatg_2);
        })

        var userRefC3 = ref(db, 'allProductsCategory_3/');
        onValue(userRefC3, (snapshot) => {
            var catg3Data = snapshot.val();
            allProductCatg_3 = catg3Data ? allProductCatg_3 = Object.values(catg3Data) : [] 
            console.log("GET Products__333 ", allProductCatg_3);
            setAllProductCatg3(allProductCatg_3);
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
        setDeleteLoader(true);
        if(window.confirm("want to delete it ?"))
        {
            for(var i=1; i<4; i++){
                const storageRef = sRef(storage, 'images/' + id +"_"+ i + ".png");
                deleteObject(storageRef).then(() => {
                    
                }).catch((error) => {
                    // alert("Please try again__!");
                });
            }

            const storageRef = sRef(storage, 'images/' + id + ".png");
            const realtimeRef = ref(db, 'allProducts/' + id);
            deleteObject(storageRef).then(() => {
                remove(realtimeRef).then(() => {
                    setProductDeleteAlert({
                        type: 'error',
                        status: true,
                        title: "Product deleted successfully",
                    })
                    setDeleteLoader(false);
                }).catch((error) => {
                    alert("Please try again");
                });
            }).catch((error) => {
                alert("Please try again__!");
            });
        }
    }

    if(!getUserInfo().isAdmin)
        history.push('/');

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
                            { deleteLoader ? <LoaderComponent /> : "" }
                                <table className='' style={{width:"100%", height:"20%"}}>
                                    <thead>
                                        <tr className='productListTable'>
                                            <th>Sr. No</th>
                                            <th>PRODUCT ID</th>
                                            <th>NAME</th>
                                            <th>PRICE</th>
                                            <th>CATEGORY</th>
                                            <th>BRAND</th>
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
                                        <td>
                                            <span className='line'></span>
                                        </td>
                                        <td>
                                            <span className='line'></span>
                                        </td>
                                    </tr>

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
                                                                <button className="editButton" onClick={()=>history.push(`/productedit/${product.productId}`)}>Edit</button>
                                                                <button className="deleteButton" onClick={()=>deleteProduct(product.productId)}>Delete</button>
                                                            </td>
                                                        </tr>
                                                    </>
                                                )
                                            })
                                        }

                                        {
                                            allProductCatg2.length === 0 
                                            ?   <>
                                                    <tr><td colSpan="7"> No Product Found</td></tr>
                                                    <tr> 
                                                        <td colSpan="7" className="productListLoader">
                                                            <h2>Please wait... loading all products for Category 2...</h2>
                                                        </td>
                                                    </tr>
                                                </>
                                            : allProductCatg2.map((product, index) =>{
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
                                                                <button className="editButton" onClick={()=>history.push(`/productedit/${product.productId}`)}>Edit</button>
                                                                <button className="deleteButton" onClick={()=>deleteProduct(product.productId)}>Delete</button>
                                                            </td>
                                                        </tr>
                                                    </>
                                                )
                                            })
                                        }

{
                                            allProductCatg3.length === 0 
                                            ?   <>
                                                    <tr><td colSpan="7"> No Product Found</td></tr>
                                                    <tr> 
                                                        <td colSpan="7" className="productListLoader">
                                                            <h2>Please wait... loading all products for Category 3...</h2>
                                                        </td>
                                                    </tr>
                                                </>
                                            : allProductCatg3.map((product, index) =>{
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
                                                                <button className="editButton" onClick={()=>history.push(`/productedit/${product.productId}`)}>Edit</button>
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
