import React, {Component} from "react"
import {Link} from "react-router-dom"

import axios from "axios"
import NavigationBar from "./NavigationBar"
import ShirtBlock from "./ShirtBlock"
import Logout from "./Logout"

import {ACCESS_LEVEL_GUEST, ACCESS_LEVEL_ADMIN, SERVER_HOST} from "../config/global_constants"


export default class Main extends Component 
{
    constructor(props) 
    {
        super(props)
        
        this.state = {
            shirts:[],
            searchQuery:""
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
        console.log(this.state.shirts)
    }

    handleSearchInputChange = (event) => {
        this.setState({ searchQuery: event.target.value });
    };

  
    render() 
    {   
        const { shirts, searchQuery } = this.state;
        const filteredShirts = shirts.filter(shirt =>
            shirt.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
        return (           
            <div>
                <NavigationBar />
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
                    <input
                        type="text"
                        placeholder="Search shirts..."
                        value={searchQuery}
                        onChange={this.handleSearchInputChange}
                    />
                </div>
                
                <div className="main-container">
                
                    {/* {this.state.shirts.map((shirt)=><ShirtBlock key={shirt._id} shirt={shirt} />)}  */}
                    {filteredShirts.map((shirt) => <ShirtBlock key={shirt._id} shirt={shirt} />)}
                    
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
