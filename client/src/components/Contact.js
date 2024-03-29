import React, { Component } from "react"
import { Link } from "react-router-dom"
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faEnvelope,faMapPin,faPhone} from '@fortawesome/free-solid-svg-icons'
// import Map from './images/map.png'
import NavigationBar from "./NavigationBar"

import axios from "axios"
// import DisplayAllCars from "./DisplayAllCars"
// import Contact from "./Contact"

export default class Contact extends Component {
    // constructor(props)
    // {

    //     super(props)
    // }

    render() {
        return (
            <div className="Contactpage">
                
                <NavigationBar />
                <div className="contact">
                    <h1>Contact</h1>
                    <p>Welcome to our T-shirt store! We’re thrilled to assist you. Whether you have questions, feedback, or need help, we’re here for you. Reach out through any of the following channels:</p>
                </div>

                <div className="GetInTouchContainer">
                    <div>
                        <h3>Get In Touch</h3>
                        <p>Got something to share? Fill out our quick and easy contact form. We promise to get back to you promptly.</p>
                                <div className="FontIcon"> 
                                {/* <img src={Map} className="Icon" alt="map-icon"/> */}
                                {/* <FontAwesomeIcon icon={faMapPin} className="Icon"/> */}
                                <p>123 T-Shirt Avenue, Dundalk City, Ireland</p>
                                </div>
                                <div className="FontIcon"> 
                                {/* <FontAwesomeIcon icon={faEnvelope} className="Icon"/> */}
                                <p>info@shirtstore.com</p>
                                </div>
                                <div className="FontIcon"> 
                                
                                {/* <FontAwesomeIcon icon={faPhone} className="Icon"/> */}
                                <p> +353 (555) 123-4567</p>
                             </div>
                    </div>

                    <div className="fromContainer">
                        <form>
                            <h2>Contact Us</h2>
                            <div className="ContainerInForm">
                                <div className="inputContainer">
                                    <input type="text" id="input-fname" placeholder="First Name" />
                                    <input type="text" id="input-lname" placeholder="Last Name" />
                                    <input type="email" id="input-email" placeholder="Email Address" />
                                </div>
                                <div className="TextareaMessage">
                                    <textarea name="message" type="text" id="input-message" placeholder="Some Text...." rows="10" cols="25"></textarea>
                                </div>
                            </div>
                            <input type="Submit" value="Submit" id="input-submit" className="blue-button"></input>
                        </form>
                    </div>
                </div>
                <iframe className="map"
                    width="1400"
                    height="400"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2346.0896366061343!2d-6.397746387676642!3d53.9834322267499!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4860cc13fd48d593%3A0x5d57f3d367d24b6e!2sDundalk%20I.T%20(Main%20Gate)!5e0!3m2!1sen!2sie!4v1707436708839!5m2!1sen!2sie"
                    title="GeeksforGeeks" >
                </iframe>
            </div>
        )
    }

}