import React, {Component} from "react"
import {Link} from "react-router-dom"

import axios from "axios"
import NavigationBar from "./NavigationBar"
import ShirtBlock from "./ShirtBlock"

import {ACCESS_LEVEL_GUEST, ACCESS_LEVEL_ADMIN, SERVER_HOST} from "../config/global_constants"


export default class Main extends Component 
{
    constructor(props) 
    {
        super(props)
        
        this.state = {
            shirts:[],
            searchQuery:"",
            sortType: "default",
            genderFilter: "",
        }
    }
    
    
    componentDidMount() 
    {
        axios.get(`${SERVER_HOST}/shirts`)
        .then(res => 
        { 
            this.setState({shirts: res.data})                                         
        })
        .catch(err =>
        {
            // do nothing
        })

    }

    handleSearchInputChange = (event) => {
        this.setState({ searchQuery: event.target.value });
    };

    handleSortChange = event => {
        this.setState({ sortType: event.target.value });
    };

    handleGenderFilterChange = (event) => {
        this.setState({ genderFilter: event.target.value });
    };
  
    render() 
    {   
        const { shirts, searchQuery,sortType,genderFilter } = this.state;
        let filteredShirtsName = shirts.filter(shirt =>
            shirt.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
        if (sortType === "PriceHighToLow") {
            filteredShirtsName.sort((a, b) => b.price - a.price);
        } else if (sortType === "PriceLowToHigh") {
            filteredShirtsName.sort((a, b) => a.price - b.price);
        }


        if (genderFilter === "male") {
            filteredShirtsName = filteredShirtsName.filter(shirt => shirt.gender === "male");
        } else if (genderFilter === "female") {
            filteredShirtsName = filteredShirtsName.filter(shirt => shirt.gender === "female");
        } else if (genderFilter === "unisex") {
            filteredShirtsName = filteredShirtsName.filter(shirt => shirt.gender === "unisex");
        }
            return (           
            <div>
                <NavigationBar genderFilter={genderFilter}  handleGenderFilterChange={this.handleGenderFilterChange.bind(this)}/>
                {
                    
                    // localStorage.accessLevel > ACCESS_LEVEL_GUEST 
                    // ? <div className="logout">
                    //     {
                    //         localStorage.profilePhoto !== "null" 
                    //         ? <img id="profilePhoto" src={`data:;base64,${localStorage.profilePhoto}`} alt=""/>
                    //         : null
                    //     }                        
                    //     <Logout/>
                    //   </div>
                    // : <div>
                    //     <Link className="green-button" to={"/Login"}>Login</Link>
                    //     <Link className="blue-button" to={"/Register"}>Register</Link>  
                    //     <Link className="red-button" to={"/ResetDatabase"}>Reset Database</Link>  <br/><br/><br/></div>
                }

                <div className="search-container">
                    <input type="text"  placeholder="Search shirts..." value={searchQuery} onChange={this.handleSearchInputChange} />
                </div>


                <div className="sort-container">
                    <select value={sortType} onChange={this.handleSortChange}>
                        <option value="default">Default Sorting</option>
                        <option value="PriceHighToLow">Price: High to Low</option>
                        <option value="PriceLowToHigh">Price: Low to High</option>
                    </select>
                    {/* <select value={genderFilter} onChange={this.handleGenderFilterChange}>
                        <option value="">All Genders</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="unisex">Unisex</option>
                    </select> */}
                </div>

                
                
                <div className="main-container">
                
                    {/* {this.state.shirts.map((shirt)=><ShirtBlock key={shirt._id} shirt={shirt} />)}  */}
                    {filteredShirtsName.map((shirt) => <ShirtBlock key={shirt._id} shirt={shirt} gender={shirt.gender}/>)}
                    
                </div>
                {
                        localStorage.accessLevel >= ACCESS_LEVEL_ADMIN 
                        ? <div className="add-new-car">
                            <Link className="blue-button" to={"/AddCar"}>Add New Car</Link>
                            <Link className="green-button" to={"/AddTShirt"}>Add New T-Shirt</Link>
                          </div>
                        : null
                    }
                    
            </div> 
            
        )
    }
}
