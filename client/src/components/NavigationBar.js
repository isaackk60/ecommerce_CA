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

    handleSearchInputChange = (event) => { 
        this.props.handleSearchInputChange(event) 
    }


    render() {
        console.log("down")
        return (
            <nav id="navigationbar-container">
                <div class="splitL">
                    <div>
                    <Link to={"/main"} >BUY T-SHIRT</Link></div>
                    <div>
                    <div className="dropdown" onMouseOver={this.showSelect} onMouseLeave={this.closeSelect}> {/* onMouseLeave={this.closeSelect} */}
                        <Link to={"/main"} className="dropbtn">All Genders</Link>
                        {/* <div id="select-container"> */}
                            {/* <select value={this.props.genderFilter} onChange={this.props.handleGenderFilterChange}>
                                <option value="">All Genders</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="unisex">Unisex</option>
                            </select> */}
                            <div className="dropdown-content" id="select-container">
                            <Link className="select-gender" to={"/main"} onClick={() => this.handleGenderFilterChange("")}>All Genders</Link>
                            <Link className="select-gender" to={"/main"} onClick={() => this.handleGenderFilterChange("male")}>Male</Link>
                            <Link className="select-gender" to={"/main"} onClick={() => this.handleGenderFilterChange("female")}>Female</Link>
                            <Link className="select-gender" to={"/main"} onClick={() => this.handleGenderFilterChange("unisex")}>Unisex</Link>
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
                    <img id="logo" src={storeLogo} />
                    {/* <Link to={"/DisplayAllCars"}>test</Link> */}
                </div>
                <div class="splitR">
                    {/* <Link to={"/main"}>SEARCH HERE</Link> */}
                    <input type="text" placeholder="Search shirts..." onChange={this.handleSearchInputChange}
                    />
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
