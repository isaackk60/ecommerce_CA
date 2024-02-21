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
    render() {
        const { itemsInCart } = this.props.location.state || { itemsInCart: [] };

        let totalPrice = 0;
        itemsInCart.forEach(item => {
            totalPrice += item.price * item.quantity;
        });

        return (
            <div>
                <NavigationBar />
                <h2>Shopping Cart</h2>
                <ul>
                    {itemsInCart.map((item, index) => (
                        <li key={index}>
                            {item.name} - Quantity: {item.quantity} - Price: €{item.price * item.quantity}
                        </li>
                    ))}
                </ul>
                <p>Total Price: €{totalPrice}</p>
            </div>
        );
    }
}

