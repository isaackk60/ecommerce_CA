// import React, {Component} from "react"
// import {Redirect, Link} from "react-router-dom"
// import axios from "axios"
// import NavigationBar from "./NavigationBar"

// import LinkInClass from "../components/LinkInClass"

// import {SERVER_HOST} from "../config/global_constants"


// export default class Register extends Component
// {
//     constructor(props)
//     {
//         super(props)
        
//         this.state = {
//             name:"",
//             email:"",
//             password:"",
//             confirmPassword:"", 
//             selectedFile:null,
//             isRegistered:false,
//             wasSubmittedAtLeastOnce:false
//         } 
//     }
    
    
//     handleChange = (e) => 
//     {
//         this.setState({[e.target.name]: e.target.value})
//     }
    

//     handleFileChange = (e) => 
//     {
//         this.setState({selectedFile: e.target.files[0]})
//     }
    
    
//     handleSubmit = (e) => 
//     {
//         e.preventDefault()
//         console.log("name", this.state.name)
//         console.log("email", this.state.email)
//         console.log("password", this.state.password)
//         console.log("formdata: ", this.state.formData)

//         let formData = new FormData()  
//         if(this.state.selectedFile)
//         {
//             formData.append("profilePhoto", this.state.selectedFile, this.state.selectedFile.name)
//         }    
//         axios.post(`${SERVER_HOST}/users/register/${this.state.name}/${this.state.email}/${this.state.password}`, formData, {headers: {"Content-type": "multipart/form-data"}})
//         .then(res => 
//         {     
//             localStorage.name = res.data.name
//             localStorage.accessLevel = res.data.accessLevel
//             localStorage.profilePhoto = res.data.profilePhoto                    
//             localStorage.token = res.data.token
                    
//             this.setState({isRegistered:true})               
//         })   
//         .catch(err =>
//         {
//             this.setState({wasSubmittedAtLeastOnce: true})            
//         })
//     }


//     render() 
//     {     
//         let errorMessage = "";
//         if(this.state.wasSubmittedAtLeastOnce)
//         {
//             errorMessage = <div className="error">Error: All fields must be filled in<br/></div>;
//         }          
    
//         return (
//             <>
//             <NavigationBar />
//             <main className="login_main">
//             <div className="outside-form-container">
//         <form className="form-container" noValidate = {true} id = "loginOrRegistrationForm">
       
//             {this.state.isRegistered ? <Redirect to="/main"/> : null} 
//             {errorMessage}
//             <div className="loginHeaderContainer">
//                         <Link className="anotherLoginHeader" to={"/Login"}>Login</Link>
//                         <p className="loginHeaderLink">|</p>
//                         <h2>Sign Up</h2>
//                     </div>
       
//             <input  
//                 name = "name"              
//                 type = "text"
//                 placeholder = "Name"
//                 autoComplete="name"
//                 value = {this.state.name}
//                 onChange = {this.handleChange}
//                 ref = {(input) => { this.inputToFocus = input }} 
//             /><br/>           

//         <input  
//                 name = "email"              
//                 type = "email"
//                 placeholder = "Email"
//                 autoComplete="email"
//                 value = {this.state.email}
//                 onChange = {this.handleChange}
//             /><br/>              

//         <input  
//                 name = "password"           
//                 type = "password"
//                 placeholder = "Password"
//                 autoComplete="password"
//                 title = "Password must be at least ten-digits long and contains at least one lowercase letter, one uppercase letter, one digit and one of the following characters (£!#€$%^&*)"
//                 value = {this.state.password}
//                 onChange = {this.handleChange}
//             /><br/>           

//             <input          
//                 name = "confirmPassword"    
//                 type = "password"
//                 placeholder = "Confirm password"
//                 autoComplete="confirmPassword"
//                 value = {this.state.confirmPassword}
//                 onChange = {this.handleChange}
//             /><br/>
            
//             <input            
//                 type = "file"                    
//                 onChange = {this.handleFileChange}
//             /><br/><br/>
            
