import React, { Component } from "react"
import { Redirect, Link } from "react-router-dom"
import Logout from "./Logout"
import axios from "axios"
import NavigationBar from "./NavigationBar"

import { ACCESS_LEVEL_GUEST, ACCESS_LEVEL_ADMIN, ACCESS_LEVEL_NORMAL_USER, SERVER_HOST } from "../config/global_constants"



export default class ViewAllUsers extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [],
            searchQuery: "",
            sortFunction: "name",
            phoneFilter: "all"
        };
    }

    componentDidMount() {
        if (localStorage.accessLevel > ACCESS_LEVEL_NORMAL_USER) {
            axios.get(`${SERVER_HOST}/users`)
                .then(res => {
                    this.setState({ users: res.data })
                })
                .catch(err => {
                    // do nothing
                    console.error("Error fetching users:", err);
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

    handleSearchChange = (event) => {
        this.setState({ searchQuery: event.target.value });
    };

    handleSortChange = (event) => {
        this.setState({ sortFunction: event.target.value });
    };

    handlePhoneFilterChange = (value) => {
        this.setState({ phoneFilter: value });
    };

    render() {
        const { users, searchQuery, sortFunction, phoneFilter } = this.state;

        let filteredUsers = users.filter(user =>
            user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
            user.phone.toLowerCase().includes(searchQuery.toLowerCase()) ||
            user.address.toLowerCase().includes(searchQuery.toLowerCase())
        );

        if (phoneFilter === "irish") {
            filteredUsers = filteredUsers.filter(user => user.phone.startsWith("353"));
        }

        let sortedUsers = [...filteredUsers];
        if (sortFunction === "name") {
            sortedUsers.sort((a, b) => a.name.localeCompare(b.name));
        } else if (sortFunction === "email") {
            sortedUsers.sort((a, b) => a.email.localeCompare(b.email));
        } else if (sortFunction === "phone") {
            sortedUsers.sort((a, b) => {
                if (!a.phone && !b.phone) return 0;
                if (!a.phone) return 1;
                if (!b.phone) return -1;
                return a.phone.localeCompare(b.phone);
            });
        } else if (sortFunction === "address") {
            sortedUsers.sort((a, b) => {
                if (!a.address && !b.address) return 0;
                if (!a.address) return 1;
                if (!b.address) return -1;
                return a.address.localeCompare(b.address);
            });
        }

        return (
            <>
                {localStorage.accessLevel > ACCESS_LEVEL_NORMAL_USER ?
                    <div>
                        <NavigationBar />
                        <h2 className="shoppingcarth2">All Users</h2>

                        <div className="viewallusertable">
                            {/* <div> */}
                            <div className="FunctionContainer">
                                <input
                                    type="text"
                                    placeholder="Search..."
                                    value={searchQuery}
                                    onChange={this.handleSearchChange}
                                />
                                <div className="sortAndFilterContainer">
                                    <select value={sortFunction} onChange={this.handleSortChange}>
                                        <option value="name">Sort by Name</option>
                                        <option value="email">Sort by Email</option>
                                        <option value="phone">Sort by Phone</option>
                                        <option value="address">Sort by Address</option>
                                    </select>

                                    <div>
                                        {/* <label htmlFor="phoneFilter">Filter by Phone:</label> */}
                                        <select id="phoneFilter" value={phoneFilter} onChange={(e) => this.handlePhoneFilterChange(e.target.value)}>
                                            <option value="all">All</option>
                                            <option value="irish">Filter by Irish phone</option>
                                            {/* Add more options for other filters if needed */}
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <table>
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Email</th>
                                        <th>Phone</th>
                                        <th>Address</th>
                                        <th>Configure</th>
                                        {/* <th>History</th> */}
                                    </tr>
                                </thead>
                                <tbody>
                                    {sortedUsers.map(user => (
                                        user.accessLevel == ACCESS_LEVEL_ADMIN ? null :

                                            <tr key={user._id}>
                                                <td>{user.name}</td>
                                                <td>{user.email}</td>
                                                <td>{user.phone}</td>
                                                <td>{user.address}</td>
                                                <td>
                                                <Link className="green-button" to={`/ViewPurchaseHistory/${user.email}`}>Purchase History</Link>
                                                    <button onClick={() => this.handleDelete(user._id)} className="logoutbutton">Delete</button>
                                                </td>

                                                {/* <td>
                                                    <Link className="green-button" to={`/ViewPurchaseHistory/${user.email}`}>Purchase History</Link>
                                                    </td> */}
                                            </tr>

                                    ))}
                                </tbody>
                            </table>
                            {/* </div> */}
                        </div>
                        <div className="logoutButton">
                            <button className="logoutbutton"><Logout /></button>
                        </div>

                    </div>
                    : <Redirect to={"/main"} />}
            </>
        );
            }
    }


