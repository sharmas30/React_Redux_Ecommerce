import React from 'react'
import '../css/AboutUsScreen.css'
import Typewriter from "typewriter-effect";
import { useState } from 'react/cjs/react.development'

const AboutUsScreen = () => {

    const[state] = useState({
        title: "Hi",
        titleTwo: "wr are ",
        titleThree: "the best Web Developers"
    })

    return (
        <>
            <div className='orderListContent'>
                <div className=" content aboutusHeadImage">
                    <div className='container'>
                        <img src='/images/aboutus_6.jpg' />
                        <div className='textBlock'>
                            <p>
                                <h2 className='mainHeading'>
                                    <b>
                                    <Typewriter
                                        options={{
                                            autoStart: true,
                                            loop: true,
                                            delay: 40,
                                            strings: [
                                                "We develope BEST web applications",
                                                "We support all time serivce & support",
                                                "We build on latest Trend & Technology"
                                            ]
                                        }} />
                                    </b>
                                </h2>
                            </p>
                        </div>
                    </div>
                    <div className='aboutiusText'>
                        <h2>About Us</h2>
                        <h3>
                            Much of today’s business is transacted over the web or over the phone without an in-person meeting. For that reason, your About Us page must do more than communicate what’s special about your company’s products or services; it also must inspire trust because without trust, you’ll never get the prospect to reach for his wallet.
                        </h3>
                        <h3>
                        Customers want to be treated like human beings. For that to happen, they need to feel that they're being served by human beings. When finishing your About page, describe who you are as a person or a team, and what your personal values are
                        </h3>
                    </div>

                    <div className='row '>
                        <div className="col-lg-3 col-12 aboutusImage">
                            
                            
                        </div>

                        <div className="col-lg-9 col-12 dashboard2">
                        </div>
                    </div>
                </div>
            </div>
            
        </>
    )
}

export default AboutUsScreen
