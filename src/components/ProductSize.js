import React from 'react'
import '../css/ProductSize.css';

const ProductSize = () => {
    const size = ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XL']
    return (
        <div className='productSizeOption'>
            {
                size.map((item, i)=>{
                    return(
                        <>
                            <div className='testSize' key={i}><span>{item}</span></div>                    
                        </>
                    )
                })
            }
        </div>
    )
}

export default ProductSize
