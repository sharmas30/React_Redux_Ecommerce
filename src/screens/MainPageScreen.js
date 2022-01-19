import React from 'react'
import "../css/MainPageScreen.css"
import Typewriter from "typewriter-effect";
import { useHistory } from 'react-router-dom';

const MainPageScreen = () => {

    const history = useHistory();

    return (
        <div>

            {/* CAROUSELSS */}

            <div id="carouselExampleIndicators" className="carousel slide" data-ride="carousel">
                <ol className="carousel-indicators">
                    <li data-target="#carouselExampleIndicators" data-slide-to="0" className="active"></li>
                    <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
                    <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
                </ol>
                <div className="carousel-inner">
                    <div className="carousel-item active">
                        <img className="d-block w-100" src="/images/carousel/slide_1.jpg" alt="First slide" />
                        <div className="carousel-caption d-sd-block d-md-block slide1">
                            <div className='slide_1_div1'>
                                <p className='slide_1_text1'>
                                    <h1 id="p1" className="main-heading">New Collection <span>2022</span></h1>
                                </p>
                            </div>
                            <div className='slide_1_div2'>
                                <p className='slide_1_text2'>
                                <Typewriter
                                    options={{
                                        autoStart: true,
                                        loop: true,
                                        delay: 40,
                                        strings: [
                                            "Sale up to 50% of on all products",
                                            "Sale goes end, please hurry up",
                                        ]
                                    }} 
                                />
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="carousel-item">
                        <img className="d-block w-100" src="/images/carousel/slide_2.jpg" alt="Second slide" />
                        <div className="carousel-caption d-sd-block d-md-block slide2">
                            <p className='slide_2_text1'>
                                <h1 id="p1" className="main-heading">Stylish</h1>
                            </p>
                            <p className='slide_2_text2'>
                                <span>DESIGN</span>
                            </p>
                            <p className='slide_2_text3'>
                                <span>LIKE A <b>GIRL..!</b></span>
                            </p>
                            
                            <div className='slide2_div2'>
                                <span>Get Your Own</span><br />
                            </div>
                            <div className='slide2_div2'>
                                <button>Style Statement</button>
                            </div>
                        </div>
                    </div>
                    <div className="carousel-item">
                        <img className="d-block w-100" src="/images/carousel/slide_4.png" alt="Third slide" />
                        <div className="carousel-caption d-sd-block d-md-block slide3">
                            <p className='slide_3_text1'>
                                <h1 id="p1" className="main-heading">Exclusive Range of</h1>
                            </p>
                            <p className='slide_3_text2'>
                                <span>Women's Cloathe</span>
                            </p>
                        </div>
                    </div>
                </div>
                <a className="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="sr-only">Previous</span>
                </a>
                <a className="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="sr-only">Next</span>
                </a>
            </div>

            {/* PART 1 */}
            <div>
                <div className="container content">
                    <div className='part1Header'>
                        <span>Our Category</span>
                        <hr />
                    </div>
                    
                    <div className='row rowPart1' onClick={
                        ()=>{history.push('/home'); window.scrollTo(0, 0)}                    
                        }>
                        <div className='col-lg-4 col-12 image1 container'>
                            <img src="/images/mainPage_part1/image_6.jpg" />
                            <h2>Designed</h2>
                            <button className='btn'>UPCOMING <span>COLLECTION</span></button>
                        </div>

                        <div className='col-lg-4 col-12 image3 container'>
                            <img src="/images/mainPage_part1/image_4.png" /> 
                            <h2>SHOP <hr /><span>NOW</span></h2>   
                            <button className='btn'>LATEST <span>OUTFITS</span></button>
                        </div>
                        
                        <div className='col-lg-4 col-12 image2 container'>
                            <img src="/images/mainPage_part1/image_5.png" />
                            <h2>50% OFF
                                <hr />
                                <span>NEW</span>
                            </h2>
                            <button className='btn'>WOMEN'S <span>COLLECTION</span></button>
                        </div>
                        
                    </div>
                </div>
            </div>

            <div className='part2Image'>
                <h2>EXCLUSIVE FOR YOU
                    <hr />
                </h2>
                <img src="/images/mainPage_part2/image_4.jpg" /> 
            </div>

            <div>
                <div className="container content" onClick={
                    ()=>{history.push('/home'); window.scrollTo(0, 0)}                    
                    }>                  
                    <div className='row part3div part3row'>
                        <div className='col-lg-4 col-6 part3_image1'>
                            <img src="/images/mainPage_part3/image_4.jpg" /> 
                            <button className='btn'>Party were</button>
                        </div>

                        <div className='col-lg-4 col-6 part3_image1'>
                            <img src="/images/mainPage_part3/image_2.jpg" /> 
                            <button className='btn'>Leather Jacket</button>
                        </div>

                        <div className='col-lg-4 col-6'>
                            <img src="/images/mainPage_part3/image_6.jpg" /> 
                            <button className='btn'>One Peace</button>
                        </div>

                        <div className='col-lg-4 col-6'>
                            <img src="/images/mainPage_part3/image_7.jpg" /> 
                            <button className='btn'>Fancy Gown</button>
                        </div>

                        <div className='col-lg-4 col-6'>
                            <img src="/images/mainPage_part3/image_5.jpg" /> 
                            <button className='btn'>Womens Plazo</button>
                        </div>

                        <div className='col-lg-4 col-6'>
                            <img src="/images/mainPage_part3/image_9.jpg" /> 
                            <button className='btn'>Night Gown</button>
                        </div>
                    </div>
                </div>
            </div>

            <div className='part3Image'>
                <h2>
                    <hr />
                </h2>
                <img src="/images/mainPage_part2/image_11.jpg" /> 
            </div>

            <div>
                <div className="news-letter">
                    <div >
                        <div className="part5row">
                            <h2>About Us
                                <hr/>
                            </h2>
                        </div>
                        <div className="row">
                            <div className="col-lg-4 col-12 order-online_A1">
                                <h1>Sharmas <img src="/images/mainPage_part2/logo.png" alt="" /> Collection</h1>
                                <p>The day for a three hour tour a three hour tour then one day he was shooting at some food and up through the ground came a oil that is its a beautiful day.</p>
                            </div>
                            <div className="col-lg-4 col-12 order-online_A2">
                                <h1>Online <i className="fas fa-truck" style={{fontSize:"35px"}}></i> Order</h1>
                                <p>The day for a three hour tour a three hour tour then one day he was shooting at some food and up through the ground came a oil that is its a beautiful day.</p>
                            </div>
                            <div class="col-lg-4 col-12 order-online_A3">
                                <h1>Services <i className="fas fa-cogs" style={{fontSize:"35px"}}></i></h1>
                                <p>The day for a three hour tour a three hour tour then one day he was shooting at some food and up through the ground came a oil that is its a beautiful day.</p>
                            </div>
                        </div>
                    </div> 
                </div>
            </div>
        </div>
    )
}

export default MainPageScreen
