import React, { Component } from "react"
import { Link } from "react-router-dom"
import axios from "axios"
import NavigationBar from "./NavigationBar"
import ShirtBlock from "./ShirtBlock"
import { ACCESS_LEVEL_GUEST, ACCESS_LEVEL_ADMIN, SERVER_HOST } from "../config/global_constants"


export default class Main extends Component {
    constructor(props) {
        super(props)

        this.state = {
            shirts: [],
            searchQuery: "",
            sortType: "default",
            genderFilter: "",
        }
    }


    componentDidMount() {
        axios.get(`${SERVER_HOST}/shirts`)
            .then(res => {
                this.setState({ shirts: res.data })
            })
            .catch(err => {
                // do nothing
            })

    }

    handleSearchInputChange = (event) => {
        this.setState({ searchQuery: event.target.value });
    };

    handleSortChange = event => {
        this.setState({ sortType: event.target.value });
    };

    handleGenderFilterChange = (value) => {
        this.setState({ genderFilter: value });
    };

    render() {
        const { shirts, searchQuery, sortType, genderFilter } = this.state;
        let filteredShirtsName = shirts.filter(shirt =>
            shirt.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
        if (sortType === "PriceHighToLow") {
            filteredShirtsName.sort((a, b) => b.price - a.price);
        } else if (sortType === "PriceLowToHigh") {
            filteredShirtsName.sort((a, b) => a.price - b.price);
        }


        if (genderFilter === "default") {
            filteredShirtsName = filteredShirtsName.filter(shirt => shirt.gender === "default");
        } else if (genderFilter === "male") {
            filteredShirtsName = filteredShirtsName.filter(shirt => shirt.gender === "male");
        } else if (genderFilter === "female") {
            filteredShirtsName = filteredShirtsName.filter(shirt => shirt.gender === "female");
        } else if (genderFilter === "unisex") {
            filteredShirtsName = filteredShirtsName.filter(shirt => shirt.gender === "unisex");
        }
        return (
            <div>
                <NavigationBar genderFilter={genderFilter} handleGenderFilterChange={this.handleGenderFilterChange.bind(this)} handleSearchInputChange={this.handleSearchInputChange} />
                <div className="wholeMain">
                    <div className="sortandsearch">
                        <div className="sort-container">
                            <select value={sortType} onChange={this.handleSortChange}>
                                <option value="default">Default Sorting</option>
                                <option value="PriceHighToLow">Price: High to Low</option>
                                <option value="PriceLowToHigh">Price: Low to High</option>
                            </select>
                        </div>
                        <div className="navsearchbar">
                            <input type="text" placeholder="Search shirts..." onChange={this.handleSearchInputChange} />
                        </div>
                    </div>



                    <div className="main-container">
                        {filteredShirtsName.map((shirt) => <ShirtBlock key={shirt._id} shirt={shirt} gender={shirt.gender} />)}

                    </div>
                    {
                        localStorage.accessLevel >= ACCESS_LEVEL_ADMIN
                            ? <div className="add-new-shirt">
                                <Link className="mainaddbutton" to={"/AddTShirt"}>Add New T-Shirt</Link>
                            </div>
                            : null
                    }

                </div>
            </div>

        )
    }
}
