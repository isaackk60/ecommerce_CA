// import React, { Component } from "react";
// import Form from "react-bootstrap/Form"

// import { Redirect } from "react-router-dom"
// import { SANDBOX_CLIENT_ID, SERVER_HOST } from "../config/global_constants"
// import PayPalMessage from "./PayPalMessage"
// import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js"

// import NavigationBar from "./NavigationBar"


// import axios from "axios"

// export default class ShoppingCart extends Component {
//     constructor(props) {
//         super(props)

//         this.state = {
//             redirectToPayPalMessage: false,
//             payPalMessageType: null,
//             payPalOrderID: null,
//             totalPrice: 0
//         }
//     }

//     componentDidMount() {
//         const { itemsInCart } = this.props.location.state || { itemsInCart: [] };
//         let totalPrice = 0;
//         itemsInCart.forEach((item) => {
//           totalPrice += item.price * item.quantity;
//         });
//         this.setState({ totalPrice }); // Update totalPrice in state
//       }

//     //   createOrder = (data, actions) => {
//     //     // Return an object with the correct amount based on the total price
//     //     return actions.order.create({
//     //       purchase_units: [
//     //         {
//     //           amount: {
//     //             value: this.state.totalPrice, // Use the total price from state
//     //             currency_code: "EUR",
//     //           },
//     //         },
//     //       ],
//     //     });
//     //   };

//     //   createOrder = (data, actions) => 
//     //   {
//     //       return actions.order.create({purchase_units:[{amount:{value:this.props.price}}]})
//     //   }

//     createOrder = (data, actions) => {
//         const { itemsInCart } = this.props.location.state || { itemsInCart: [] };
//         let totalPrice = 0;
//         itemsInCart.forEach((item) => {
//           totalPrice += item.price * item.quantity;
//         });
//         return actions.order.create({
//           purchase_units: [
//             {
//               amount: {
//                 value: totalPrice.toFixed(2), // Ensure total price is formatted properly
//                 currency_code: "EUR",
//               },
//             },
//           ],
//         });
//       };
      
      
//       onApprove = paymentData =>
//       {      
//           axios.post(`${SERVER_HOST}/sales/${paymentData.orderID}/${this.props.shirtID}/${this.props.price}`, {headers:{"authorization":localStorage.token, "Content-type": "multipart/form-data"}})
//           .then(res => 
//           {                   
//               this.setState({payPalMessageType:PayPalMessage.messageType.SUCCESS, 
//                              payPalOrderID:paymentData.orderID, 
//                              redirectToPayPalMessage:true}) 
//           })
//           .catch(errorData =>
//           {           
//               this.setState({payPalMessageType:PayPalMessage.messageType.ERROR, 
//                              redirectToPayPalMessage:true}) 
//           })
//       }
   
          
//       onError = errorData => 
//       {
//           this.setState({payPalMessageType:PayPalMessage.messageType.ERROR, 
//                          redirectToPayPalMessage:true})         
//       }
      
      
//       onCancel = cancelData => 
//       {
//           // The user pressed the Paypal checkout popup window cancel button or closed the Paypal checkout popup window
//           this.setState({payPalMessageType:PayPalMessage.messageType.CANCEL, 
//                          redirectToPayPalMessage:true})       
//       }


//     render() {
//         const { itemsInCart } = this.props.location.state || { itemsInCart: [] };

//         // let totalPrice = 0;
//         // itemsInCart.forEach(item => {
//         //     totalPrice += item.price * item.quantity;
//         // });



//         return (
//             <div>
//                 <NavigationBar />
//                 <h2>Shopping Cart</h2>
//                 <ul>
//                     {itemsInCart.map((item, index) => (
//                         <li key={index}>
//                             {item.name} - Quantity: {item.quantity} - Price: €{item.price * item.quantity}
//                         </li>
//                     ))}
//                 </ul>
//                 <p>Total Price: €{this.state.totalPrice}</p>
//                 <div>
//                     {this.state.redirectToPayPalMessage ? <Redirect to={`/PayPalMessage/${this.state.payPalMessageType}/${this.state.payPalOrderID}`} /> : null}

