import React, {Component} from "react"
import {BrowserRouter, Switch, Route} from "react-router-dom"

import "bootstrap/dist/css/bootstrap.css"
import "./css/App.css"
import "./scss/style.css"

import Register from "./components/Register"
import ResetDatabase from "./components/ResetDatabase"
import Login from "./components/Login"
import Logout from "./components/Logout"
import AddCar from "./components/AddCar"
import EditCar from "./components/EditCar"
import DeleteCar from "./components/DeleteCar"
import DisplayAllCars from "./components/DisplayAllCars"
import LoggedInRoute from "./components/LoggedInRoute"
// import BuyCar from "./components/BuyCar"
import BuyShirt from "./components/BuyShirt"
import PayPalMessage from "./components/PayPalMessage"

import Contact from "./components/Contact"
import ShoppingCart from "./components/ShoppingCart"

import AddTShirt from "./components/AddTShirt"
import Main from "./components/Main"
import EditTShirt from "./components/EditTShirt"
import DeleteTShirt from "./components/DeleteTShirt"
import SubShirt from "./components/SubShirt"
import About from "./components/About"
import NavigationBar from "./components/NavigationBar"

import {ACCESS_LEVEL_GUEST} from "./config/global_constants"


if (typeof localStorage.accessLevel === "undefined")
{
    localStorage.name = "GUEST"
    localStorage.accessLevel = ACCESS_LEVEL_GUEST
    localStorage.token = null
    localStorage.profilePhoto = null
}

    
export default class App extends Component 
{
    render() 
    {
        return (
            <BrowserRouter>
                <Switch>
                    <Route exact path="/Register" component={Register} />
                    <Route exact path="/ResetDatabase" component={ResetDatabase} />                    
                    <Route exact path="/" component={DisplayAllCars} />
                    <Route exact path="/Login" component={Login} />
                    {/* <Route exact path="/BuyCar/:id" component={BuyCar} /> */}
                    <Route exact path="/BuyShirt/:id" component={BuyShirt} />
                    <Route exact path="/PayPalMessage/:messageType/:payPalPaymentID" component={PayPalMessage}/>
                    <Route exact path="/Contact" component={Contact} />  
                    <Route exact path="/ShoppingCart" component={ShoppingCart} />                      
                    <LoggedInRoute exact path="/Logout" component={Logout} />
                    <LoggedInRoute exact path="/AddCar" component={AddCar} />
                    <LoggedInRoute exact path="/EditCar/:id" component={EditCar} />
                    <LoggedInRoute exact path="/DeleteCar/:id" component={DeleteCar} />
                    <Route exact path="/DisplayAllCars" component={DisplayAllCars}/> 
                    <Route exact path="/AddTShirt" component={AddTShirt}/> 
                    <LoggedInRoute exact path="/EditTShirt/:id" component={EditTShirt} />
                    <LoggedInRoute exact path="/DeleteTShirt/:id" component={DeleteTShirt} />
                    <LoggedInRoute exact path="/SubShirt/:id" component={SubShirt} />
                    <Route exact path="/main" component={Main}/>
                    <Route exact path="/About" component={About}/>
                    <Route exact path="/NavigationBar" component={NavigationBar}/>
                    <Route path="*" component={DisplayAllCars}/>                            
                </Switch>
            </BrowserRouter>
        )
    }
}