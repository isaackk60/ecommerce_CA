import React, { Component } from "react"

import { Link } from "react-router-dom"
import storeLogo from "./images/tshirtstorelogo.jpg"
import {ACCESS_LEVEL_GUEST, ACCESS_LEVEL_ADMIN, SERVER_HOST} from "../config/global_constants"
import Logout from "./Logout"
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
                    <Link to={"/main"}>BUY T-SHIRT</Link>
                    <Link to={"/DisplayAllCars"}>MEN</Link>
                    <Link to={"/DisplayAllCars"}>WOMEN</Link>

                    <Link to={"/About"}>ABOUT</Link>
                    <Link to={"/Contact"}>CONTACT</Link>




                </div>
                <div class="splitC">
                    {/* <Link to={"/DisplayAllCars"} img src={require('./.public/tshirtstorelogo.jpg')}>test</Link> */}
                    {/* <Link to={"/DisplayAllCars"} img src="../tshirtstorelogo.jpg"></Link> */}
                    <img id="logo" src={storeLogo}/>
                    {/* <Link to={"/DisplayAllCars"}>test</Link> */}
                </div>
                <div class="splitR">
                    <Link to={"/DisplayAllCars"}>SEARCH HERE</Link>
                    <Link to={"/ShoppingCart"}>BASKET HERE</Link>
                    {/* <Link to={"/Login"}>LOG IN</Link> */}
                    {
                    localStorage.accessLevel > ACCESS_LEVEL_GUEST 
                    ? <Link to="/main">
                        {
                            localStorage.profilePhoto !== "null" 
                            ? <img id="profilePhoto" src={`data:;base64,${localStorage.profilePhoto}`} alt=""/>
                            : null
                        }                        
                        <Logout/>
                      </Link>
                    : <Link to={"/Login"}>LOG IN</Link>
                }
                </div>
            </nav>
        )
    }
}
