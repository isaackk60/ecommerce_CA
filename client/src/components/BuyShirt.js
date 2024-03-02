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
        console.log(this.props.items)
        console.log(this.props.customerName)
        console.log(this.props.customerEmail)
        console.log(this.props.address)
        console.log(this.props.phone)
        let inputData = { items: this.props.items, customerName: this.props.customerName, customerEmail: this.props.customerEmail, address: this.props.address, phone: this.props.phone }
        console.log(inputData)
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