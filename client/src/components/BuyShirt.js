// import React, {Component} from "react"
// import axios from "axios"
// import {Redirect} from "react-router-dom"

// import {SANDBOX_CLIENT_ID, SERVER_HOST} from "../config/global_constants"
// import PayPalMessage from "./PayPalMessage"
// import {PayPalButtons, PayPalScriptProvider} from "@paypal/react-paypal-js"


// export default class BuyShirt extends Component
// {
//     constructor(props)
//     {
//         super(props)

//         this.state = {redirectToPayPalMessage:false,
//                       payPalMessageType:null,
//                       payPalOrderID:null}
//     }



//     createOrder = (data, actions) => 
//     {
//         return actions.order.create({purchase_units:[{amount:{value:this.props.price}}]})
//     }


//     onApprove = paymentData =>
//     {      
//         axios.post(`${SERVER_HOST}/sales/${paymentData.orderID}/${this.props.shirtID}/${this.props.price}`, {headers:{"authorization":localStorage.token, "Content-type": "multipart/form-data"}})
//         .then(res => 
//         {                   
//             this.setState({payPalMessageType:PayPalMessage.messageType.SUCCESS, 
//                            payPalOrderID:paymentData.orderID, 
//                            redirectToPayPalMessage:true}) 
//         })
//         .catch(errorData =>
//         {           
//             this.setState({payPalMessageType:PayPalMessage.messageType.ERROR, 
//                            redirectToPayPalMessage:true}) 
//         })
//     }


//     onError = errorData => 
//     {
//         this.setState({payPalMessageType:PayPalMessage.messageType.ERROR, 
//                        redirectToPayPalMessage:true})         
//     }


//     onCancel = cancelData => 
//     {
//         // The user pressed the Paypal checkout popup window cancel button or closed the Paypal checkout popup window
//         this.setState({payPalMessageType:PayPalMessage.messageType.CANCEL, 
//                        redirectToPayPalMessage:true})       
//     }



//     render()
//     {
//         return (
//             <div>
//                 {this.state.redirectToPayPalMessage ? <Redirect to= {`/PayPalMessage/${this.state.payPalMessageType}/${this.state.payPalOrderID}`}/> : null}            

//                 <PayPalScriptProvider options={{currency:"EUR", "client-id":SANDBOX_CLIENT_ID }}>
//                     <PayPalButtons style={{layout: "horizontal"}} createOrder={this.createOrder} onApprove={this.onApprove} onError={this.onError} onCancel={this.onCancel}/>
//                 </PayPalScriptProvider>
//             </div>
//     )}
// }


import React, { Component } from "react"
import axios from "axios"
import { Redirect } from "react-router-dom"

import { SANDBOX_CLIENT_ID, SERVER_HOST } from "../config/global_constants"
import PayPalMessage from "./PayPalMessage"
import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js"


export default class BuyShirt extends Component {
    constructor(props) {
        super(props)

        this.state = {
            redirectToPayPalMessage: false,
            payPalMessageType: null,
            payPalOrderID: null
        }
    }
    createOrder = (data, actions) => {
        return actions.order.create({ purchase_units: [{ amount: { value: this.props.price } }] })
    }


    onApprove = paymentData => {
        // console.log("PayPal payment successful") 
        // let formData = new FormData()
        // formData.append("items", this.props.items)
        // formData.append("customerName", this.props.customerName)
        // formData.append("customerEmail", this.props.customerEmail)
        // formData.append("address", this.props.address)
        // formData.append("phone", this.props.phone)
        console.log(this.props.items)
        console.log(this.props.customerName)
        console.log(this.props.customerEmail)
        console.log(this.props.address)
        console.log(this.props.phone)
        // console.log(formData);
        let inputData = { items: this.props.items, customerName: this.props.customerName, customerEmail: this.props.customerEmail, address: this.props.address, phone: this.props.phone }
        console.log(inputData)
        // axios.post(`${SERVER_HOST}/sales/${paymentData.orderID}/${this.props.price}/${this.props.items}/${this.props.customerName}/${this.props.customerEmail}/${this.props.address}/${this.props.phone}`, {headers:{"authorization":localStorage.token, "Content-type": "multipart/form-data"}})
        // .then(res => 
        // {                   
        //     this.setState({payPalMessageType:PayPalMessage.messageType.SUCCESS, 
        //                    payPalOrderID:paymentData.orderID, 
        //                    redirectToPayPalMessage:true}) 
        // })
        // axios.post(`${SERVER_HOST}/sales/${paymentData.orderID}/${this.props.price}`, {headers:{"authorization":localStorage.token, "Content-type": "multipart/form-data"}})
        // .then(res => 
        // {                   
        //     this.setState({payPalMessageType:PayPalMessage.messageType.SUCCESS, 
        //                    payPalOrderID:paymentData.orderID, 
        //                    redirectToPayPalMessage:true}) 
        // })
        // axios.post(`${SERVER_HOST}/sales/${paymentData.orderID}/${this.props.price}`,formData, {headers:{"authorization":localStorage.token, "Content-type": "multipart/form-data"}})
        // .then(res => 
        // {                   
        //     this.setState({payPalMessageType:PayPalMessage.messageType.SUCCESS, 
        //                    payPalOrderID:paymentData.orderID, 
        //                    redirectToPayPalMessage:true}) 
        // })
        axios.post(`${SERVER_HOST}/sales/${paymentData.orderID}/${this.props.price}`, { items: this.props.items, customerName: this.props.customerName, customerEmail: this.props.customerEmail, address: this.props.address, phone: this.props.phone }, { headers: { "authorization": localStorage.token, "Content-type": "application/json" } })
            .then(res => {
                this.setState({
                    payPalMessageType: PayPalMessage.messageType.SUCCESS,
                    payPalOrderID: paymentData.orderID,
                    redirectToPayPalMessage: true
                })
            })
            .catch(errorData => {
                this.setState({
                    payPalMessageType: PayPalMessage.messageType.ERROR,
                    redirectToPayPalMessage: true
                })
            })
    }


    onError = errorData => {
        console.log("PayPal payment error")
        this.setState({
            payPalMessageType: PayPalMessage.messageType.ERROR,
            redirectToPayPalMessage: true
        })
    }


    onCancel = cancelData => {
        console.log("PayPal payment cancelled")
        // The user pressed the Paypal checkout popup window cancel button or closed the Paypal checkout popup window
        this.setState({
            payPalMessageType: PayPalMessage.messageType.CANCEL,
            redirectToPayPalMessage: true
        })
    }


    render() {
        return (
            <div>
                {this.state.redirectToPayPalMessage ? <Redirect to={`/PayPalMessage/${this.state.payPalMessageType}/${this.state.payPalOrderID}`} /> : null}
                <PayPalScriptProvider options={{ currency: "EUR", "client-id": SANDBOX_CLIENT_ID }}>
<div className="paypal-outer-container">
                    <PayPalButtons style={{ layout: "horizontal" }} createOrder={this.createOrder} onApprove={this.onApprove} onError={this.onError} onCancel={this.onCancel} />
</div>                
                </PayPalScriptProvider>
            </div>
        )
    }
}