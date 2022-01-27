import React, { useState } from 'react'
import '../css/ProductSize.css';

const ProductSize = (props) => {
    debugger
    const [color, setColor] = useState('');
    const size = ['S', 'M', 'L', 'XL', 'XXL', 'XXL']
    // console.log('COLOR ', color);

    const selectSize_ = (size_, id) => {
        props.sizeFun(size_);
        setColor(id);
    }

    return (
        <>
            <div className='productSizeOption'>
                {
                    size.map((item, i)=>{
                        return(
                            <>
                                <li key={i} className={'testSize ' + (color == (i+1) ? 'activeSize' : '')}  onClick={()=>selectSize_(item, i+1)} ><span>{item}</span></li>                    
                            </>
                        )
                    })
                }
            </div>
        </>
    )
}

export default ProductSize
