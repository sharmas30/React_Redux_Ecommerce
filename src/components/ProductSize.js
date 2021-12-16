import React, { useState } from 'react'
import '../css/ProductSize.css';

const ProductSize = (props) => {
    const size = ['S', 'M', 'L', 'XL', 'XXL', 'XXL']
    const [color, setColor] = useState('');
    console.log('COLOR ', color);

    const selectSize = (size, id) => {
        props.sizeFun(size);
        setColor(id);
    }

    return (
        <div className='productSizeOption'>
            {
                size.map((item, i)=>{
                    return(
                        <>
                            <div className={'testSize ' + (color == (i+1) ? 'activeSize' : '')} key={i+1}  onClick={()=>selectSize(item, i+1)} ><span>{item}</span></div>                    
                        </>
                    )
                })
            }
        </div>
    )
}

export default ProductSize
