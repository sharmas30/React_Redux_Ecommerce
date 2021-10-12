import { useEffect, useState} from 'react';
import { NavLink } from 'react-router-dom';
import '../css/HomeScreen.css';
import { useDispatch, useSelector } from 'react-redux';
import { listProducts, selectedProducts } from '../actions/productActions.js';
import Loader from '../components/Loader';

const HomeScreen = () => {
    const dispatch = useDispatch()
    const productList = useSelector( state => state.productList)
    const {loading, products, error } = productList
    console.log('HHH ', loading);

    useEffect(()=>{
        dispatch(listProducts())
    }, [])

    const sendFunction = (_data) => {
        dispatch(selectedProducts(_data));
    }

    return (
        <>
       { loading ? <Loader /> :
            <div className='cards cardContent'>
                {
                    products.map((product)=>{
                        return(
                            <div className='product' key = {product._id}>
                                <NavLink to={`/product/${product._id}`} onClick={()=>{sendFunction(product)}}>
                                    <img src= {product.image} />                
                                </NavLink>
                        
                                <div className='product_brand'> 
                                    {product.brand}
                                </div>

                                <div className='product_name'>
                                    <NavLink to={`/product/${product._id}`}onClick={()=>{sendFunction(product)}} >
                                    {product.name}
                                    </NavLink>
                                </div>

                                <div className='product_price'>
                                    Rs. {product.price}
                                </div>
                                <div className='product_button'>
                                <NavLink to={`/product/${product._id}`} onClick={()=>{sendFunction(product)}} >
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