//             <span>
//             <LinkInClass value="Register New User" className="green-button" onClick={this.handleSubmit} />
//             <Link className="red-button" to={"/main"}>Cancel</Link>   
//             </span>
//         </form>
//         </div>
//         </main>
//         </>
//         )
//     }
// }

import React, {Component} from "react"
import {Redirect, Link} from "react-router-dom"
import axios from "axios"
import NavigationBar from "./NavigationBar"

import LinkInClass from "../components/LinkInClass"

import {SERVER_HOST} from "../config/global_constants"


export default class Register extends Component
{
    constructor(props)
    {
        super(props)
        
        this.state = {
            name:"",
            email:"",
            password:"",
            confirmPassword:"", 
            selectedFile:null,
            isRegistered:false,
            wasSubmittedAtLeastOnce:false
        } 
    }
    
    
    handleChange = (e) => 
    {
        this.setState({[e.target.name]: e.target.value})
    }
    

    handleFileChange = (e) => 
    {
        this.setState({selectedFile: e.target.files[0]})
    }
    
    
    handleSubmit = (e) => 
    {
        e.preventDefault()

        let formData = new FormData()  
        if(this.state.selectedFile)
        {
            formData.append("profilePhoto", this.state.selectedFile, this.state.selectedFile.name)
        }    
        axios.post(`${SERVER_HOST}/users/register/${this.state.name}/${this.state.email}/${this.state.password}`, formData, {headers: {"Content-type": "multipart/form-data"}})
        .then(res => 
        {     
            localStorage.name = res.data.name
            localStorage.accessLevel = res.data.accessLevel
            localStorage.profilePhoto = res.data.profilePhoto                    
            localStorage.token = res.data.token
                    
            this.setState({isRegistered:true})               
        })   
        .catch(err =>
        {
            this.setState({wasSubmittedAtLeastOnce: true})            
        })
        localStorage.setItem("userEmail", JSON.stringify(this.state.email));
    }


    render() 
    {     
        let errorMessage = "";
        if(this.state.wasSubmittedAtLeastOnce)
        {
            errorMessage = <div className="error">Error: All fields must be filled in<br/></div>;
        }          
    
        return (
            <>
            <NavigationBar />
            <main className="login_main">
            <div className="outside-form-container">
        <form className="form-container" noValidate = {true} id = "loginOrRegistrationForm">
       
            {this.state.isRegistered ? <Redirect to="/main"/> : null} 
            {errorMessage}
            <div className="loginHeaderContainer">
                        <Link className="anotherLoginHeader" to={"/Login"}>Login</Link>
                        <p className="loginHeaderLink">|</p>
                        <h2>Sign Up</h2>
                    </div>
       
            <input  
                name = "name"              
                type = "text"
                placeholder = "Name"
                autoComplete="name"
                value = {this.state.name}
                onChange = {this.handleChange}
                ref = {(input) => { this.inputToFocus = input }} 
            /><br/>           

        <input  
                name = "email"              
                type = "email"
                placeholder = "Email"
                autoComplete="email"
                value = {this.state.email}
                onChange = {this.handleChange}
            /><br/>              

        <input  
                name = "password"           
                type = "password"
                placeholder = "Password"
                autoComplete="password"
                title = "Password must be at least ten-digits long and contains at least one lowercase letter, one uppercase letter, one digit and one of the following characters (£!#€$%^&*)"
                value = {this.state.password}
                onChange = {this.handleChange}
            /><br/>           

            <input          
                name = "confirmPassword"    
                type = "password"
                placeholder = "Confirm password"
                autoComplete="confirmPassword"
                value = {this.state.confirmPassword}
                onChange = {this.handleChange}
            /><br/>
            
            <input            
                type = "file"                    
                onChange = {this.handleFileChange}
            /><br/><br/>
            
            <div className="login-bottom-button">
            <LinkInClass value="Register New User" className="green-button" onClick={this.handleSubmit} />
            <Link className="red-button" to={"/main"}>Cancel</Link>   
            </div>
        </form>
        </div>
        </main>
        </>
        )
    }
}