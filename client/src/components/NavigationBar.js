import React, { Component } from "react"

import { Link } from "react-router-dom"
import storeLogo from "./images/tshirtstorelogo.jpg"

export default class Down extends Component {
    // constructor(props) 
    // {
    //     super(props)

    //     this.state = {
    //         redirectToDisplayAllCars:false
    //     }
    // }

    render() {
        console.log("down")
        return (
            <nav id="navigationbar-container">
                <div class="splitL">
                    <Link to={"/DisplayAllCars"}>BUY T-SHIRT</Link>
                    <Link to={"/DisplayAllCars"}>MEN</Link>
                    <Link to={"/DisplayAllCars"}>WOMEN</Link>
                    <Link to={"/DisplayAllCars"}>ABOUT</Link>
                    <Link to={"/DisplayAllCars"}>CONTACT</Link>


                </div>
                <div class="splitC">
                    {/* <Link to={"/DisplayAllCars"} img src={require('./.public/tshirtstorelogo.jpg')}>test</Link> */}
                    {/* <Link to={"/DisplayAllCars"} img src="../tshirtstorelogo.jpg"></Link> */}
                    <img id="logo" src={storeLogo}/>
                    {/* <Link to={"/DisplayAllCars"}>test</Link> */}
                </div>
                <div class="splitR">
                    <Link to={"/DisplayAllCars"}>SEARCH HERE</Link>
                    <Link to={"/DisplayAllCars"}>BASKET HERE</Link>
                    <Link to={"/DisplayAllCars"}>LOG IN</Link>
                </div>
            </nav>
        )
    }
}