//                     <PayPalScriptProvider options={{ currency: "EUR", "client-id": SANDBOX_CLIENT_ID }}>
//                         <PayPalButtons style={{ layout: "horizontal" }} createOrder={this.createOrder} onApprove={this.onApprove} onError={this.onError} onCancel={this.onCancel} />
//                     </PayPalScriptProvider>
//                 </div>
//             </div>
            
//         );
//     }
// }


import React, { Component } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";
import { SANDBOX_CLIENT_ID, SERVER_HOST } from "../config/global_constants";
import PayPalMessage from "./PayPalMessage";
import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";
import NavigationBar from "./NavigationBar";

export default class ShoppingCart extends Component {
    constructor(props) {
        super(props);

        this.state = {
            redirectToPayPalMessage: false,
            payPalMessageType: null,
            payPalOrderID: null,
            totalPrice: 0,
            itemsInCart: [],
        };
    }

    componentDidMount() {
        const { itemsInCart } = this.props.location.state || { itemsInCart: [] };
        let totalPrice = 0;
        itemsInCart.forEach((item) => {
            totalPrice += item.price * item.quantity;
        });
        this.setState({ itemsInCart, totalPrice }); // Update itemsInCart and totalPrice in state
    }

    createOrder = (data, actions) => {
        return actions.order.create({
            purchase_units: [
                {
                    amount: {
                        value: this.state.totalPrice.toFixed(2), // Ensure total price is formatted properly
                        currency_code: "EUR",
                    },
                },
            ],
        });
    };

    onApprove = (paymentData) => {
        const { itemsInCart } = this.state;
        console.log("Items in cart:", itemsInCart);
        console.log("Payment data:", paymentData);
        console.log("Data sent to server:", {
          orderID: paymentData.orderID,
          items: itemsInCart.map((item) => ({
              shirtID: item.id,
              price: item.price,
          })),
      });
        axios
            .post(
                `${SERVER_HOST}/shirtsales`,
                {
                    orderID: paymentData.orderID,
                    items: itemsInCart.map((item) => ({
                        shirtID: item.id,
                        price: item.price,
                    })),
                },
                { headers: { authorization: localStorage.token } }
            )
            .then((res) => {
                this.setState({
                    payPalMessageType: PayPalMessage.messageType.SUCCESS,
                    payPalOrderID: paymentData.orderID,
                    redirectToPayPalMessage: true,
                });
            })
            .catch((errorData) => {
                this.setState({
                    payPalMessageType: PayPalMessage.messageType.ERROR,
                    redirectToPayPalMessage: true,
                });
            });
    };

    onError = (errorData) => {
        this.setState({
            payPalMessageType: PayPalMessage.messageType.ERROR,
            redirectToPayPalMessage: true,
        });
    };

    onCancel = (cancelData) => {
        this.setState({
            payPalMessageType: PayPalMessage.messageType.CANCEL,
            redirectToPayPalMessage: true,
        });
    };

    render() {
        const { itemsInCart } = this.state;

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
                <p>Total Price: €{this.state.totalPrice}</p>
                <div>
                    {this.state.redirectToPayPalMessage ? (
                        <Redirect
                            to={`/PayPalMessage/${this.state.payPalMessageType}/${this.state.payPalOrderID}`}
                        />
                    ) : null}

                    <PayPalScriptProvider options={{ currency: "EUR", "client-id": SANDBOX_CLIENT_ID }} >
                        <PayPalButtons style={{ layout: "horizontal" }} createOrder={this.createOrder} onApprove={this.onApprove} onError={this.onError} onCancel={this.onCancel} />
                    </PayPalScriptProvider>
                </div>
            </div>
        );
    }
}


