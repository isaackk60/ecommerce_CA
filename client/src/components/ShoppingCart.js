// import React, { Component } from "react"
// import Form from "react-bootstrap/Form"

// import axios from "axios"

// export default class ShoppingCart extends Component {
//     constructor(props){
//         this.state = {
//             items: [], 
//             totalPrice: 0 
//         };
//     }

//     addItemToCart = (item) => {
//         const updatedItems = [...this.state.items, item];
//         const totalPrice = this.state.totalPrice + (item.price * item.quantity);
//         this.setState({ items: updatedItems, totalPrice });
//     };

//     render() {
//         const { items, totalPrice } = this.state;
//         const { itemsInCart } = this.props.location.state;

//         return (
//             <div>
//                 <h2>Shopping Cart</h2>
//                 <ul>
//                     {items.map((item, index) => (
//                         <li key={index}>
//                             {item.name} - Quantity: {item.quantity} - Price: ${item.price * item.quantity}
//                         </li>
//                     ))}
//                 </ul>
//                 <p>Total Price: ${totalPrice}</p>
//             </div>
//         );
//     }
// }









// import React, { Component } from "react";
// import Form from "react-bootstrap/Form"
// import NavigationBar from "./NavigationBar"
// import { SERVER_HOST } from "../config/global_constants"

// import axios from "axios"

// export default class ShoppingCart extends Component {
//     constructor(props) {
//         super(props)

//         this.state = {
//             // userId:"",
//             name: "",
//             size: "",
//             price: "",
//             quantity: "",
//             shirtPhotoFilename: null,
//             // redirectToDisplayAllTShirtInCart: localStorage.accessLevel < ACCESS_LEVEL_ADMIN,
//             wasSubmittedAtLeastOnce: false,
//             cart:[],
//             totalPrice:0
//         }
//     }
//     componentDidMount() {
//         // const { itemsInCart } = this.props.location.state || { itemsInCart: [] };
//         axios.get(`${SERVER_HOST}/cart/`)
//         .then(res => 
//         { 
//             this.setState({cart: res.data})                                         
//         })
//         .catch(err =>
//         {
//             // do nothing
//         })


//         axios.get(`${SERVER_HOST}/cart/${this.props.match.params.id}`, { headers: { "authorization": localStorage.token } })
//         .then(res => {
//             this.setState({
//                 name: res.data.name,
//                 // colour: res.data.colour,
//                 size: res.data.size,
//                 price: res.data.price,
//                 quantity: res.data.quantity,
//                 shirtPhotoFilename:res.data.shirtPhotoFilename
//             })
//         })
//         .catch(err => {
//             // do nothing
//         })


//         // Update cart state with itemsInCart
//         // this.setState({ cart: itemsInCart });

//         // Calculate total price
//         let totalPrice = 0;
//         // itemsInCart.forEach(item => {
//         //     totalPrice += item.price * item.quantity;
//         // });
//         this.state.cart.forEach(item => {
//             totalPrice += item.price * item.quantity;
//         })

//         // Update totalPrice state
//         this.setState({ totalPrice: totalPrice });

//         // Load shirt photos
//         this.state.cart.forEach(cartItem => {
//             cartItem.shirtPhotoFilename.forEach(photo => {
//                 axios.get(`${SERVER_HOST}/shirts/photo/${photo.filename}`)
//                     .then(res => {
//                         // Update shirt photo in DOM
//                         document.getElementById(photo._id).src = `data:;base64,${res.data.image}`;
//                     })
//                     .catch(err => {
//                         // Handle error
//                     });
//             });
//         });
//     }

//     // componentDidMount(){
//     //     const { itemsInCart } = this.props.location.state || { itemsInCart: [] };
//     //     this.setState({ cart: itemsInCart });
//     //     let totalPrice = 0;
//     //     itemsInCart.forEach(item => {
//     //         totalPrice += item.price * item.quantity;
//     //     });
//     //     this.setState({ totalPrice: totalPrice });
//     //     this.state.cart.shirtPhotoFilename.map(photo => {
//     //         return axios.get(`${SERVER_HOST}/shirts/photo/${photo.filename}`)
//     //             .then(res => {
//     //                 document.getElementById(photo._id).src = `data:;base64,${res.data.image}`
//     //             })
//     //             .catch(err => {
//     //                 // do nothing
//     //             })
//     //     })
//         // let formData = new FormData()
//         // formData.append("userId", this.state.stock)
//         // formData.append("name", this.state.name)
//         // // formData.append("colour", this.state.colour)
//         // formData.append("size", this.state.size)
//         // formData.append("price", this.state.price)
//         // formData.append("quantity", this.state.quantity)


