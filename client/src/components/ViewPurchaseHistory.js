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
            allOrders: [],
            searchQuery: "",
            sortFunction: "name",
            sizeFilter: ""
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
            let userEmail;
            // const currentUrl = window.location.pathname;
            if (localStorage.accessLevel == ACCESS_LEVEL_NORMAL_USER) {
                userEmail = JSON.parse(localStorage.getItem("userEmail"));
            } else if (localStorage.accessLevel == ACCESS_LEVEL_ADMIN) {
                // if (currentUrl === "/ViewPurchaseHistory") {
                //     userEmail = JSON.parse(localStorage.getItem("userEmail"));
                // } else if (currentUrl.startsWith("/ViewPurchaseHistory/")) {
                //     userEmail = this.props.match.params.email;
                // }
                userEmail = this.props.match.params.email;
            }

            axios.get(`${SERVER_HOST}/sales/email?email=${userEmail}`)
                .then(res => {
                    // Update purchase history state
                    this.setState({ purchaseHistory: res.data }, () => {
                        // Iterate over each purchase history item
                        this.state.purchaseHistory.forEach((itemsInArray, index) => {
                            let eachItemsInOrder = [];
                            let totalPrice = 0; // Initialize total price for the order
                            itemsInArray.items.forEach(item => {
                                // Fetch shirt details and calculate total price for each item
                                axios.get(`${SERVER_HOST}/shirts/${item.shirtID}`, { headers: { "authorization": localStorage.token } })
                                    .then(res => {
                                        const updatedItem = { ...res.data, quantity: item.quantity };
                                        eachItemsInOrder.push(updatedItem);

                                        // Check if all items are fetched
                                        if (eachItemsInOrder.length === itemsInArray.items.length) {
                                            // Add the price of the item to the total price
                                            eachItemsInOrder.map(item => totalPrice += item.price * item.quantity)

                                            // Update state after all items are fetched
                                            this.setState(prevState => ({
                                                allOrders: [
                                                    ...prevState.allOrders,
                                                    {
                                                        orderId: itemsInArray._id,
                                                        eachItemsInOrder: eachItemsInOrder,
                                                        totalPrice: totalPrice
                                                    }
                                                ]
                                            }), () => {
                                                // Call loadShirtPhotos() after updating state
                                                this.loadShirtPhotos();
                                            });
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
    loadShirtPhotos() {
        this.state.allOrders.forEach(order => {
            order.eachItemsInOrder.forEach(item => {
                item.shirtPhotoFilename.forEach(photo => {
                    axios.get(`${SERVER_HOST}/shirts/photo/${photo.filename}`)
                        .then(res => {
                            // Update shirt photo in DOM
                            const elements = document.getElementsByClassName(photo._id);
                            Array.from(elements).forEach(element => {
                                element.src = `data:;base64,${res.data.image}`;
                            });
                        })
                        .catch(err => {
                            // Handle error
                            console.error("Error loading shirt photo:", err);
                        });
                });
            });
        });
    }

    handleSearchChange = (event) => {
        // Update search query state
        this.setState({ searchQuery: event.target.value });
    };


    handleSortByTotalPrice = () => {
        this.setState({ sortFunction: "totalPrice" });
    };


    handleSortByDefault = () => {
        this.setState({ sortFunction: "name" }); // Set the default sorting option
    };

    handleSizeFilterChange = (event) => {
        // Update size filter state
        this.setState({ sizeFilter: event.target.value });
    };

render() {
    const { allOrders, searchQuery, sortFunction,sizeFilter } = this.state;
    
    let filteredOrders = allOrders.filter(order =>
        order.eachItemsInOrder.some(item => item.name.toLowerCase().includes(searchQuery.toLowerCase()))
    );

    if (sizeFilter !== "") {
        filteredOrders = filteredOrders.filter(order =>
            order.eachItemsInOrder.some(item => item.size.toLowerCase() === sizeFilter.toLowerCase())
        );
    }

    let sortedOrders = [...filteredOrders];
    if (sortFunction === "totalPrice") {
        sortedOrders.sort((a, b) => a.totalPrice - b.totalPrice);
    }else if (sortFunction === "name") {
        sortedOrders = filteredOrders; 
    }

    return (
        <>
            {localStorage.accessLevel > ACCESS_LEVEL_GUEST ? (
                <div>
                    <NavigationBar />
                    <h2>Ordered Items</h2>
                    <input
                        type="text"
                        placeholder="Search..."
                        value={searchQuery}
                        onChange={this.handleSearchChange}
                    />
                    <div className="sortInViewPurchaseHistory">
                        <select value={sortFunction} onChange={(e) => {
                            if (e.target.value === 'totalPrice') {
                                this.handleSortByTotalPrice();
                            }else if (e.target.value === 'name') {
                                this.handleSortByDefault(); // Handle default sorting option
                            }
                        }}>
                            <option value="name">Default Sorting</option>
                            <option value="totalPrice">Sort by Total Price</option>
                        </select>
                    </div>

                    <div>
                    {/* <h2>Filter by Size:</h2> */}
                    <select value={sizeFilter} onChange={this.handleSizeFilterChange}>
                        <option value="">All Sizes</option>
                        <option value="XS">XS</option>
                        <option value="S">S</option>
                        <option value="M">M</option>
                        <option value="L">L</option>
                        <option value="XL">XL</option>
                    </select>
                </div>
                    {this.state.allOrders.length === 0 ? <h4>The User didn't purchase anything yet</h4>

                        :
                        <div>
                            {sortedOrders.map(order => (
                                <div key={order.orderId}>
                                    <h3>Order ID: {order.orderId}</h3>
                                    <table>
                                        <thead>
                                            <tr>
                                                <th>Name</th>
                                                <th>Price</th>
                                                <th>Size</th>
                                                <th>Quantity</th>
                                                <th>Total Price for this t-shirt</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {order.eachItemsInOrder.map(item => (
                                                <tr key={item._id}>
                                                    <td>{item.shirtPhotoFilename.map(photo => (
                                                            <img key={photo._id} className={photo._id} alt="" src={`data:;base64,${photo.image}`} />
                                                        ))}
                                                        </td>
                                                    <td>{item.name}</td>
                                                    <td>{item.price}</td>
                                                    <td>{item.size}</td>
                                                    <td>{item.quantity}</td>
                                                    <td>{item.price * item.quantity}</td>
                                                </tr>
                                            ))}
                                            <tr>
                                                <td>Total Of The Order Price:</td>
                                                <td>{order.totalPrice}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            ))}
                        </div>

                    }
                </div>
            ) : (
                <Redirect to={"/main"} />
            )}
        </>
    );
}
}