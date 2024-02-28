import React, { Component } from "react"

import { Link } from "react-router-dom"
import storeLogo from "./images/tshirtstorelogo.jpg"
import { ACCESS_LEVEL_GUEST, ACCESS_LEVEL_ADMIN, SERVER_HOST } from "../config/global_constants"
import Logout from "./Logout"
import ShoppingCart from "./ShoppingCart"
export default class Down extends Component {
    constructor(props) {
        super(props);
        this.handleGenderFilterChange = this.handleGenderFilterChange.bind(this);
    }

    handleGenderFilterChange(value) {
        this.props.handleGenderFilterChange(value);
    }
    showSelect = () => {
        var selectContainer = document.getElementById("select-container");
        selectContainer.style.display = "block";
    }
    closeSelect = () => {
        var selectContainer = document.getElementById("select-container");
        selectContainer.style.display = "none";
    }


    render() {
        return (
            <nav id="navigationbar-container">
                <div class="splitL">
                    <div>
                    <Link to={"/main"} >BUY T-SHIRT</Link></div>
                    <div>
                    <div className="dropdown" onMouseOver={this.showSelect} onMouseLeave={this.closeSelect}> {/* onMouseLeave={this.closeSelect} */}
                        <Link to={"/main"} className="dropbtn">CATEGORIES</Link>
                        {/* <div id="select-container"> */}
                            {/* <select value={this.props.genderFilter} onChange={this.props.handleGenderFilterChange}>
                                <option value="">All Genders</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="unisex">Unisex</option>
                            </select> */}
                            <div className="dropdown-content" id="select-container">
                            <Link className="select-gender" to={"/main"} onClick={() => this.handleGenderFilterChange("")}>ALL GENDERS</Link>
                            <Link className="select-gender" to={"/main"} onClick={() => this.handleGenderFilterChange("male")}>MALE</Link>
                            <Link className="select-gender" to={"/main"} onClick={() => this.handleGenderFilterChange("female")}>FEMALE</Link>
                            <Link className="select-gender" to={"/main"} onClick={() => this.handleGenderFilterChange("unisex")}>UNISEX</Link>
                            </div>
                        {/* </div> */}
                    </div>
                    </div>
                    <div>
                    <Link to={"/About"}>ABOUT</Link></div>
                    <div> <Link to={"/Contact"}>CONTACT</Link></div>

                </div>
                <div class="splitC">
                    {/* <Link to={"/DisplayAllCars"} img src={require('./.public/tshirtstorelogo.jpg')}>test</Link> */}
                    {/* <Link to={"/DisplayAllCars"} img src="../tshirtstorelogo.jpg"></Link> */}
                    {/* <img id="logo" src={storeLogo} /> */}
                    <h1>T-SHIRT STORE</h1>
                    {/* <Link to={"/DisplayAllCars"}>test</Link> */}
                </div>
                <div class="splitR">
                    <Link to={"/main"}>SEARCH HERE</Link>
                    <Link to={"/ShoppingCart"}>SHOPPING CART</Link>
                    {/* <Link to={"/Login"}>LOG IN</Link> */}
                    {
                        localStorage.accessLevel > ACCESS_LEVEL_GUEST
                            ? <Link to="/main">
                                {
                                    localStorage.profilePhoto !== "null"
                                        ? <img id="profilePhoto" src={`data:;base64,${localStorage.profilePhoto}`} alt="" />
                                        : null
                                }
                                <Logout />
                            </Link>
                            : <Link to={"/Login"}>LOG IN</Link>
                    }
                </div>
            </nav>
        )
    }
}
