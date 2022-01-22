import React from 'react'
import '../css/ContactScreen.css'

const ContactScreen = () => {

    return (
        <> 
            <div className="container cnt-heading text-center contactHeading">
                <h2 className="text-cent font-weight-bold">CONTACT US</h2>
            </div>
            <div className="col-lg-8 col-md-8 col-10 offset-lg-2 offset-md-2 offset-1">
                <form >
                    <div className="form-group">
                        <input type="text" className="form-control" placeholder="Enter Name" id="username" required="required" />
                    </div>

                    <div className="form-group">
                        <input type="email" className="form-control" placeholder="Enter email" id="email" required="required" />
                    </div>

                    <div className="form-group">
                        <input type="tel" className="form-control" placeholder="Enter Mobile No" id="mobile" pattern="[7890][0-9]{9}" required="required" />
                    </div>

                    <div className="form-group">
                        <textarea type="text" className="form-control" rows="2" id="message" placeholder="Enter Your Message" required="required" style={{height:"70px"}} ></textarea>
                    </div>
                    <div className="d-flex justify-content-center form-button">
                        <button type="submit" id="email-btn" className="btn ">Submit</button>
                    </div>
                </form>
            </div>
            <div className="footer">
                <div className="col-lg-4 col-md-4 col-12 ">
                    <div className="text-center footer-bg">
                        <i className="fa fa-map-marker-alt" style={{fontSize:"25px",color:"white"}}></i><br />
                        <div className="footer-div">
                            <p>Address</p>
                            <p>Laxmi Nagar, Chandmari</p>
                            <span>Khamgaon, 444 303 </span>
                        </div>
                        <hr className="visible-xs" style={{border: "1px solid gray", width: "180px"}} />
                    </div>
                </div>

                <div className="col-lg-4 col-md-4 col-12 ">
                    <div className="text-center footer-bg">
                        <i className="fa fa-envelope footer-icon" style={{fontSize:"25px", color:"white",fontWeight:"250"}}></i><br />
                        <div className="footer-div">
                            <p className="contact-txt">General Enquiries</p>
                            <span>shubhsharmass24@gmail.com</span>
                        </div>
                        <hr className="visible-xs text-center" style={{border: "1px solid gray", width: "180px"}} />
                    </div>
                </div>

                <div className="col-lg-4 col-md-4 col-12">
                    <div className="text-center footer-bg">
                        <i className="fa fa-phone" style={{fontSize:"25px", color:"white"}}></i><br />
                        <div className="footer-div">
                            <p>Call Us</p>
                            <p>+91-8983222814</p>
                            <span>+91-8983222814</span><br />
                        </div>
                        <hr className="visible-xs" style={{border: "1px solid gray", width: "180px"}} />
                    </div>
                </div>

                <div className="col-lg-12 col-md-12 col-12">
                    <div className="text-center footer-bg">
                        <i className="fa fa-clock-o" style={{fontSize:"25px", color:"white"}}></i><br />
                        <div className="footer-div">
                            <p>Hours : </p>
                            <p> Mon-Fri : 11.00am - 7.00pm</p>
                            <p> Sat : 11.00am - 2.00pm</p>
                            <span>Sunday Closed</span>
                        </div>
                        <hr className="visible-xs" style={{border: "1px solid gray", width: "180px"}} />
                    </div>
                </div>
            </div>
            <br />

            <div className="container">
            <div className="row">
                <div className="col-lg-12 col-md-12 col-12 text-center googleMaponContact">
                    <h4>LOCATION</h4>
                    <div className="d-flex justify-content-center map-responsive">
                        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3732.1254967038744!2d76.57432921440201!3d20.705127904124655!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bd7511e1466c069%3A0xf7acb51cde2c9208!2sChintamani%20Ganpati%20mandir!5e0!3m2!1sen!2sus!4v1596281062157!5m2!1sen!2sus"
                            style={{border:"2px solid white allowfullscreen"}}>
                        </iframe>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}

export default ContactScreen