//         // if (this.state.cart.shirtPhotoFilename) {
//         //     for (let i = 0; i < this.state.cart.shirtPhotoFilename.length; i++) {
//         //         formData.append("cartPhotos", this.state.cart.shirtPhotoFilename[i])
//         //     }
//         // }

//         // axios.post(`${SERVER_HOST}/cart`, formData, { headers: { "authorization": localStorage.token, "Content-type": "multipart/form-data" } })
//         //     .then(res => {
//         //         this.setState({ redirectToDisplayAllTShirtInCart: true })
//         //     })
//         //     .catch(err => {
//         //         this.setState({ wasSubmittedAtLeastOnce: true })
//         //     })
//     //}
//     render() {
// console.log(this.state.cart)
//         return (
//             <div>
//                 <NavigationBar />
//                 <h2>Shopping Cart</h2>
//                 {/* <div>
//                     {this.state.cart.shirtPhotoFilename === null ? null : <div className="shirtPhotos">{this.state.cart.shirtPhotoFilename.map(photo => <img key={photo._id} id={photo._id} alt="" />)}</div>}
//                 </div> */}
//                 {/* <ul>
//                     {this.state.cart.map((item, index) => (
//                         <li key={index}>
//                             {item.name} - Quantity: {item.quantity} - Price: €{item.price * item.quantity}
//                         </li>
//                     ))}
//                 </ul> */}
//                 <p>Total Price: €{this.state.totalPrice}</p>
//             </div>
//         );
//     }
// }





import React, { Component } from "react";
import NavigationBar from "./NavigationBar";
import { ACCESS_LEVEL_NORMAL_USER, SERVER_HOST } from "../config/global_constants"
import axios from "axios";
import BuyShirt from "./BuyShirt";


export default class ShoppingCart extends Component {
    constructor(props) {
        super(props);

        this.state = {
            // name:"",
            // price:"",
            // quantity:"",
            // size:"",
            cart: [],
            guestName: "",
            guestEmail: "",
            guestAddress: "",
            guestPhone: "",
            isGuest: localStorage.accessLevel < ACCESS_LEVEL_NORMAL_USER,
            redirectToPaypalButton: false
            // totalPrice: 0
        };
    }

