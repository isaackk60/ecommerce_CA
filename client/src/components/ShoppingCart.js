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
import { SERVER_HOST } from "../config/global_constants";
import axios from "axios";

export default class ShoppingCart extends Component {
    constructor(props) {
        super(props);

        this.state = {
            // name:"",
            // price:"",
            // quantity:"",
            // size:"",
            cart: [],
            // totalPrice: 0
        };
    }

    componentDidMount() {
        // Fetch cart data from the server
        const cartLocalStorage = JSON.parse(localStorage.getItem("itemsInCart") || "[]");

        console.log(localStorage.getItem("itemsInCart"))

        this.setState({ cart: JSON.parse(localStorage.getItem("itemsInCart")) })

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
                    name: item.name,
                    size: item.size,
                    quantity: item.quantity,
                    price: item.price,
                    totalPrice: item.price * item.quantity
                });
            }
            return groups;
        }, []);
        this.setState({cart:groupedItems})
        localStorage.setItem("itemsInCart", JSON.stringify(groupedItems));
    };

    handleDelete = (name, size) => {
        const updatedCart = this.state.cart.filter(item => !(item.name === name && item.size === size));
        this.setState({ cart: updatedCart });
        localStorage.setItem("itemsInCart", JSON.stringify(updatedCart));
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

    render() {
        console.log(this.state.cart[0])
        // {this.state.cart !== undefined ? this.calculateTotalPrice() : null}

        // console.log(this.state.cart.map((item,index) => (item.cartItems[0].name)));
        const groupedItems = this.state.cart.reduce((groups, item) => {
            const group = groups.find(g => g.name === item.name);
            if (group) {
                group.quantity += item.quantity;
                group.totalPrice += item.price * item.quantity;
            } else {
                groups.push({
                    name: item.name,
                    size: item.size,
                    quantity: item.quantity,
                    price: item.price,
                    totalPrice: item.price * item.quantity
                });
            }
            return groups;
        }, []);
        return (
            <div>
                <NavigationBar />
                <h2>Shopping Cart</h2>
                <div className="cart-container">
                {this.state.cart.map((item, index) => (
                        <div key={index} className="each-item-cart">
                            <div>
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

                            <button onClick={() => this.handleChange(index, 'quantity', Math.max(1, item.quantity - 1))}>-</button>
                            <span>{item.quantity}</span>
                            <button onClick={() => this.handleChange(index, 'quantity', item.quantity + 1)}>+</button>
                            </div>
                            <div>
                            <button onClick={() => this.handleDelete(item.name, item.size)}>Delete</button>
                            </div>
                            
                        </div>
                        
                    ))}
                </div>
                
                {/* <p>Total Price: €{this.state.totalPrice}</p> */}
                {this.state.cart !== undefined ? <p>Total Price: {this.calculateTotalPrice()}</p> : null}

            </div>
        );
    }

}

