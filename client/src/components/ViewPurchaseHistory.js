import React, { Component } from "react"
import { Redirect, Link } from "react-router-dom"

import axios from "axios"

import NavigationBar from "./NavigationBar"

import { ACCESS_LEVEL_GUEST, ACCESS_LEVEL_ADMIN, ACCESS_LEVEL_NORMAL_USER, SERVER_HOST } from "../config/global_constants"


export default class ViewAllUsers extends Component {
    constructor(props) {
        super(props)

        this.state = {
            purchaseHistory: [],

            eachItemsInOrder: [],
            allOrders: []

        }
    }


    // componentDidMount() {
    //     if (localStorage.accessLevel > ACCESS_LEVEL_GUEST) {
    //         let userEmail = JSON.parse(localStorage.getItem("userEmail"));
    //         axios.get(`${SERVER_HOST}/sales/email?email=${userEmail}`)
    //         .then(res => {
    //             // Update purchaseHistory state
    //             this.setState({ purchaseHistory: res.data }, () => {
    //                 // Iterate over each item in purchase history and fetch shirt details
    //                 this.state.purchaseHistory.forEach(itemsInArray => {
    //                     itemsInArray.items.forEach(item => { // Changed from map to forEach
    //                         axios.get(`${SERVER_HOST}/shirts/${item.shirtID}`, { headers: { "authorization": localStorage.token } })
    //                         .then(res => {
    //                             const updatedItem = { ...res.data, quantity: item.quantity }; // Add quantity property
    //                             // Update eachItemsInOrder state by appending new items
    //                             this.setState(prevState => ({
    //                                 eachItemsInOrder: [...prevState.eachItemsInOrder, updatedItem]
    //                             }));
    //                         })
    //                         .catch(err => {
    //                             console.error("Error fetching shirt data:", err);
    //                         });
    //                     });
    //                 });
    //             });
    //         })
    //         .catch(err => {
    //             console.error("Error fetching user data:", err);
    //         });
    //     }
    // }
    // componentDidMount() {
    //     if (localStorage.accessLevel > ACCESS_LEVEL_GUEST) {
    //         let userEmail = JSON.parse(localStorage.getItem("userEmail"));
    //         axios.get(`${SERVER_HOST}/sales/email?email=${userEmail}`)
    //         .then(res => {
    //             // Update purchaseHistory state
    //             this.setState({ purchaseHistory: res.data }, () => {
    //                 // Iterate over each item in purchase history
    //                 this.state.purchaseHistory.forEach((itemsInArray, index) => {
    //                     // Store each itemsInOrder array in a separate array
    //                     let eachItemsInOrder = [];
    //                     itemsInArray.items.forEach(item => {
    //                         axios.get(`${SERVER_HOST}/shirts/${item.shirtID}`, { headers: { "authorization": localStorage.token } })
    //                         .then(res => {
    //                             const updatedItem = { ...res.data, quantity: item.quantity }; // Add quantity property
    //                             eachItemsInOrder.push(updatedItem);
    //                         })
    //                         .catch(err => {
    //                             console.error("Error fetching shirt data:", err);
    //                         });
    //                     });
    //                     // Push eachItemsInOrder array into allOrders array
    //                     this.setState(prevState => ({
    //                         allOrders: [
    //                             ...prevState.allOrders,
    //                             {
    //                                 orderId: itemsInArray._id, // Store item._id into allOrders
    //                                 eachItemsInOrder: eachItemsInOrder
    //                             }
    //                         ]
    //                     }));
    //                 });
    //             });
    //         })
    //         .catch(err => {
    //             console.error("Error fetching user data:", err);
    //         });
    //     }
    // }


    componentDidMount() {
        if (localStorage.accessLevel > ACCESS_LEVEL_GUEST) {
            let userEmail = JSON.parse(localStorage.getItem("userEmail"));
            axios.get(`${SERVER_HOST}/sales/email?email=${userEmail}`)
                .then(res => {

                    this.setState({ purchaseHistory: res.data }, () => {

                        this.state.purchaseHistory.forEach((itemsInArray, index) => {

                            let eachItemsInOrder = [];
                            itemsInArray.items.forEach(item => {
                                axios.get(`${SERVER_HOST}/shirts/${item.shirtID}`, { headers: { "authorization": localStorage.token } })
                                    .then(res => {
                                        const updatedItem = { ...res.data, quantity: item.quantity };
                                        eachItemsInOrder.push(updatedItem);
                                        // Update state after all items are fetched
                                        if (eachItemsInOrder.length === itemsInArray.items.length) {
                                            this.setState(prevState => ({
                                                allOrders: [
                                                    ...prevState.allOrders,
                                                    {
                                                        orderId: itemsInArray._id, // Store item._id into allOrders
                                                        eachItemsInOrder: eachItemsInOrder
                                                    }
                                                ]
                                            }));
                                        }
                                    })
                                    .catch(err => {
                                        console.error("Error fetching shirt data:", err);
                                    });
                            });
                        });
                    });
                })
                .catch(err => {
                    console.error("Error fetching user data:", err);
                });
        }
    }



    // handleDelete = (userId) => {
    //     axios.delete(`${SERVER_HOST}/users/${userId}`)
    //         .then(res => {
    //             // Update state after successful deletion
    //             this.setState(prevState => ({
    //                 users: prevState.users.filter(user => user._id !== userId)
    //             }));
    //         })
    //         .catch(err => {
    //             // Handle error
    //             console.error("Error deleting user:", err);
    //         });
    // };


    render() {
        // console.log(this.state.allOrders.map(order => order.eachItemsInOrder.map(item => item.name)));
        return (
            <>
                {localStorage.accessLevel > ACCESS_LEVEL_GUEST ? (
                    <div>
                        <NavigationBar />
                        <h2>Ordered Items</h2>
                        {this.state.allOrders.map(order => (
                            <div key={order.orderId}>
                                <h3>Order ID: {order.orderId}</h3>
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Name</th>
                                            <th>Price</th>
                                            <th>Size</th>
                                            <th>Quantity</th>
                                        </tr>
                                    </thead>
                                    <tbody>

                                        {order.eachItemsInOrder.map(item => (
                                            <tr>
                                                <td>{item.name}</td>
                                                <td>{item.price}</td>
                                                <td>{item.size}</td>
                                                <td>{item.quantity}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        ))}
                    </div>
                ) : (
                    <Redirect to={"/main"} />
                )}
            </>
        );
    }



}