// import React, {Component} from "react"
// import {Link} from "react-router-dom"

// import axios from "axios"
// import NavigationBar from "./NavigationBar"


// import {ACCESS_LEVEL_GUEST, ACCESS_LEVEL_ADMIN, SERVER_HOST} from "../config/global_constants"


// export default class Dashboard extends Component 
// {
//     constructor(props) 
//     {
//         super(props)

//         this.state = {
//             user:[]
//         }
//     }


//     componentDidMount() {
//         let userEmail = JSON.parse(localStorage.getItem("userEmail") || null);

//         // axios.get(`${SERVER_HOST}/users/email`,{email:userEmail},)
//         //     .then(res => {
//         //         this.setState({ user: res.data });
//         //     })
//         //     .catch(err => {
//         //         console.error("Error fetching user data:", err);
//         //     });
//     //     axios.get(`${SERVER_HOST}/users/email`, { params: { email: userEmail } })
//     // .then(res => {
//     //     this.setState({ user: res.data });
//     // })
//     // .catch(err => {
//     //     console.error("Error fetching user data:", err);
//     // });
//     axios.get(`${SERVER_HOST}/users/email?email=${userEmail}`)
//     .then(res => {
//         this.setState({ user: res.data });
//     })
//     .catch(err => {
//         console.error("Error fetching user data:", err);
//     });


//     }






//     render() 
//     {   
// console.log(this.state.user)
//             return (           
//             <div>
//                 <NavigationBar />


//             </div>

//         )
//     }
// }


// import React, { Component } from "react";
// import axios from "axios";
// import NavigationBar from "./NavigationBar";
// import { SERVER_HOST } from "../config/global_constants";

// export default class Dashboard extends Component {
//     constructor(props) {
//         super(props);

//         this.state = {
//             user: {},
//             newName: "",
//             newPhone: "",
//             newAddress: ""
//         };
//     }

//     componentDidMount() {
//         let userEmail = JSON.parse(localStorage.getItem("userEmail") || null);

//         axios.get(`${SERVER_HOST}/users/email?email=${userEmail}`)
//             .then(res => {
//                 this.setState({ user: res.data });
//             })
//             .catch(err => {
//                 console.error("Error fetching user data:", err);
//             });
//     }

//     handleInputChange = (e) => {
//         const { name, value } = e.target;
//         this.setState({ [name]: value });
//     }

//     updateUser = (e) => {
//         e.preventDefault();
//         const { newName, newPhone, newAddress } = this.state;
//         const userEmail = JSON.parse(localStorage.getItem("userEmail") || null);

//         axios.put(`${SERVER_HOST}/users/update`, { email: userEmail, newName, newPhone, newAddress })
//             .then(res => {
//                 // Handle success
//                 console.log("User updated successfully");
//             })
//             .catch(err => {
//                 // Handle error
//                 console.error("Error updating user:", err);
//             });
//     }

//     render() {

//         const { user, newName, newPhone, newAddress } = this.state;
//         console.log(user)
// console.log(newName)
// console.log(newPhone)
// console.log(newAddress)
//         return (
//             <div>
//                 <NavigationBar />
//                 <h2>Welcome, {user.name}</h2>
//                 <form onSubmit={this.updateUser}>
//                     <div>
//                         <label>Name:</label>
//                         <input type="text" name="newName" value={newName} onChange={this.handleInputChange} />
//                     </div>
//                     <div>
//                         <label>Phone:</label>
//                         <input type="text" name="newPhone" value={newPhone} onChange={this.handleInputChange} />
//                     </div>
//                     <div>
//                         <label>Address:</label>
//                         <input type="text" name="newAddress" value={newAddress} onChange={this.handleInputChange} />
//                     </div>
//                     <button type="submit">Save</button>
//                 </form>
//             </div>
//         );
//     }
// }



import React, { Component } from "react";
import axios from "axios";
import { Redirect, Link } from "react-router-dom";
import NavigationBar from "./NavigationBar";
import { SERVER_HOST } from "../config/global_constants";
import Logout from "./Logout"
import LinkInClass from "../components/LinkInClass"

export default class Dashboard extends Component {
    constructor(props) {
        super(props);

        this.state = {
            user: {},
            newName: "",
            newPhone: "",
            newAddress: "",
            redirectToMain: false,
            redirectToCart: false,
            // redirectToLogout: false,
            from: "",
            errors: {
                newName: "",
                newPhone: "",
                newAddress: ""
            }
        };
    }

