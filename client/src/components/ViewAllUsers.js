import React, { Component } from "react"
import { Redirect, Link } from "react-router-dom"
import Logout from "./Logout"
import axios from "axios"

import NavigationBar from "./NavigationBar"

import { ACCESS_LEVEL_GUEST, ACCESS_LEVEL_ADMIN, ACCESS_LEVEL_NORMAL_USER, SERVER_HOST } from "../config/global_constants"


export default class ViewAllUsers extends Component {
    constructor(props) {
        super(props)

        this.state = {
            users: [],

        }
    }


    componentDidMount() {
        if (localStorage.accessLevel > ACCESS_LEVEL_NORMAL_USER) {
            axios.get(`${SERVER_HOST}/users`)
                .then(res => {
                    this.setState({ users: res.data })
                })
                .catch(err => {
                    // do nothing
                })
        }
    }
    handleDelete = (userId) => {
        axios.delete(`${SERVER_HOST}/users/${userId}`)
            .then(res => {
                // Update state after successful deletion
                this.setState(prevState => ({
                    users: prevState.users.filter(user => user._id !== userId)
                }));
            })
            .catch(err => {
                // Handle error
                console.error("Error deleting user:", err);
            });
    };


    render() {
        console.log(this.state.users)
        return (
            <>
            {localStorage.accessLevel > ACCESS_LEVEL_NORMAL_USER?
            <div>
                <NavigationBar />
                <h2 className="shoppingcarth2">All Users</h2>
                <div className="viewallusertable">
                    <table>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Phone</th>
                                <th>Address</th>
                                <th>Configure</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.users.map(user => (
                                <tr key={user._id}>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td>{user.phone}</td>
                                    <td>{user.address}</td>
                                    <td>
                                        <button onClick={() => this.handleDelete(user._id)} className="logoutbutton">Delete</button>
                                        <Link className="green-button" to={`/ViewPurchaseHistory/${user.email}`}>View Purchase History</Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="logoutButton">
                    <button className="logoutbutton"><Logout /></button>
                </div>

            </div>
            :<Redirect to={"/main"} />}
            </>
        );
    }

}