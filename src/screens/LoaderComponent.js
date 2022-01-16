import React from 'react'
import "../css/LoaderComponent.css";

const LoaderComponent = (props) => {
    return (
        <div className='sampleLoader'>
            <div class="holder">
                <div class="preloader"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
            </div>
        </div>
    )
}

export default LoaderComponent
