import React from 'react';
import { useState } from 'react/cjs/react.development';
import ReactJsAlert from "reactjs-alert"; 
import ProductSize from '../components/ProductSize';
import '../css/ProductScreen.css';
import '../css/ProductSize.css';
import { getCartItems, getProductScreenItem, setCartItems } from '../localStorage';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useHistory } from 'react-router';
import { useEffect } from 'react';
import { useRef } from 'react';
import Zoom from 'react-img-zoom';
import Loader from '../components/Loader';
import LoaderProductScreen from '../components/LoaderProductScreen';

var selectedImage = null;

const ProductScreen = () => {    
    const product = getProductScreenItem();
    const history = useHistory();
    const [showImg, setImage] = useState(product.Productimage);
    const [size, setSize] = useState('')
    const [imageState1, setImageState1] = useState(false)
    const [imageState2, setImageState2] = useState(false)
    const [imageState3, setImageState3] = useState(false)

    const [imageView1, setImageView1] = useState(product.ProductSampleImage[0])
    const [imageView2, setImageView2] = useState(product.ProductSampleImage[1])
    const [imageView3, setImageView3] = useState(product.ProductSampleImage[2])

    const [parentImage, setParentImage] = useState(showImg)

    const [loadingState, setLoadingState] = useState(true);

    const [alertState, setAlertState] = useState({
        type: 'warning',
        status: false,
        title: "Please Select Size",
        quote: "Something went wrong. Please try again!",
        })

    const func1 = () => {
        setImageView1(parentImage)
        setImage(imageView1);
    }
    const func2 = () => {
        setImageView2(parentImage)
        setImage(imageView2);
    }
    const func3 = () => {
        setImageView3(parentImage)
        setImage(imageView3);
    }

    useEffect(() => {
        setParentImage(showImg)
    },[showImg]);

    setTimeout(() => {
        setLoadingState(false);
    }, 1500);

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
            })
            return
        }
        else{
            let cartItems = getCartItems()

            const existItem = cartItems.find((x) => x.productId === item.productId );

            if(existItem){
                setAlertState({
                    type: 'warning',
                    status: true,
                    title: "Item Already In Cart",
                })
                return;
            }
            else{
                cartItems = [...cartItems, item]
                console.log('HH__', cartItems);
                toast.success("Product Add to Cart Successfully...!",
                {position: toast.POSITION.TOP_CENTER});
            }
            setCartItems(cartItems);
            history.push('/cart');
            return;
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
                {/* <Zoom
                    img={ showImg }
                    zoomScale={2}
                    width={400}
                    height={500}
                    transitionTime={0.5}
                /> */}
                    <img src= { showImg }  /> 
                </div>

            
                <div className='productImageSample'>
                    <div>
                        <img src= { imageView1 } onClick={func1} />                         
                    </div>
                    {
                        loadingState ? <LoaderProductScreen />: ''
                    }
                    <div>
                        <img src= { imageView2 } onClick={func2} />                         
                    </div>
                    <div>
                        <img src= { imageView3 } onClick={func3} />                     
                    </div>
                </div>

                <div className='productCalculation'>
                    <div className='productName'>
                        <span>{product.productName}</span>
                    </div>
                   
                    <div className='productBrand'>
                      <span>{product.productBrand}</span>
                    </div>
                   
                    <div className='productPrice'>
                       <span>Rs. {product.productPrice}</span>
                    </div>
                   
                    <div className='productStock'>
                       <span>Stock : {`${product.ProductCount}` > 0 ? <span className='productInStock'> In Stock</span> : <span className='productOutStock'>Out Of Stock </span>} </span>
                    </div>
                   
                    <div className='productSize'>
                        <div className='productSizeTitle'>Select Size</div>
                        <ProductSize sizeFun={selectSize}/>
                    </div>

                    <div className='productAddCartBtn'>
                        {`${product.ProductCount}`> 0 ? <button onClick={()=>addToCart({...product, size, qty: 1})}>Add To Cart</button> : ''}
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
