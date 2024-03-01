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
import { Link } from "react-router-dom"
import { Link } from "react-router-dom"


export default class ShoppingCart extends Component {
    constructor(props) {
        super(props);

        this.state = {
            // name:"",
            // price:"",
            // quantity:"",
            // size:"",
            cart: [],
            user: {},
            guestName: "",
            guestEmail: "",
            guestAddress: "",
            guestPhone: "",
            isGuest: localStorage.accessLevel < ACCESS_LEVEL_NORMAL_USER,
            haveEnoughData: false,
            errors: {
                guestName: "",
                guestEmail: "",
                guestAddress: "",
                guestPhone: ""
            }
            // totalPrice: 0
        };
    }

    componentDidMount() {
        // Fetch cart data from the server
        const cartLocalStorage = JSON.parse(localStorage.getItem("itemsInCart") || "[]");

        // console.log("itemsInCart: ",localStorage.getItem("itemsInCart").forEach(item=>{item.shirtPhotoFilename}))

        if (cartLocalStorage.some(item => item.quantity > item.stock)) {
            // Update quantity to match stock if quantity exceeds stock
            const updatedCart = cartLocalStorage.map(item => ({
                ...item,
                quantity: Math.min(item.quantity, item.stock)
            }));
            this.setState({ cart: updatedCart }, () => {
                // Update localStorage with corrected cart data
                localStorage.setItem("itemsInCart", JSON.stringify(updatedCart));
                // Load shirt photos after updating state
                this.loadShirtPhotos();
            });
        } else {
            // No need to update quantity, proceed with loading shirt photos
            this.setState({ cart: cartLocalStorage }, () => {
                // Load shirt photos after updating state
                this.loadShirtPhotos();
            });
        }


        let userEmail = JSON.parse(localStorage.getItem("userEmail") || null);

        axios.get(`${SERVER_HOST}/users/email?email=${userEmail}`)
            .then(res => {
                this.setState({ user: res.data });
            })
            .catch(err => {
                console.error("Error fetching user data:", err);
            });

        const { state } = this.props.location;
        if (state && state.haveEnoughData === true) {
            this.setState({ haveEnoughData: true })
        }



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
        const currentItem = updatedCart[index];

        // Check if the new quantity exceeds the stock
        if (field === 'quantity' && value > currentItem.stock) {
            // If it does, set the quantity to the maximum available stock
            value = currentItem.stock;
        }

        // Update the quantity or other fields as usual
        updatedCart[index][field] = value;
        this.setState({ cart: updatedCart });

        // localStorage.setItem("itemsInCart", JSON.stringify(updatedCart));
        const groupedItems = updatedCart.reduce((groups, item) => {
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
                    stock: item.stock
                });
            }
            return groups;
        }, []);
        this.setState({ cart: groupedItems });
        localStorage.setItem("itemsInCart", JSON.stringify(groupedItems));
    };


    handleDelete = (name, size) => {
        const updatedCart = this.state.cart.filter(item => !(item.name === name && item.size === size));
        this.setState({ cart: updatedCart });
        localStorage.setItem("itemsInCart", JSON.stringify(updatedCart));
        this.loadShirtPhotos();
    };

    handleGuest = (field, value) => {
        this.setState({ [field]: value });
    };

    // handlePayment = () => {
    //     // Check if all guest details are provided
    //     const { guestName, guestEmail, guestAddress, guestPhone } = this.state;
    //     const errors = {};
    //     if (!guestName.trim()) {
    //         errors.guestName = "Name is required";
    //     }
    //     if (!guestEmail.trim()) {
    //         errors.guestEmail = "Email is required";
    //     } else if (!/\S+@\S+\.\S+/.test(guestEmail)) {
    //         errors.guestEmail = "Email is invalid";
    //     }
    //     if (!guestAddress.trim()) {
    //         errors.guestAddress = "Address is required";
    //     }
    //     if (!guestPhone.trim()) {
    //         errors.guestPhone = "Phone number is required";
    //     } else if (!/^\d{10}$/.test(guestPhone)) {
    //         errors.guestPhone = "Phone number must be 10 digits";
    //     }
    //     // if (Object.keys(errors).length === 0) {
    //     // if (guestName && guestEmail && guestAddress && guestPhone {
    //     if (guestName && guestEmail && guestAddress && guestPhone && Object.keys(errors).length === 0) {
    //         // Proceed with payment
    //         console.log("Guest details provided. Proceeding with payment...");
    //         // Call your payment function or component here
    //         this.setState({ haveEnoughData: true })
    //     } else {
    //         // Display error message or handle accordingly
    //         console.log("Please provide all guest details before proceeding with payment.");
    //     }
    // };

    // submitGuestDetail=()=>{
    //     if(this.state.guestName&&this.state.guestEmail&&this.state.guestAddress&&this.state.guestPhone){
    //         this.setState({haveEnoughData:true})
    //     }
    // }
    submitGuestDetail = () => {
        const { guestName, guestEmail, guestAddress, guestPhone } = this.state;
        const errors = {};

        // Validate guestEmail
        if (!guestEmail.trim()) {
            errors.guestEmail = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(guestEmail)) {
            errors.guestEmail = "Email is invalid";
        }

        // Validate guestAddress
        if (!guestAddress.trim()) {
            errors.guestAddress = "Address is required";
        }

        // Validate guestPhone
        if (!guestPhone.trim()) {
            errors.guestPhone = "Phone number is required";
        } else if (!/^\d{8,15}$/.test(guestPhone)) {
            errors.guestPhone = "Phone number must be between 8 and 15 digits";
        }

        // Check if there are any errors
        if (Object.keys(errors).length === 0) {
            // No errors, proceed with submission
            this.setState({ haveEnoughData: true, errors: {} }); // Reset errors
        } else {
            // Errors found, update state with error messages
            this.setState({ errors });
        }
    };


    render() {
        console.log(this.state.user)
        console.log(this.state.cart)
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
                    shirtPhotoFilename: item.shirtPhotoFilename,
                    stock: item.stock
                });
            }
            return groups;
        }, []);
        // console.log(this.state.cart.map(item => item.shirtPhotoFilename[0]))

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
console.log(this.state.cart)
        return (
            <div>
                <NavigationBar />
                <h2 className="shoppingcarth2">Shopping Cart</h2>
                {this.state.cart.length === 0 ?<h2>Shopping Cart is currently empty</h2>:
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
                                    <h3 className="h3shoppingcart">{item.name} </h3>
                                    <select className="selectshoppingcart"
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

                                    <div className="shoppingcartshirtprice">€{item.price}</div>

                                    <div className="buttonDivShoppingCart">
                                        <button onClick={() => this.handleChange(index, 'quantity', Math.max(1, item.quantity - 1))}>-</button>
                                        <span className="shoppingcartspan">{item.quantity}</span>
                                        <button onClick={() => this.handleChange(index, 'quantity', item.quantity + 1)}>+</button>
                                    </div>
                                </div>
                            </div>
                            <div className="shoppingcartdeletebutton">
                                <button onClick={() => this.handleDelete(item.name, item.size)}>Remove</button>
                            </div>

                        </div>

                    ))}
                    {this.state.isGuest && this.state.haveEnoughData == false ?
                        <div className="guest-details">
                            <div className="gfirst">
                                <h3>Guest Details</h3>
                            </div>
                            <div className="gsecond">
                                <input
                                    type="text"
                                    placeholder="Name"
                                    value={this.state.guestName}
                                    onChange={e => this.handleGuest('guestName', e.target.value)}
                                    required //required
                                />
                                <input
                                    type="email"
                                    placeholder="Email"
                                    value={this.state.guestEmail}
                                    onChange={e => this.handleGuest('guestEmail', e.target.value)}
                                    required
                                />
                                <input
                                    type="text"
                                    placeholder="Address"
                                    value={this.state.guestAddress}
                                    onChange={e => this.handleGuest('guestAddress', e.target.value)}
                                    required
                                />
                                <input
                                    type="text"
                                    placeholder="Phone"
                                    value={this.state.guestPhone}
                                    onChange={e => this.handleGuest('guestPhone', e.target.value)}
                                    required
                                />
                            </div>
                            <div className="gthird">
                                <button onClick={this.submitGuestDetail}>Submit</button>
                            </div>
                        </div>
                        : null}


                    {this.state.isGuest ? (this.state.haveEnoughData) ? <BuyShirt customerEmail={this.state.guestEmail} customerName={this.state.guestName} address={this.state.guestAddress} phone={this.state.guestPhone} items={this.getIdAndQuantity()} price={this.calculateTotalPrice()} />
                        : <h6 className="pleasefillguest">Please fill in the details above</h6> : ((this.state.user.name && this.state.user.email && this.state.user.phone && this.state.user.address) || this.state.haveEnoughData) ? <BuyShirt customerEmail={this.state.user.email} customerName={this.state.user.name} address={this.state.user.address} phone={this.state.user.phone} items={this.getIdAndQuantity()} price={this.calculateTotalPrice()} />
                        : <Link className="green-button" to={{ pathname: "/Dashboard", state: { from: "cart" } }}>Please finish your profile</Link>}
          {this.state.errors.guestEmail && <h6 className="error">{this.state.errors.guestEmail}</h6>}
            {this.state.errors.guestAddress && <h6 className="error">{this.state.errors.guestAddress}</h6>}
            {this.state.errors.guestPhone && <h6 className="error">{this.state.errors.guestPhone}</h6>}
                    {/* {this.state.haveEnoughData?{/* paypalbutton */}
                    {/* <BuyShirt customerEmail={this.state.guestEmail} customerName={this.state.guestName} address={this.state.guestAddress} phone={this.state.guestPhone} items={this.getIdAndQuantity()} price={this.calculateTotalPrice()} /> */}




                </div>
    }
                <div className="totalPriceShoppingCart">
                    {this.state.cart !== undefined ? <p>Total Price: ${this.calculateTotalPrice()}</p> : null}
                </div>
                {/* <p>Total Price: €{this.state.totalPrice}</p> */}


            </div>
        );
    }

}

