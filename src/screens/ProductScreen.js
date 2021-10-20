import React from 'react';
import { useState } from 'react/cjs/react.development';
import ReactJsAlert from "reactjs-alert"; 
import ProductSize from '../components/ProductSize';
import '../css/ProductScreen.css';
import '../css/ProductSize.css';
import { getCartItems, getProductScreenItem, setCartItems } from '../localStorage';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ProductScreen = () => {    
    const product = getProductScreenItem();
    const [showImg, setImage] = useState(product.image);
    const [size, setSize] = useState('')
    // const [showAlert, setShowAlert] = useState(false);
    const [alertState, setAlertState] = useState({
        type: 'warning',
        status: false,
        title: "Please Select Size",
        quote: "Something went wrong. Please try again!",
        })

    console.log('SIZE', size);
    if(!product){
        return <div> Product Not Found </div>
    }

    const selectSize = (data) => {
        setSize(data);
    }

    const addToCart = (item) => {
        if(!size) {            
            setAlertState({
                type: 'warning',
                status: true,
                title: "Please Select Size",
                quote: "Something went wrong. Please try again!",
            })
            return
        }
        else{
            let cartItems = getCartItems()

            const existItem = cartItems.find((x) => x._id === item._id );

            if(existItem){

            }
            else{
                cartItems = [...cartItems, item]
                console.log('HH__', cartItems);
                toast.success("Product Add to Cart Successfully...!",
                {position: toast.POSITION.TOP_CENTER});
            }
            setCartItems(cartItems);
        }
    }

    return (
        <> 
         <ReactJsAlert
            status={alertState.status} // true or false
            type={alertState.type} // success, warning, error, info
            title={alertState.title}
            Close={() => setAlertState({ status: false })}
            />    
            <ToastContainer />      
            <div className="productCard">
                <div className='productImage'>
                    <img src= {showImg} /> 
                </div>

                <div className='productImageSample'>
                    <div>
                        <img src= {product.image} onClick={()=>setImage(product.image)}/> 
                    </div>
                    <div>
                        <img src= {product.image} onClick={()=>setImage(product.image)} />                         
                    </div>
                    <div>
                        <img src= {product.image} onClick={()=>setImage(product.image)} />                     
                    </div>
                </div>

                <div className='productCalculation'>
                    <div className='productName'>
                        <span>{product.name}</span>
                    </div>
                   
                    <div className='productBrand'>
                      <span>{product.brand}</span>
                    </div>
                   
                    <div className='productPrice'>
                       <span>Rs. {product.price}</span>
                    </div>
                   
                    <div className='productStock'>
                       <span>Stock: {`${product.countInStock}` > 0 ? <span className='productInStock'> In Stock</span> : <span className='productOutStock'>Out Of Stock </span>} </span>
                    </div>
                   
                    <div className='productSize'>
                        <div className='productSizeTitle'>Select Size</div>
                        <ProductSize sizeFun={selectSize}/>
                    </div>

                    <div className='productAddCartBtn'>
                        {`${product.countInStock}`> 0 ? <button onClick={()=>addToCart({...product, size})}>Add To Cart</button> : ''}
                    </div>
                </div>
            </div>

            <div className='productDescription'>
                <div className='descriptionLeft'>
                    <p>PRODUCT DESCRIPTION</p>
                    <div className='descriptionDetailsLeft'>
                        Flex your true color with this Killer Brown Women's Boyfriend T-Shirt. Team this t-shirt with high-waist jeans, sneakers and a waist pouch for a chic look.
                        Country of Origin: India
                    </div>
                </div>

                <div className='descriptionRight'>
                    <span class="vl"></span>

                    <p>PRODUCT DESCRIPTION</p>
                    <div className='descriptionDetailsRight'>
                        Flex your true color with this Killer Brown Women's Boyfriend T-Shirt. Team this t-shirt with high-waist jeans, sneakers and a waist pouch for a chic look.
                        Country of Origin: India
                    </div>
                </div>
            </div>
        </>
    )
}

export default ProductScreen
