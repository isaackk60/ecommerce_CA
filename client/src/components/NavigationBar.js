import React, { Component } from "react"
import { Link } from "react-router-dom"
import basketpng from "./images/icons8-basket-100.png"
import adminpng from "./images/icons8-admin-48.png"
import { ACCESS_LEVEL_GUEST, ACCESS_LEVEL_ADMIN, SERVER_HOST, ACCESS_LEVEL_NORMAL_USER } from "../config/global_constants"


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
        return (
            <nav id="navigationbar-container">
                <div class="splitL">
                    <div>
                        {window.location.href.includes('/main') ?
                            <div className="dropdown" onMouseOver={this.showSelect} onMouseLeave={this.closeSelect}>
                                <Link to={"/main"} className="dropbtn">CATEGORIES</Link>

                                <div className="dropdown-content" id="select-container">
                                    <Link className="select-gender" to={"/main"} onClick={() => this.handleGenderFilterChange("")}>DEFAULT</Link>
                                    <Link className="select-gender" to={"/main"} onClick={() => this.handleGenderFilterChange("male")}>MALE</Link>
                                    <Link className="select-gender" to={"/main"} onClick={() => this.handleGenderFilterChange("female")}>FEMALE</Link>
                                    <Link className="select-gender" to={"/main"} onClick={() => this.handleGenderFilterChange("unisex")}>UNISEX</Link>
                                </div>
                            </div> : <Link to={"/main"} className="dropbtn">CATEGORIES</Link>}

                    </div>
                    <div>
                        <Link to={"/About"}>ABOUT</Link></div>
                    <div> <Link to={"/Contact"}>CONTACT</Link></div>

                </div>
                <div class="splitC">
                    <Link to={"/main"} className="linktomainpagestorelogo"><h1>T-SHIRT STORE</h1></Link>
                </div>
                <div class="splitR">

                    <div className="navbasket">
                        <Link to={"/ShoppingCart"}><img src={basketpng} /></Link>
                    </div>
                    <div className="navadminorusericon">
                        {/* if statement in an if statement */}
                        {
                            localStorage.accessLevel > ACCESS_LEVEL_NORMAL_USER
                                ? <Link to={"/viewallusers"}>
                                    <img src={adminpng} />
                                </Link>
                                : (localStorage.accessLevel > ACCESS_LEVEL_GUEST)
                                    ? <Link to="/dashboard">
                                        {
                                            localStorage.profilePhoto !== "null"
                                                ? <img id="profilePhoto" src={`data:;base64,${localStorage.profilePhoto}`} alt="" />
                                                : null
                                        }
                                    </Link>
                                    : <Link to={"/Login"}>LOG IN</Link>
                        }
                    </div>
                </div>
            </nav>
        )
    }
}
