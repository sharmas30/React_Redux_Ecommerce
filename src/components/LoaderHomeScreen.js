import React from 'react';
import '../css/LoaderHomeScreen.css'

const LoaderHomeScreen = () => {
  return (
  <div className='mainContent'>
    <div id="preloader">
       <div id="loader"></div>
    </div>
    <div className='homeLoadingText'>
        <h2>Loading...</h2>
    </div>
  </div>)
};

export default LoaderHomeScreen;
