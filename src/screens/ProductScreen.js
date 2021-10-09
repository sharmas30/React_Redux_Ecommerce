import React from 'react';
import { useSelector } from 'react-redux';
import { useState } from 'react/cjs/react.development';
import ProductSize from '../components/ProductSize';
import '../css/ProductScreen.css';
import '../css/ProductSize.css';

const ProductScreen = () => {    
    const product = useSelector( state => state.selectedProduct.selectedProducts );
    const [showImg, setImage] = useState(product.image);

    if(!product){
        return <div> Product Not Found </div>
    }
    return (
        <>
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
                    <div className='productSize'>
                        <div className='productSizeTitle'>Select Size</div>
                        <ProductSize />
                    </div>

                    <div className='productAddCartBtn'>
                        <button>Add To Cart</button>
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
