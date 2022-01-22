import { useEffect, useState} from 'react';
import { NavLink } from 'react-router-dom';
import '../css/HomeScreen.css';
import { useDispatch, useSelector } from 'react-redux';
import { listProducts, selectedProducts } from '../actions/productActions.js';
import fire from '../config/fire';
import { getDatabase, ref, set, onValue, update } from "firebase/database";
import {ref as sRef, getStorage, uploadBytesResumable, getDownloadURL} from "firebase/storage";
import Loader from '../components/Loader';
import { setCartItems, setProductScreenItem } from '../localStorage';
import LoaderHomeScreen from '../components/LoaderHomeScreen';

const HomeScreen = () => {
    const dispatch = useDispatch()
    const productList = useSelector( state => state.productList)
    const {loading, products, error } = productList

    const [allProductData, setAllProductData] = useState([])

    const [loadindState, setLoadindState] = useState(true)

    useEffect(()=>{
        dispatch(listProducts())

        const db = getDatabase();
        var userRef = ref(db, `allProducts`);
        onValue(userRef, (snapshot) => {
            var data = snapshot.val();
            const allProducts = Object.values(data);
            setAllProductData(allProducts);
            console.log("DDDDDDD_____", allProducts);
            setLoadindState(false);                
        })
    }, [])

    const sendFunction = (_data) => {
        setProductScreenItem(_data);
    }

    return (
        <>
       { loadindState ? <LoaderHomeScreen /> :
            <div className='cards cardContent'>
                {
                    allProductData.map((product)=>{
                        return(
                            <div className='product' key = {product.productId}>
                                <NavLink to={`/product/${product.productId}`} onClick={()=>{sendFunction(product); window.scrollTo(0, 0)}}>
                                    <img src= {product.Productimage} />                
                                </NavLink>
                        
                                <div className='product_brand'> 
                                    {product.productBrand}
                                </div>

                                <div className='product_name'>
                                    <NavLink to={`/product/${product.productId}`}onClick={()=>{sendFunction(product); window.scrollTo(0, 0)}} >
                                    {product.productName}
                                    </NavLink>
                                </div>

                                <div className='product_price'>
                                    Rs. {product.productPrice}
                                </div>
                                <div className='product_button'>
                                    <NavLink to={`/product/${product.productId}`} onClick={()=>{sendFunction(product); window.scrollTo(0, 0)}} >
                                        <button>View Product</button>                            
                                    </NavLink>
                                </div>
                            </div>
                        )
                    })
                }
            </div> 
        }
        </>
    )
}

export default HomeScreen