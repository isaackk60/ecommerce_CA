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

import React, { Component } from "react";
import Form from "react-bootstrap/Form"
import NavigationBar from "./NavigationBar"


import axios from "axios"

export default class ShoppingCart extends Component {
    constructor(props) {
        super(props)

        this.state = {
            // userId:"",
            // name: "",
            // size: "",
            // price: "",
            // quantity: "",
            // photos: null,
            // redirectToDisplayAllTShirtInCart: localStorage.accessLevel < ACCESS_LEVEL_ADMIN,
            // wasSubmittedAtLeastOnce: false,
            cart:[],
            totalPrice:""
        }
    }
    componentDidMount(){
        const { itemsInCart } = this.props.location.state || { itemsInCart: [] };
        this.setState({ cart: itemsInCart });
        let totalPrice = 0;
        itemsInCart.forEach(item => {
            totalPrice += item.price * item.quantity;
        });
        this.setState({ totalPrice: totalPrice });
        // let formData = new FormData()
        // formData.append("userId", this.state.stock)
        // formData.append("name", this.state.name)
        // // formData.append("colour", this.state.colour)
        // formData.append("size", this.state.size)
        // formData.append("price", this.state.price)
        // formData.append("quantity", this.state.quantity)
        

        // if (this.state.cart.shirtPhotoFilename) {
        //     for (let i = 0; i < this.state.cart.shirtPhotoFilename.length; i++) {
        //         formData.append("cartPhotos", this.state.cart.shirtPhotoFilename[i])
        //     }
        // }

        // axios.post(`${SERVER_HOST}/cart`, formData, { headers: { "authorization": localStorage.token, "Content-type": "multipart/form-data" } })
        //     .then(res => {
        //         this.setState({ redirectToDisplayAllTShirtInCart: true })
        //     })
        //     .catch(err => {
        //         this.setState({ wasSubmittedAtLeastOnce: true })
        //     })
    }
    render() {

        return (
            <div>
                <NavigationBar />
                <h2>Shopping Cart</h2>
                <ul>
                    {this.state.cart.map((item, index) => (
                        <li key={index}>
                            {item.name} - Quantity: {item.quantity} - Price: €{item.price * item.quantity}
                        </li>
                    ))}
                </ul>
                <p>Total Price: €{this.state.totalPrice}</p>
            </div>
        );
    }
}