    componentDidMount() {
        // Fetch cart data from the server
        const cartLocalStorage = JSON.parse(localStorage.getItem("itemsInCart") || "[]");

        // console.log("itemsInCart: ",localStorage.getItem("itemsInCart").forEach(item=>{item.shirtPhotoFilename}))

        this.setState({ cart: cartLocalStorage }, () => {
            // Load shirt photos after updating state
            this.loadShirtPhotos();
        });

        // this.props.shirt.shirtPhotoFilename.map(photo => {
        //     return axios.get(`${SERVER_HOST}/shirts/photo/${photo.filename}`)
        //         .then(res => {
        //             document.getElementById(photo._id).src = `data:;base64,${res.data.image}`
        //         })
        //         .catch(err => {
        //             // do nothing
        //         })
        // })

        // this.state.cart.map(item=>{item.shirtPhotoFilename.map(photo => {
        //     return axios.get(`${SERVER_HOST}/shirts/photo/${photo.filename}`)
        //         .then(res => {
        //             document.getElementById(photo._id).src = `data:;base64,${res.data.image}`
        //         })
        //         .catch(err => {
        //             // do nothing
        //         })
        // })})

        // this.setState({ cart: cartLocalStorage }, () => {
        //     // Calculate total price after updating state
        //     this.calculateTotalPrice();
        // });

        // console.log(this.state.cart[0])
        //         let totalPrice = 0;
        //         this.state.cart.map(item => {
        //             console.log(item)
        //                         totalPrice += item.price * item.quantity;
        //                     });
        //                     // Update totalPrice state
        //                     this.setState({ totalPrice: totalPrice });
        // axios.get(`${SERVER_HOST}/cart`, { headers: { "authorization": localStorage.token } })
        //     .then(res => {
        //         // Update state with fetched cart data
        //         this.setState({ cart: res.data }, () => {
        //             // Calculate total price after updating state
        //             this.calculateTotalPrice();
        //             // Load shirt photos after updating state
        //             // this.loadShirtPhotos();
        //         });
        //     })
        //     .catch(err => {
        //         // Handle error
        //         console.error("Error fetching cart data:", err);
        //     });
    }
    // componentDidUpdate(){
    //     if (this.state.cart !== undefined) {
    //         const groupedItems = this.state.cart.reduce((groups, item) => {
    //             const group = groups.find(g => g.name === item.name);
    //             if (group) {
    //                 group.quantity += item.quantity;
    //                 group.totalPrice += item.price * item.quantity;
    //             } else {
    //                 groups.push({
    //                     name: item.name,
    //                     size: item.size,
    //                     quantity: item.quantity,
    //                     price: item.price,
    //                     totalPrice: item.price * item.quantity
    //                 });
    //             }
    //             return groups;
    //         }, []);
    //         localStorage.setItem("itemsInCart", JSON.stringify(groupedItems));
    //     }
    // }
    loadShirtPhotos() {
        // Loop through each cart item and load its shirt photos
        this.state.cart.forEach(item => {
            item.shirtPhotoFilename.forEach(photo => {
                axios.get(`${SERVER_HOST}/shirts/photo/${photo.filename}`)
                    .then(res => {
                        // Update shirt photo in DOM
                        document.getElementById(photo._id).src = `data:;base64,${res.data.image}`;
                    })
                    .catch(err => {
                        // Handle error
                        console.error("Error loading shirt photo:", err);
                    });
            });
        });
    }
    calculateTotalPrice() {
        let totalPrice = 0;
        // Calculate total price based on cart items
        // this.state.cart.forEach(item => {
        //     const carItem=item.cartItems[0];
        //     totalPrice += carItem.price * carItem.quantity;
        // });
        // // Update totalPrice state
        // this.setState({ totalPrice: totalPrice });
        this.state.cart.map(item => {
            totalPrice += item.price * item.quantity;
        });
        // Update totalPrice state
        // this.setState({ totalPrice: totalPrice });
        return totalPrice.toFixed(2);
    }
    getIdAndQuantity() {
        let items = []
        this.state.cart.map(cartItem => {
            items.push({ shirtID: cartItem.shirtId, quantity: cartItem.quantity })
        });
        return items;

    }
    handleChange = (index, field, value) => {
        const updatedCart = [...this.state.cart];
        updatedCart[index][field] = value;
        this.setState({ cart: updatedCart });

        // localStorage.setItem("itemsInCart", JSON.stringify(updatedCart));
        const groupedItems = this.state.cart.reduce((groups, item) => {
            const group = groups.find(g => g.name === item.name);
            if (group) {
                group.quantity += item.quantity;
                group.totalPrice += item.price * item.quantity;
            } else {
                groups.push({
                    shirtId: item.shirtId,
                    name: item.name,
                    size: item.size,
                    quantity: item.quantity,
                    price: item.price,
                    totalPrice: item.price * item.quantity,
                    shirtPhotoFilename: item.shirtPhotoFilename,
                    shirtPhotoFilename: item.shirtPhotoFilename
                });
            }
            return groups;
        }, []);
        this.setState({ cart: groupedItems })
        localStorage.setItem("itemsInCart", JSON.stringify(groupedItems));
        // this.loadShirtPhotos();
    };