    componentDidMount() {
        let userEmail = JSON.parse(localStorage.getItem("userEmail") || null);

        axios.get(`${SERVER_HOST}/users/email?email=${userEmail}`)
            .then(res => {
                this.setState({ user: res.data, newName: res.data.name, newPhone: res.data.phone, newAddress: res.data.address });
            })
            .catch(err => {
                console.error("Error fetching user data:", err);
            });

        const { state } = this.props.location;
        if (state && state.from === "cart") {
            this.setState({ from: "cart" })
        }
    }

    handleInputChange = (e) => {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    updateUser = (e) => {
        e.preventDefault();
        const { newName, newPhone, newAddress } = this.state;

        // Validation
        const errors = {};
        if (!newName.trim()) {
            errors.newName = "Name is required";
        }
        if (!newPhone.trim()) {
            errors.newPhone = "Phone number is required";
        } else if (!/^\d{8,15}$/.test(newPhone)) {
            errors.newPhone = "Phone number must be between 8 and 15 digits";
        }
        if (!newAddress.trim()) {
            errors.newAddress = "Address is required";
        }

        // Check if there are any errors
        if (Object.keys(errors).length === 0) {
            // No errors, proceed with submission
            const userEmail = JSON.parse(localStorage.getItem("userEmail") || null);

            axios.put(`${SERVER_HOST}/users/update`, { email: userEmail, newName, newPhone, newAddress })
                .then(res => {
                    // Handle success
                    console.log("User updated successfully");
                    if (this.state.from === "cart") {
                        this.setState({ redirectToCart: true });
                    } else {
                        this.setState({ redirectToMain: true });
                    }
                })
                .catch(err => {
                    // Handle error
                    console.error("Error updating user:", err);
                });
        } else {
            // Errors found, update state with error messages
            this.setState({ errors });
        }
    }

    // handleLogout = (e) => {
    //     this.setState({ redirectToLogout: true })
    // }

    render() {
        const { user, newName, newPhone, newAddress, errors } = this.state;

        return (

            <div>
                {/* {this.state.redirectToLogout ? <Redirect to={"/Logout"} /> : null} */}
                {this.state.redirectToMain ? <Redirect to={"/main"} /> : null}
                {this.state.redirectToCart ? <Redirect to={{ pathname: "/ShoppingCart/", state: { haveEnoughData: true } }} /> : null}
                <NavigationBar />
                <h2 className="shoppingcarth2">Welcome, {user.name}</h2>
                <form onSubmit={this.updateUser} className="userdashboardform">
                    <div className="biggestdashboard">
                        <div className="dashboardimage">
                            <img id="myphoto" src={`data:;base64,${localStorage.profilePhoto}`} alt="" />
                        </div>
                        <div className="theotherhalfdashboard">
                            <div className="labelinputdiv">
                                <div>
                                    <label>Name: </label>
                                </div>
                                <div>
                                    <input type="text" placeholder="Name" name="newName" value={newName !== null ? newName : user.name} onChange={this.handleInputChange} />
                                    {errors.newName && <h6 className="error">{errors.newName}</h6>}
                                </div>
                            </div>
                            <div className="labelinputdiv">
                                <div>
                                    <label>Phone: </label>
                                </div>
                                <div>
                                    <input type="text" placeholder="Phone" name="newPhone" value={newPhone !== null ? newPhone : user.phone} onChange={this.handleInputChange} />
                                    {errors.newPhone && <h6 className="error">{errors.newPhone}</h6>}
                                </div>
                            </div>
                            <div className="labelinputdiv">
                                <div>
                                    <label>Address: </label>
                                </div>
                                <div>
                                    <input type="text" placeholder="Address" name="newAddress" value={newAddress !== null ? newAddress : user.address} onChange={this.handleInputChange} />
                                    {errors.newAddress && <h6 className="error">{errors.newAddress}</h6>}
                                </div>
                            </div>
                            <div className="dashboardsavebutton">
                                <button type="submit">Save</button>
                            </div>
                        </div>
                    </div>
                </form>
                <div className="subshirtbacktomain">
                    <Link to="/viewpurchasehistory" className="purchasehistory">Purchase History</Link>
                </div>
                <div className="logoutButton">
                    <button className="logoutbutton"><Logout /></button>
                </div>
            </div>
        );
    }
}