    handleDelete = (name, size) => {
        const updatedCart = this.state.cart.filter(item => !(item.name === name && item.size === size));
        this.setState({ cart: updatedCart });
        localStorage.setItem("itemsInCart", JSON.stringify(updatedCart));
        this.loadShirtPhotos();
    };
    handlePayment = () => {
        // Check if all guest details are provided
        const { guestName, guestEmail, guestAddress, guestPhone } = this.state;
        const errors = {};
        if (!guestName.trim()) {
            errors.guestName = "Name is required";
        }
        if (!guestEmail.trim()) {
            errors.guestEmail = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(guestEmail)) {
            errors.guestEmail = "Email is invalid";
        }
        if (!guestAddress.trim()) {
            errors.guestAddress = "Address is required";
        }
        if (!guestPhone.trim()) {
            errors.guestPhone = "Phone number is required";
        } else if (!/^\d{10}$/.test(guestPhone)) {
            errors.guestPhone = "Phone number must be 10 digits";
        }
        // if (Object.keys(errors).length === 0) {
        // if (guestName && guestEmail && guestAddress && guestPhone {
        if (guestName && guestEmail && guestAddress && guestPhone && Object.keys(errors).length === 0) {
            // Proceed with payment
            console.log("Guest details provided. Proceeding with payment...");
            // Call your payment function or component here
            this.setState({ redirectToPaypalButton: true })
        } else {
            // Display error message or handle accordingly
            console.log("Please provide all guest details before proceeding with payment.");
        }
    };
    handlePayment = () => {
        // Check if all guest details are provided
        const { guestName, guestEmail, guestAddress, guestPhone } = this.state;
        const errors = {};
        if (!guestName.trim()) {
            errors.guestName = "Name is required";
        }
        if (!guestEmail.trim()) {
            errors.guestEmail = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(guestEmail)) {
            errors.guestEmail = "Email is invalid";
        }
        if (!guestAddress.trim()) {
            errors.guestAddress = "Address is required";
        }
        if (!guestPhone.trim()) {
            errors.guestPhone = "Phone number is required";
        } else if (!/^\d{10}$/.test(guestPhone)) {
            errors.guestPhone = "Phone number must be 10 digits";
        }
        // if (Object.keys(errors).length === 0) {
        // if (guestName && guestEmail && guestAddress && guestPhone {
        if (guestName && guestEmail && guestAddress && guestPhone && Object.keys(errors).length === 0) {
            // Proceed with payment
            console.log("Guest details provided. Proceeding with payment...");
            // Call your payment function or component here
            this.setState({ redirectToPaypalButton: true })
        } else {
            // Display error message or handle accordingly
            console.log("Please provide all guest details before proceeding with payment.");
        }
    };

    // loadShirtPhotos() {
    //     // Loop through each cart item and load its shirt photos

    //     this.state.cart.forEach(item => {
    //         item.cartItems[0].shirtPhotoFilename.forEach(photo => {
    //             axios.get(`${SERVER_HOST}/shirts/photo/${photo.filename}`)
    //                 .then(res => {
    //                     // Update shirt photo in DOM
    //                     document.getElementById(photo._id).src = `data:;base64,${res.data.image}`;
    //                 })
    //                 .catch(err => {
    //                     // Handle error
    //                     console.error("Error loading shirt photo:", err);
    //                 });
    //         });
    //     });
    // }
    // handleChange = (field, value) => {
    //     this.setState({ [field]: value });
    // };

    render() {
        // console.log(this.state.cart[0])
        // {this.state.cart !== undefined ? this.calculateTotalPrice() : null}

        // console.log(this.state.cart.map((item,index) => (item.cartItems[0].name)));
        const groupedItems = this.state.cart.reduce((groups, item) => {
            const group = groups.find(g => g.name === item.name);
            if (group) {
                group.quantity += item.quantity;
                group.totalPrice += item.price * item.quantity;
            } else {
                groups.push({
                    shirtId: item.shirtId,
                    name: item.name,
                    size: item.size,
                    quantity: item.quantity,
                    price: item.price,
                    totalPrice: item.price * item.quantity,
                    shirtPhotoFilename: item.shirtPhotoFilename,
                    shirtPhotoFilename: item.shirtPhotoFilename
                });
            }
            return groups;
        }, []);
        console.log(this.state.cart.map(item => item.shirtPhotoFilename[0]))

        // this.state.cart.map(item =>
        //     item.shirtPhotoFilename[0].forEach(photo => { // Use forEach to iterate over each object
        //         axios.get(`${SERVER_HOST}/shirts/photo/${photo.filename}`)
        //             .then(res => {
        //                 document.getElementById(photo._id).src = `data:;base64,${res.data.image}`
        //             })
        //             .catch(err => {
        //                 // Handle error
        //                 console.error("Error loading shirt photo:", err);
        //             });
        //     })
        // );

        return (
            <div>
                <NavigationBar />
                <h2 className="shoppingcarth2">Shopping Cart</h2>
                <div className="cart-container">
                    {this.state.cart.map((item, index) => (
                        <div key={index} className="each-item-cart">
                            <div className="photoanddetailsSC">
                                {/* display shirt photo */}
                                {item.shirtPhotoFilename.map(photo => (
                                    <img key={photo._id} id={photo._id} alt="" />
                                ))}
                                <div className="detailsShoppingCart">
                                    {/* <img src={`${SERVER_HOST}/shirts/photo/${item.shirtPhotoFilename}`} alt="Shirt" style={{ width: '100px', height: '100px' }} /> */}
                                    {/* <img src={`${SERVER_HOST}/shirts/photo/${item.shirtPhotoFilename}`} alt="Shirt" /> */}
                                    {/* {console.log("shirtPhotoFilename: ", item.shirtPhotoFilename)} */}
                                    <h3>{item.name} </h3>
                                    <select
                                        value={item.size}
                                        onChange={e => this.handleChange(index, 'size', e.target.value)}
                                    >
                                        <option value="XS">XS</option>
                                        <option value="S">S</option>
                                        <option value="M">M</option>
                                        <option value="L">L</option>
                                        <option value="XL">XL</option>
                                    </select>
                                    {/* <span>Quantity:</span> */}

                                    <div>{item.price}</div>

                                    <div className="buttonDivShoppingCart">
                                        <button onClick={() => this.handleChange(index, 'quantity', Math.max(1, item.quantity - 1))}>-</button>
                                        <span>{item.quantity}</span>
                                        <button onClick={() => this.handleChange(index, 'quantity', item.quantity + 1)}>+</button>
                                    </div>
                                </div>
                            </div>
                            <div className="shoppingcartdeletebutton">
                                <button onClick={() => this.handleDelete(item.name, item.size)}>Delete</button>
                            </div>

                        </div>

                    ))}
                    {this.state.isGuest ?
                        <div className="guest-details">
                            <h3>Guest Details</h3>
                            <input
                                type="text"
                                placeholder="Name"
                                value={this.state.guestName}
                                onChange={e => this.handleChange('guestName', e.target.value)}
                                required //required
                            />
                            <input
                                type="email"
                                placeholder="Email"
                                value={this.state.guestEmail}
                                onChange={e => this.handleChange('guestEmail', e.target.value)}
                                required
                            />
                            <input
                                type="text"
                                placeholder="Address"
                                value={this.state.guestAddress}
                                onChange={e => this.handleChange('guestAddress', e.target.value)}
                                required
                            />
                            <input
                                type="text"
                                placeholder="Phone"
                                value={this.state.guestPhone}
                                onChange={e => this.handleChange('guestPhone', e.target.value)}
                                required
                            />
                        </div>
                        : null}


                    {/* paypalbutton */}
                    {/* <BuyShirt customerEmail={this.state.guestEmail} customerName={this.state.guestName} address={this.state.guestAddress} phone={this.state.guestPhone} items={this.getIdAndQuantity()} price={this.calculateTotalPrice()} /> */}
                    <button onClick={this.handlePayment}>Proceed to Payment</button>
                    {this.state.redirectToPaypalButton ? <BuyShirt customerEmail={this.state.guestEmail} customerName={this.state.guestName} address={this.state.guestAddress} phone={this.state.guestPhone} items={this.getIdAndQuantity()} price={this.calculateTotalPrice()} /> : null}
                </div>

                {/* <p>Total Price: €{this.state.totalPrice}</p> */}
                {this.state.cart !== undefined ? <p>Total Price: {this.calculateTotalPrice()}</p> : null}

            </div>
        );
    }

}

